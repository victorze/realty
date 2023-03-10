import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
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

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
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
