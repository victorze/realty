import { Request, Response } from 'express'
import { User } from '../models'

export const signupForm = (_req: Request, res: Response) => {
  res.render('auth/signup')
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const userExists = await User.findOneBy({ email })

  if (userExists) {
    req.flash('err.email', 'El correo electrónico ya está en uso, elige otro')
    req.flash('old.name', name)
    req.flash('old.email', email)
    return res.redirect('back')
  }

  const user = User.create({ name, email, password })
  console.log({ user })
  // await user.save()

  req.flash(
    'registered user',
    `Revisa tu bandeja de entrada. Acabamos de enviarte un correo electrónico a ${email} para verificar tu correo.`
  )

  res.redirect('/auth/login')
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
