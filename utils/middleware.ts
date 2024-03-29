import crypto from 'crypto';

import type { NextFunction, Request, Response } from 'express';

import { MulterError } from 'multer';
import { z } from 'zod';

import { env, multer } from '../config';
import { flash, logger } from './index';

export const locals = (req: Request, res: Response, next: NextFunction) => {
  res.locals.APP_NAME = env.APP_NAME;
  res.locals.flashes = req.flash();
  res.locals.error = flash.filterError(res.locals.flashes);
  res.locals.old = flash.filterOld(res.locals.flashes);
  res.locals.user = req.session.user;
  req.user = req.session.user;
  console.log('Flash', res.locals.flashes);
  console.log(req.session);
  next();
};

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

export const handleErrors = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 500;

  if (env.NODE_ENV === 'production') {
    return res.status(err.status).render(`errors/${err.status}`);
  }

  next(err);
};

export const validate = (schema: z.ZodObject<any> | z.ZodEffects<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.validated = result.data;
      req.body = { ...req.body, ...req.validated };
      next();
    } else {
      const errors = result.error.flatten().fieldErrors;

      Object.entries(errors).forEach(([key, value]) => req.flash(`err.${key}`, value as string[]));
      Object.entries(req.body).forEach(([key, value]) => req.flash(`old.${key}`, value as string));

      res.redirect('back');
    }
  };
};

export const csrf = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      res.locals.csrfToken = () => {
        const token = crypto.randomBytes(48).toString('base64url');
        if (req.session.csrfTokens) {
          req.session.csrfTokens = [...req.session.csrfTokens, token];
        } else {
          req.session.csrfTokens = [token];
        }
        return token;
      };
      next();
    },
    (req: Request, _res: Response, next: NextFunction) => {
      const csrfToken = req.body._token || req.query._token;
      if (req.method == 'POST' && !req.session.csrfTokens?.includes(csrfToken)) {
        const err = new Error('CSRF token mismatch');
        err.status = 403;
        throw err;
      } else {
        req.session.csrfTokens = req.session.csrfTokens?.slice(-5);
        next();
      }
    },
  ];
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
  } else {
    req.session.urlIntended = req.route.path;
    res.redirect('/auth/login');
  }
};

export const upload = (fieldname: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const upload = multer.upload.array(fieldname);

    upload(req, res, (err) => {
      if (err instanceof MulterError) {
        if (err.message === 'File too large') {
          req.uploadError = 'Archivo demasiado grande';
          return next();
        }
        if (err.message === 'Too many files') {
          req.uploadError = 'Demasiados archivos';
          return next();
        }
        return next(err);
      } else if (err) {
        return next(err);
      }

      next();
    });
  };
};
