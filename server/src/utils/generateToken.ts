import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: number) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined in .env file.");
    }

    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    console.log(token)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    
      maxAge:  60 * 60 * 1000, // 1hour days
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed. Please try again.");
  }
};
export default generateToken
