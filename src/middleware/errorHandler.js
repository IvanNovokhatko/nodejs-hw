import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  const isProd = process.env.NODE_ENV === "production";

  if (isHttpError(err)) {
    res.status(err.status).json({
      message: err.message,
    });
    return;
  }



  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
};
