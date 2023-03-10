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
  const err = new Error()
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

export const validate = (schema: z.ZodObject<any>) => {
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
