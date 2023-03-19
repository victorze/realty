declare namespace Express {
  interface Request {
    user?: SessionUser
    validated: any
    uploadError: string
  }
}
