import express, { NextFunction, Request, Response } from 'express';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { config } from 'dotenv';
import { AppError } from './utils/classError';
import userRouter from './modules/users/user.controller';
import checkConnectionDB from './DB/connectionDB';

// ============ Load ENV ============
config({ path: resolve('./config/.env') });

const app: express.Application = express();
const port: string | number = process.env.PORT || 5000;

// ============ Rate Limiter ============
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 10,
  message: {
    error: 'Game Over ....',
  },
  statusCode: 429,
  legacyHeaders: false,
});

// ============ Bootstrap Function ============
const bootstrap = () => {
  // Middleware
  checkConnectionDB();
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(limiter);

  // Root Route
  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: 'Welcome to my SocialMediaApp' });
  });

  app.use('/user', userRouter);

  // Invalid URL Handler (Catch-all)
  app.use('{/*demo}', (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Invalid URL ${req.originalUrl}`, 404);
  });

  // Global Error Handler
  app.use(
    (error: AppError, req: Request, res: Response, next: NextFunction) => {
      const statusCode = error.statusCode || 500;

      const response: Record<string, any> = {
        message: error.message,
      };

      // Include stack trace only outside production
      if (process.env.NODE_ENV !== 'production') {
        response.stack = error.stack;
      }

      res.status(statusCode).json(response);
    }
  );

  // Start Server
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
};

export default bootstrap;
