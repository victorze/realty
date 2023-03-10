import path from 'path'
import express from 'express'
import session from 'express-session'
import pgSession from 'connect-pg-simple'
import flash from 'connect-flash'
import routes from './routes'
import { flashUtils, middlewareUtils } from './utils'
import { db, env } from './config'

db.dataSource
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
    secret: env.SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(flash())
app.use((req, res, next) => {
  res.locals.flashes = req.flash()
  res.locals.error = flashUtils.filterError(res.locals.flashes)
  res.locals.old = flashUtils.filterOld(res.locals.flashes)
  res.locals.user = req.session.user
  req.user = req.session.user
  console.log(res.locals)
  next()
})

app.use(middlewareUtils.requestLogger)

app.use('/auth', routes)
app.get('/', (_req, res) => {
  res.send('Home')
})

app.use(middlewareUtils.unknownEndpoint)

app.get('/', (_req, res) => {
  res.render('layout')
})

export default app
