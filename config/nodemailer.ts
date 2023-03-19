import nodemailer from 'nodemailer'
import { env } from './index'

const transporter = nodemailer.createTransport(
  {
    host: env.MAIL_HOST,
    port: Number(env.MAIL_PORT),
    secure: false,
    auth: {
      user: env.MAIL_USERNAME,
      pass: env.MAIL_PASSWORD,
    },
  },
  { from: `${env.APP_NAME} <${env.MAIL_FROM_ADDRESS}>` }
)

export const send = transporter.sendMail.bind(transporter)
