import path from 'path'
import pug from 'pug'
import { env, nodemailer } from '../config'

export const send = nodemailer.send

export const makeContent = (template: string, data: object) => {
  const templatePath = path.join(env.BASE_DIR, 'views', 'email', template)
  const htmlContent = pug.renderFile(templatePath + '.pug', data)
  const textContent = pug.renderFile(templatePath + '.txt', data)
  return { htmlContent, textContent }
}
