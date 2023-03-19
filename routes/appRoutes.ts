import { Router } from 'express'
import { propertyController } from '../controllers'
import { property } from '../services/validationService'
import { auth, upload } from '../utils/middleware'
const route = Router()

const photos = upload('photos')

route.get('/properties', auth, propertyController.index)
route.get('/properties/create', auth, propertyController.create)
route.post('/properties', [auth, photos, property], propertyController.store)

export default route
