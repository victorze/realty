import { z } from 'zod'
import { validate } from '../utils/middlewareUtils'

const signupSchema = z.object({
  name: z.string().trim().nonempty({ message: 'El nombre es obligatorio' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

const loginSchema = z.object({
  email: signupSchema.shape.email,
  password: z.string().nonempty({ message: 'La contraseña es obligatoria' }),
})

const emailSchema = signupSchema.pick({ email: true })

export const signup = validate(signupSchema)
export const login = validate(loginSchema)
export const email = validate(emailSchema)
