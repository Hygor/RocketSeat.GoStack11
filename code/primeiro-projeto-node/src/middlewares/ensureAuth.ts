import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is missing!');
  }

  const { secret } = authConfig.jwt;
  const [, token] = authHeader.split(' ');
  try {
    const decode = verify(token, secret);
    const { sub } = decode as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new Error('Invalid Token!');
  }
}

export default ensureAuth;
