import { Router } from 'express'
import { authController } from './controllers'

const route = Router()

route.get('/signup', authController.signupForm)
route.post('/signup', authController.signup)
route.get('/login', authController.loginForm)
route.get('/reset-password', authController.resetPasswordForm)

export default route
