import { Request, Response } from 'express'
import { User } from '../models'
import { cryptoService, mailService } from '../services'

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
  user.token = cryptoService.generateConfirmationToken()
  await user.save()

  mailService.sendConfirmationLink(user)

  req.flash(
    'registered user',
    `Revisa tu bandeja de entrada. Acabamos de enviarte un correo electrónico a ${email} para verificar tu correo.`
  )

  res.redirect('/auth/login')
}

export const confirm = async (req: Request, res: Response) => {
  const { token } = req.params
  const user = await User.findOneBy({ token })

  let confirmedAccount = false

  if (user && !user.emailVerified) {
    user.emailVerified = true
    user.token = ''
    await user.save()
    confirmedAccount = true
  }

  res.render('auth/confirm', { confirmedAccount })
}

export const loginForm = (_req: Request, res: Response) => {
  res.render('auth/login')
}

export const login = (_req: Request, res: Response) => {
  res.redirect('/')
}

export const resetPasswordForm = (_req: Request, res: Response) => {
  res.render('auth/reset-password')
}

export const resetPassword = (_req: Request, res: Response) => {
  res.redirect('back')
}
