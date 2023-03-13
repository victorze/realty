import { Router } from 'express'
import { propertyController } from '../controllers'
const route = Router()

route.get('/properties', propertyController.index)

export default route
