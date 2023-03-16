import { Router } from 'express'
import { validationService as v } from '../services'
import { authController } from '../controllers'
const route = Router()

route.get('/signup', authController.signupForm)
route.post('/signup', v.signup, authController.signup)
route.get('/confirm/:token', authController.confirm)
route.get('/login', authController.loginForm)
route.post('/login', v.login, authController.login)
route.post('/logout', authController.logout)
route.get('/forgot-password', authController.forgotPasswordForm)
route.post('/forgot-password', v.email, authController.forgotPassword)
route.get('/reset-password/:token', authController.resetPasswordForm)
route.post('/reset-password/:token', v.password, authController.resetPassword)

export default route
