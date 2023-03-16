import 'express-session'

declare module 'express-session' {
  interface SessionData {
    user?: SessionUser
    csrfToken?: string[]
    urlIntended: string
  }
}
