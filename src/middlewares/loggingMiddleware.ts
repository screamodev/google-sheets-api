import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const start = Date.now();

    res.on('finish', () => {
      const responseTime = Date.now() - start;
      this.logger.log(
        `${method} ${url} - ${res.statusCode} (${responseTime}ms)`,
      );
    });

    next();
  }
}
