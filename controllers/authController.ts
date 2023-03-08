import { Request, Response } from "express"
import { User } from "../models"

export const signupForm = (_req: Request, res: Response) => {
  res.render('auth/signup')
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password} = req.body
  const user = User.create({name, email, password})
  await user.save()
  console.log({user})
  res.redirect('/')
}

export const loginForm = (_req: Request, res: Response) => {
  res.render('auth/login')
}

export const resetPasswordForm = (_req: Request, res: Response) => {
  res.render('auth/reset-password')
}
