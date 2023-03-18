import 'reflect-metadata'
import { env, typeorm } from './config'
import { logger } from './utils'
import app from './app'

typeorm.connect()

app.listen(env.PORT, () => {
  logger.info(`Starting development server: http://localhost:${env.PORT}`)
})
