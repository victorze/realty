import { Request, Response } from 'express'
import { Category, Price, Property, User } from '../models'

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

export const store = async (req: Request, res: Response) => {
  const property = Property.create(req.body as Property)
  property.owner = req.user as User
  property.image = 'url image'
  await property.save()
  res.json(req.body)
}
