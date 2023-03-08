import { Router } from 'express'
import { authController } from './controllers'

const route = Router()

route.get('/login', authController.loginForm)
route.get('/signup', authController.signupForm)
route.get('/reset-password', authController.resetPasswordForm)

export default route
