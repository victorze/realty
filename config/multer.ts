import multer from 'multer'
import path from 'path'
import { env } from './index'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(env.BASE_DIR, 'public', 'uploads'))
  },
  filename: (_req, _file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueName)
  },
})

export const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB
    files: 5,
  },
  fileFilter: function (_req, file, cb) {
    const fileTypes = /png|jpeg|jpg/
    const hasValidExtname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const hasValidMimetype = fileTypes.test(file.mimetype)

    if (hasValidExtname && hasValidMimetype) cb(null, true)
    else cb(null, false)
  },
})
