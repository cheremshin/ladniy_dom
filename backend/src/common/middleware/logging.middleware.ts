import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogginMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (process.env.NODE_ENV !== 'development') {
            return next();
        }

        const start = Date.now();
        const { method, originalUrl, ip } = req;

        console.log(`[REQ] ${method} ${originalUrl} - ${ip}`);
        console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);

        res.on('finish', () => {
            const duration = Date.now() - start;
            const { statusCode } = res;
            console.log(`[RES] ${method} ${originalUrl} ${statusCode} - ${duration}ms`);
        });

        next();
    }
}
