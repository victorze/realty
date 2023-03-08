import path from 'path'
import express from 'express'
import routes from './routes'
import { middleware } from './utils'
import { db } from './config'

db.dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const app = express()

app.use(middleware.requestLogger)

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: false }))

app.use('/auth', routes)

app.get('/', (_req, res) => {
  res.render('layout')
})

export default app
