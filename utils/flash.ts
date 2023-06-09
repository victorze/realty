import { Request } from 'express';

export const filterError = (flashes: any) => {
  return (name: string) => flashes[`err.${name}`] && flashes[`err.${name}`];
};

export const filterOld = (flashes: any) => {
  return (name: string) => (flashes[`old.${name}`] ? flashes[`old.${name}`][0] : '');
};

export const addOldValues = (req: Request) => {
  Object.entries(req.body).forEach(([key, value]) => req.flash(`old.${key}`, value as string));
};
