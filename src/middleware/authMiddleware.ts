import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = `${process.env.SECRET_KEY}`; // Replace with your actual secret key

function verifyAuthToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalid or expired' });
    }

    // Attach the decoded user information to the request for later use
    req.body['user'] = decoded;
    next();
  });
}

function generateAuthToken(userId: number) {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}


export {
    generateAuthToken,
    verifyAuthToken,
}