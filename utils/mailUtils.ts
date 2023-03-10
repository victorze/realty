import { env, mail } from '../config'

export const send = (subject: string, to: string, content: string) => {
  mail.transporter.sendMail({
    from: env.MAIL_FROM_ADDRESS,
    to,
    subject,
    html: content,
  })
}
