import fs from 'fs/promises';

import type { Request, Response } from 'express';

import { Category, Photo, Price, Property, User } from '../models';
import { flash, storage } from '../utils';

export const index = (_req: Request, res: Response) => {
  res.render('properties/index');
};

export const create = async (_req: Request, res: Response) => {
  const [categories, prices] = await Promise.all([Category.find(), Price.find()]);
  res.render('properties/create', { categories, prices });
};

export const store = async (req: Request, res: Response) => {
  if (req.uploadError) {
    req.flash('err.photos', req.uploadError);
    flash.addOldValues(req);
    return res.redirect('back');
  }

  if (req.files?.length === 0) {
    req.flash('err.photos', 'Debe subir al menos una foto');
    flash.addOldValues(req);
    return res.redirect('back');
  }

  const property = Property.create(req.validated as Property);
  property.owner = req.user as User;
  const uploadedImages = [];

  for (const file of req.files as Express.Multer.File[]) {
    const result = await storage.put(file.path);

    const photo = new Photo();
    photo.publicId = result.public_id;
    photo.url = result.secure_url;
    await photo.save();

    await fs.unlink(file.path);
    uploadedImages.push(photo);
  }

  property.images = uploadedImages;
  await property.save();

  res.redirect('/properties');
};
