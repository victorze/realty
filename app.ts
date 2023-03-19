import path from 'path'
import express from 'express'
import connectFlash from 'connect-flash'
import routes from './routes'
import { middleware } from './utils'
import { expressSession } from './config'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: false }))

app.use(expressSession.config)
app.use(connectFlash())

app.use(middleware.locals)
app.use(middleware.csrf())
app.use(middleware.requestLogger)

app.use('/', routes)

app.use(middleware.notFound)
app.use(middleware.handleErrors)

export default app
