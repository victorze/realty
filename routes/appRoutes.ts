import { Router } from 'express'
import { propertyController } from '../controllers'
import { validationService as v } from '../services'
import { auth } from '../utils/middleware'
const route = Router()

route.get('/properties', propertyController.index)
route.get('/properties/create', auth, propertyController.create)
route.post('/properties', [auth, v.property], propertyController.store)
route.get('/properties/images', auth, propertyController.uploadForm)

export default route
