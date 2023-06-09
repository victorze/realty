import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { env } from './index';

export const config = session({
  store: new (pgSession(session))({
    conString: env.DB_URL_SESSION,
  }),
  secret: env.SECRET_KEY as string,
  resave: false,
  saveUninitialized: false,
});
