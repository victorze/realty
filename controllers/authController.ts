import { Request, Response } from 'express'
import { User } from '../models'
import { mailService } from '../services'
import { http, crypto } from '../utils'

export const signupForm = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect('/private')
  }
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
  user.password = await crypto.hash(password)
  user.token = crypto.token()
  await user.save()

  mailService.sendConfirmationLink(user)

  req.flash('registered user', 'Revisa tu correo electrónico')
  res.redirect('/auth/login')
}

export const confirm = async (req: Request, res: Response) => {
  const { token } = req.params
  const user = await User.findOneBy({ token })

  if (user) {
    user.emailVerified = true
    user.token = ''
    await user.save()
    return res.render('auth/confirm')
  }

  http.abort(404)
}

export const loginForm = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect('/private')
  }
  res.render('auth/login')
}

export const login = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body
  const user = await User.findOneBy({ email })

  if (user && (await crypto.check(password, user.password))) {
    if (!user.emailVerified) {
      req.flash('unverified email', 'Correo no verificado')
      return res.redirect('back')
    }
    req.session.regenerate(() => {
      if (rememberMe) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365 // 365 days
      }
      req.session.user = user
      res.redirect('/private')
    })
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
    if (!user.emailVerified) {
      req.flash('unverified email', 'Correo no verificado')
      return res.redirect('back')
    }
    user.token = crypto.token()
    await user.save()
    mailService.sendResetPasswordLink(user)
  }

  req.flash('request recover', 'Revisa tu correo electrónico')
  res.redirect('back')
}

export const resetPasswordForm = async (req: Request, res: Response) => {
  const { token } = req.params
  const user = await User.findOneBy({ token })
  if (user) return res.render('auth/reset-password')
  http.abort(404)
}

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params
  const { password } = req.body
  const user = await User.findOneBy({ token })

  if (user) {
    user.password = await crypto.hash(password)
    user.token = ''
    await user.save()
  }

  res.redirect('/')
}
