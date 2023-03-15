import { z } from 'zod'
import { middleware } from '../utils'

const propertySchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty({ message: 'El título es obligatorio' })
    .max(100, { message: 'El título es muy largo (máximo 100 caracteres)' }),
  description: z
    .string()
    .trim()
    .nonempty({ message: 'Debe ingresar una descripción' })
    .max(300, {
      message: 'La descripción es muy larga (máximo 300 caracteres)',
    }),
  category: z.string().nonempty({ message: 'Debe elegir una categoría' }),
  price: z.string().nonempty({ message: 'Debe elegir un rango de precios' }),
  roomCount: z.string().nonempty({ message: 'Debe elegir una opción' }),
  parkingCount: z.string().nonempty({ message: 'Debe elegir una opción' }),
  wcCount: z.string().nonempty({ message: 'Debe elegir una opción' }),
  street: z.string().nonempty(),
  lat: z
    .string()
    .nonempty({ message: 'Debe seleccionar una ubicación en el mapa' }),
  lng: z.string().nonempty(),
})
export const property = middleware.validate(propertySchema)

// auth validators
const signupSchema = z.object({
  name: z.string().trim().nonempty({ message: 'El nombre es obligatorio' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})
export const signup = middleware.validate(signupSchema)

const loginSchema = z.object({
  email: signupSchema.shape.email,
  password: z.string().nonempty({ message: 'La contraseña es obligatoria' }),
})
export const login = middleware.validate(loginSchema)

const passwordMatchSchema = z
  .object({
    password: signupSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'La contraseña no coincide',
    path: ['confirmPassword'],
  })
export const password = middleware.validate(passwordMatchSchema)

const emailSchema = signupSchema.pick({ email: true })
export const email = middleware.validate(emailSchema)
