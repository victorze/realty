import { v2 as cloudinary } from 'cloudinary'
import { env } from './index'

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const upload = cloudinary.uploader.upload
export const destroy = cloudinary.uploader.destroy
