import 'reflect-metadata'
import { env, dbConfig as db } from './config'
import { logger } from './utils'
import app from './app'

db.connect()

app.listen(env.PORT, () => {
  logger.info(`Starting development server: http://localhost:${env.PORT}`)
})
