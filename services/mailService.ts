import { User } from '../models'
import { mailUtils as mail } from '../utils'

export const sendConfirmationLink = (user: User) => {
  const subject = 'Confirmar correo'
  const content = 'Verifica haciendo clic en el siguiente correo'
  mail.send(subject, user.email, content)
}
