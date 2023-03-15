import { Request, Response } from 'express'
import { Category, Price } from '../models'

export const index = (_req: Request, res: Response) => {
  res.render('properties/index')
}

export const create = async (_req: Request, res: Response) => {
  const [categories, prices] = await Promise.all([
    Category.find(),
    Price.find(),
  ])

  res.render('properties/create', { categories, prices })
}
