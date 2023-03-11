import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

export const BASE_DIR = path.join(__dirname, '..')

export const NODE_ENV = process.env.NODE_ENV

export const APP_NAME = process.env.APP_NAME
export const APP_URL = process.env.APP_URL
export const PORT = process.env.PORT
export const SECRET_KEY = process.env.SECRET_KEY

export const DB_CONNECTION = process.env.DB_CONNECTION
export const DB_HOST = process.env.DB_HOST
export const DB_PORT = process.env.DB_PORT
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD

export const DB_URL_SESSION = process.env.DB_URL_SESSION

export const MAIL_MAILER = process.env.MAIL_MAILER
export const MAIL_HOST = process.env.MAIL_HOST
export const MAIL_PORT = process.env.MAIL_PORT
export const MAIL_USERNAME = process.env.MAIL_USERNAME
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD
export const MAIL_FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS
