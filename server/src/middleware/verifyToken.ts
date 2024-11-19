import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyTokenMiddleware(req:Request, res:Response,next:NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, 'dfdffd');
    next()
  } catch (error) {
    return res.status(401).json({ isAuthenticated: false });
  }
}

export function verifyTokenRoute(req: Request, res: Response) {
  try {
    const secretKey: string = process.env.JWT_SECRET_KEY || "";
    const token = req.cookies.token;

    console.log('Cookies:', req.cookies);
    console.log('Token:', token);
    if (!token) {
      return res.json({ isAuthenticated: false, message: 'No token found' });
    }

    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded token:', decoded);

    return res.status(200).json({ isAuthenticated: true });
  } catch (error: any) {
    console.error('Token verification error:', error);
    return res.status(401).json({ isAuthenticated: false, message: error.message });
  }
}


