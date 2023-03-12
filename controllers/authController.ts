import { Request, Response } from 'express'
import { User } from '../models'
import { cryptoService, mailService } from '../services'
import { commonUtils } from '../utils'

export const signupForm = (_req: Request, res: Response) => {
  res.render('auth/signup')
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const userExists = await User.findOneBy({ email })

  if (userExists) {
    req.flash('err.email', 'El correo electrónico ya existe')
    req.flash('old.name', name)
    req.flash('old.email', email)
    return res.redirect('back')
  }

  const user = User.create({ name, email })
  user.setPassword(password)
  user.token = cryptoService.generateToken()
  await user.save()

  mailService.sendConfirmationLink(user)

  req.flash(
    'registered user',
    'Te hemos enviado instrucciones para verificar tu correo.'
  )

  res.redirect('/auth/login')
}

export const confirm = async (req: Request, res: Response) => {
  const { token } = req.params
  const user = await User.findOneBy({ token })

  if (user && !user.emailVerified) {
    user.emailVerified = true
    user.token = ''
    await user.save()
    res.render('auth/confirm')
  } else {
    commonUtils.abort(404, 'Not found')
  }
}

export const loginForm = (_req: Request, res: Response) => {
  res.render('auth/login')
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOneBy({ email })

  if (user && user.checkPassword(password)) {
    res.redirect('/')
  } else {
    req.flash('old.email', email)
    req.flash('err.password', 'La contraseña es incorreta')
    res.redirect('back')
  }
}

export const requestRecoverForm = (_req: Request, res: Response) => {
  res.render('auth/request-recover')
}

export const requestRecover = async (req: Request, res: Response) => {
  const { email } = req.body
  const user = await User.findOneBy({ email })

  if (user) {
    user.token = cryptoService.generateToken()
    console.log({ user })
    await user.save()
    mailService.sendResetPasswordLink(user)
  }

  req.flash(
    'request recover',
    'Te hemos enviado instrucciones para restablecer tu contraseña'
  )

  res.redirect('back')
}

export const resetPasswordForm = async (req: Request, res: Response) => {
  const { token } = req.params
  const user = await User.findOneBy({ token })

  if (user) {
    res.render('auth/reset-password')
  } else {
    commonUtils.abort(404)
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params
  const { password } = req.body
  const user = await User.findOneBy({ token })

  if (user) {
    user.setPassword(password)
    user.token = ''
    await user.save()
  }

  res.redirect('/')
}
