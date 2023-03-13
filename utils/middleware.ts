import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { env } from '../config'
import { logger } from './index'

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  const err = new Error('Resource not found')
  err.status = 404
  next(err)
}

export const handleErrors = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  err.status = err.status || 500

  if (env.NODE_ENV === 'production') {
    return res.status(err.status).render(`errors/${err.status}`)
  }

  next(err)
}

export const validate = (schema: z.ZodObject<any> | z.ZodEffects<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (result.success) {
      req.body = result.data
      next()
    } else {
      const errors = result.error.flatten().fieldErrors

      Object.entries(errors).forEach(([key, value]) =>
        req.flash(`err.${key}`, value as string[])
      )
      Object.entries(req.body).forEach(([key, value]) =>
        req.flash(`old.${key}`, value as string)
      )

      res.redirect('back')
    }
  }
}

export const csrf = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      res.locals.csrfToken = () => {
        const token = crypto.randomBytes(48).toString('base64')
        if (req.session.csrfToken) {
          req.session.csrfToken = [...req.session.csrfToken, token]
        } else {
          req.session.csrfToken = [token]
        }
        return token
      }
      next()
    },
    (req: Request, _res: Response, next: NextFunction) => {
      if (
        req.method == 'POST' &&
        !req.session.csrfToken?.includes(req.body._token)
      ) {
        const err = new Error('CSRF token mismatch')
        err.status = 403
        throw err
      } else {
        req.session.csrfToken = req.session.csrfToken?.slice(-5)
        next()
      }
    },
  ]
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}
