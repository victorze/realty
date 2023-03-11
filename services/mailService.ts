import { env } from '../config'
import { User } from '../models'
import { mailUtils as mail } from '../utils'

export const sendConfirmationLink = async (user: User) => {
  const subject = `Verifica tu correo electrónico`

  const { htmlContent, textContent } = mail.makeContent('confirm', {
    name: user.name,
    url: `${env.APP_URL}:${env.PORT}/auth/confirm/${user.token}`,
  })

  await mail.send({
    to: user.email,
    from: env.MAIL_FROM_ADDRESS,
    subject,
    html: htmlContent,
    text: textContent,
  })
}
