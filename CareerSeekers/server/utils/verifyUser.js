import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // Check if token exists  
  if (!token) {
      return next(errorHandler(401, 'You need to login first to access this route!'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(errorHandler(401, 'Your token is invalid or has expired!'));
      }
      req.user = user;
      next();
    });
}