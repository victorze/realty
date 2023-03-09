import { Request, Response } from 'express'
import { User } from '../models'

export const signupForm = (_req: Request, res: Response) => {
  res.render('auth/signup')
}

export const signup = async (req: Request, res: Response) => {
  const user = User.create(req.body)
  console.log({ user })
  res.redirect('/login')
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
