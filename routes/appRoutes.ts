import { Router } from 'express'
import { propertyController } from '../controllers'
const route = Router()

route.get('/properties', propertyController.index)
route.get('/properties/create', propertyController.create)

export default route
