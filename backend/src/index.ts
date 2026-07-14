import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

// 1. Validate required environment variables before server startup
if (!process.env.OPENROUTER_API_KEY) {
  console.error('\n[FATAL ERROR] Server failed to start.');
  console.error('Reason: Missing required environment variable: OPENROUTER_API_KEY');
  console.error('Please add OPENROUTER_API_KEY to your .env file.\n');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

import helmet from 'helmet';

// Apply Helmet security headers early in the middleware pipeline.
// We explicitly set crossOriginResourcePolicy to false because we are
// building an API meant to be consumed by a cross-origin React frontend.
// The CORS middleware directly below will handle origin verification securely.
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// 2. Configurable CORS
app.use(
  cors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

import compression from 'compression';

// 2.5 Compression (Gzip Only)
app.use((req: Request, _res: Response, next: NextFunction) => {
  const acceptEncoding = req.headers['accept-encoding'];
  if (typeof acceptEncoding === 'string' && acceptEncoding.includes('gzip')) {
    // Force compression to use gzip exclusively by overriding the header
    req.headers['accept-encoding'] = 'gzip';
  } else {
    // If the client doesn't support gzip, disable compression entirely
    delete req.headers['accept-encoding'];
  }
  next();
});
app.use(compression());

app.use(express.json());
app.use(requestLogger);

// 3. Import existing routes
import aiRoutes from './routes/ai.routes';
import navigationRoutes from './navigation/routes/navigation.routes';
import accessibilityRoutes from './accessibility/routes/accessibility.routes';
import transportRoutes from './transport/routes/transport.routes';
import operationsRoutes from './operations/routes/operations.routes';
import emergencyRoutes from './emergency/routes/emergency.routes';

import { sendResponse } from './utils/response';

import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../swagger.json'), 'utf8')
);

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 4. Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json(
    sendResponse(req, true, {
      status: 'ok',
      service: 'FIFA World Cup AI Stadium Companion',
      version: '1.0.0',
    }, 'Health check successful')
  );
});

import { aiRateLimiter } from './middleware/rateLimiter';

// Mount business logic routes (Rate Limited)
app.use('/api/ai', aiRateLimiter, aiRoutes);
app.use('/api/navigation', aiRateLimiter, navigationRoutes);
app.use('/api/accessibility', aiRateLimiter, accessibilityRoutes);
app.use('/api/transport', aiRateLimiter, transportRoutes);
app.use('/api/operations', aiRateLimiter, operationsRoutes);
app.use('/api/emergency', aiRateLimiter, emergencyRoutes);

// 5. Global 404 Handler
app.use(notFoundHandler);

// 6. Global Error Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Accepting requests from frontend: ${frontendUrl}`);
});
