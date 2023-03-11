import crypto from 'crypto'

export const generateConfirmationToken = () => {
  return Math.random().toString(32).substring(2) + Date.now().toString(32)
}

export const generateToken = () => {
  return (
    crypto.randomBytes(36).toString('base64url') + '|' + Date.now().toString(32)
  )
}
