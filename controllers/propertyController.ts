import { Request, Response } from 'express'

export const index = (_req: Request, res: Response) => {
  res.render('properties/index')
}

export const create = (_req: Request, res: Response) => {
  res.render('properties/create')
}
