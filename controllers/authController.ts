import { Request, Response } from "express"

export const loginForm = (_req: Request, res: Response) => {
  res.render('auth/login')
}

export const signupForm = (_req: Request, res: Response) => {
  res.render('auth/signup')
}

export const resetPasswordForm = (_req: Request, res: Response) => {
  res.render('auth/reset-password')
}
