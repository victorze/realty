export const abort = (code: number, message: string = '') => {
  const err = new Error(message)
  err.status = code
  throw err
}
