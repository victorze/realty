import 'express-async-errors'
import { Router } from 'express'
import { validationService as v } from './services'
import { authController } from './controllers'

const route = Router()

route.get('/signup', authController.signupForm)
route.post('/signup', v.signup, authController.signup)
route.get('/confirm/:token', authController.confirm)
route.get('/login', authController.loginForm)
route.post('/login', v.login, authController.login)
route.get('/request-recover', authController.requestRecoverForm)
route.post('/request-recover', v.email, authController.requestRecover)

export default route
