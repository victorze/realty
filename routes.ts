import { Router } from 'express'
import { authController } from './controllers'
import { validate } from './services'

const route = Router()

route.get('/signup', authController.signupForm)
route.post('/signup', validate.signup, authController.signup)
route.get('/login', authController.loginForm)
route.post('/login', validate.login, authController.login)
route.get('/reset-password', authController.resetPasswordForm)
route.post('/reset-password', validate.email, authController.resetPassword)

export default route
