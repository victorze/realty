import { env } from '../config'
import { User } from '../models'
import { mail } from '../utils'

export const sendConfirmationLink = async (user: User) => {
  const subject = `Verifica tu correo electrónico`

  const { htmlContent, textContent } = mail.makeContent('confirm', {
    name: user.name,
    url: `${env.APP_URL}:${env.PORT}/auth/confirm/${user.token}`,
  })

  await mail.send({
    to: user.email,
    subject,
    html: htmlContent,
    text: textContent,
  })
}

export const sendResetPasswordLink = async (user: User) => {
  const subject = `Restablecimiento de contraseña`

  const { htmlContent, textContent } = mail.makeContent('request-recover', {
    name: user.name,
    url: `${env.APP_URL}:${env.PORT}/auth/reset-password/${user.token}`,
  })

  await mail.send({
    to: user.email,
    subject,
    html: htmlContent,
    text: textContent,
  })
}
