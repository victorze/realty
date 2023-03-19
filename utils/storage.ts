import { cloudinary, env } from '../config'

export const put = async (path: string) => {
  return await cloudinary.upload(path, {
    folder: env.APP_NAME,
  })
}

export const remove = async (publicId: string) => {
  return await cloudinary.destroy(publicId)
}
