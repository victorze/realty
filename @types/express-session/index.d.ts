import 'express-session'

declare module 'express-session' {
  interface SessionData {
    user?: SessionUser
    csrfTokens?: string[]
    urlIntended: string
  }
}
