import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}
declare global {
  namespace Express {
    interface Request {
      userId?: any;
    }
  }
}
export const verifyTokenMiddleware=(req:Request, res:Response,next:NextFunction)=> {
  const secretKey: string = process.env.JWT_SECRET_KEY || "";
  const token = req.cookies.token;
  console.log("middleware:"+token)
  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token,secretKey) as JwtPayload;
    console.log("middleware userId"+decoded.userId);
    req.userId=decoded.userId;
    
    next()
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ isAuthenticated: false });
  }
}

export const verifyTokenRoute=(req: Request, res: Response)=>{
  try {
    const secretKey: string = process.env.JWT_SECRET_KEY || "";
    const token = req.cookies.token;

    console.log('Cookies:', req.cookies);
    console.log('Token:', token);
    if (!token) {
      return res.json({ isAuthenticated: false, message: 'No token found' });
    }

    const decoded = jwt.verify(token, secretKey) as JwtPayload;
   

    return res.status(200).json({ isAuthenticated: true });
  } catch (error: any) {
    console.error('Token verification error:', error);
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict'
    });

    return res.status(401).json({ isAuthenticated: false, message: error.message });
  }
}

export const optionalAuthMiddleware=(req: Request, res: Response,next:NextFunction)=>{
    const secretKey: string = process.env.JWT_SECRET_KEY || "";
    const token=req.cookies.token;
    console.log("optionalAuthMiddleware"+token)
    if(!token){
      (req as any).userId =null;
      return next();
    }
    try {
      const decoded = jwt.verify(token, secretKey) as { userId: string };
      (req as any).userId = decoded.userId;
      next();
  } catch (error:any) {
      
      (req as any).userId = null;
  }
}


