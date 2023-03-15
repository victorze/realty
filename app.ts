import path from 'path'
import express from 'express'
import session from 'express-session'
import pgSession from 'connect-pg-simple'
import connectFlash from 'connect-flash'
import routes from './routes'
import { flash, middleware } from './utils'
import { dbConfig, env } from './config'

dbConfig.dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    store: new (pgSession(session))({
      conString: env.DB_URL_SESSION,
    }),
    secret: env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(connectFlash())
app.use((req, res, next) => {
  res.locals.APP_NAME = env.APP_NAME
  res.locals.flashes = req.flash()
  res.locals.error = flash.filterError(res.locals.flashes)
  res.locals.old = flash.filterOld(res.locals.flashes)
  res.locals.user = req.session.user
  req.user = req.session.user
  console.log('Flash', res.locals.flashes)
  console.log(req.session)
  next()
})

app.use(middleware.csrf())
app.use(middleware.requestLogger)

app.use('/', routes)
app.get('/', (_req, res) => {
  res.send('Home')
})
app.get('/private', middleware.auth, (_req, res) => {
  res.send('Private')
})

app.use(middleware.notFound)
app.use(middleware.handleErrors)

export default app
