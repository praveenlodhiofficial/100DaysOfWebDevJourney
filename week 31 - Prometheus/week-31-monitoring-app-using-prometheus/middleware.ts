import type { Request, Response, NextFunction } from 'express';

export function middleware(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`${req.method} ${req.url} took ${duration}ms`);
}