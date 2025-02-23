import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded) {
            // @ts-ignore
            req.userId = decoded.userId;
        }
        next();
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized' });
    }
};