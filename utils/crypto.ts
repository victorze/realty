import crypto from 'crypto'

export const generateToken = () => {
  return (
    crypto.randomBytes(36).toString('base64url') + '|' + Date.now().toString(32)
  )
}
