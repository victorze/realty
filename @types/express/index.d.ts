declare namespace Express {
  interface Request {
    user?: SessionUser
    validated: object
  }
}
