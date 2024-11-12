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

export function verifyTokenRoute(req:Request, res:Response){
  try{
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }
    const decoded = jwt.verify(token, 'dfdffd');
    res.status(200).json({isAuthenticated:true})

  }
  catch(error){
    return res.status(401).json({ isAuthenticated: false });
  }
}

