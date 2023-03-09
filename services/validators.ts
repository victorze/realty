import { z } from 'zod'
import { validate } from '../utils/middleware'

const SignupSchema = z.object({
  name: z.string().trim().nonempty({ message: 'El nombre es obligatorio' }),
  email: z
    .string()
    .email({ message: 'El formato del correo electrónico no es válido' }),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const validateSignup = validate(SignupSchema)
