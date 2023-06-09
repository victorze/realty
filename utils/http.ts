export const abort = (code: number, message: string = '') => {
  const httpStatus: any = {
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Internal Server Error',
  };

  const err = new Error(message || httpStatus[code]);
  err.status = code;
  throw err;
};
