import { middleware } from './utils'
import express from 'express'
import routes from './routes'
import path from 'path'

export const app = express()

app.use(middleware.requestLogger)

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: false }))

app.use('/auth', routes)

app.get('/', (_req, res) => {
  res.render('layout')
})

