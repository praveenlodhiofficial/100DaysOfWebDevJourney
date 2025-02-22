import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '@repo/backend-common/config';

interface AuthRequest extends Request {
    userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]?.split(" ")[1] ?? "";

    if (!token) {
        return res.status(401).json({
            error: 'Token not provided'
        });
    }

    try {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: 'Invalid token'
                });
            }

            if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
                req.userId = decoded.userId as string;
                next();

            } else {
                return res.status(400).json({
                    error: 'Token payload is invalid'
                });
            }
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            error: 'http-middleware : Internal server error'
        });

    }
}
