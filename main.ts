import 'reflect-metadata'
import { env } from './config'
import { logger } from './utils'
import app from './app'

app.listen(env.PORT, () => {
  logger.info(`Starting development server: http://localhost:${env.PORT}`)
})
