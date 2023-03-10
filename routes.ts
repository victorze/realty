import 'express-async-errors'
import { Router } from 'express'
import { validationService as v } from './services'
import { authController } from './controllers'

const route = Router()

route.get('/signup', authController.signupForm)
route.post('/signup', v.signup, authController.signup)
route.get('/login', authController.loginForm)
route.post('/login', v.login, authController.login)
route.get('/reset-password', authController.resetPasswordForm)
route.post('/reset-password', v.email, authController.resetPassword)

export default route
