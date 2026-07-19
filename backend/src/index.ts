// ============================================================
// Server Entry Point
// All imports are declared at the top per ESM/CommonJS best
// practice. Middleware is applied in strict order: security
// headers → CORS → compression → body parsing → logging →
// routes → error handling.
// ============================================================
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';

import { env } from './config/env';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { aiRateLimiter } from './middleware/rateLimiter';
import { sendResponse } from './utils/response';

import aiRoutes from './ai/routes/ai.routes';
import navigationRoutes from './navigation/routes/navigation.routes';
import accessibilityRoutes from './accessibility/routes/accessibility.routes';
import transportRoutes from './transport/routes/transport.routes';
import operationsRoutes from './operations/routes/operations.routes';
import emergencyRoutes from './emergency/routes/emergency.routes';
import crowdRoutes from './crowd/routes/crowd.routes';

const app = express();
const { PORT: port, FRONTEND_URL: frontendUrl } = env;

// ─── Security Headers ───────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    hidePoweredBy: true,
  })
);

// ─── CORS ───────────────────────────────────────────────────
app.use(
  cors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// ─── Compression (gzip only) ────────────────────────────────
// Force gzip-only compression. If the client doesn't support
// gzip, disable compression entirely to avoid sending deflate.
app.use((req: Request, _res: Response, next: NextFunction): void => {
  const acceptEncoding = req.headers['accept-encoding'];
  if (typeof acceptEncoding === 'string' && acceptEncoding.includes('gzip')) {
    req.headers['accept-encoding'] = 'gzip';
  } else {
    delete req.headers['accept-encoding'];
  }
  next();
});
app.use(compression());

// ─── Body Parsing & Logging ─────────────────────────────────
app.use(express.json());
app.use(requestLogger);

// ─── Swagger UI ─────────────────────────────────────────────
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../swagger.json'), 'utf8')
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ─── Health Check ───────────────────────────────────────────
app.get('/api/health', (req: Request, res: Response): void => {
  res.status(200).json(
    sendResponse(req, true, {
      status: 'ok',
      service: 'FIFA World Cup AI Stadium Companion',
      version: '1.0.0',
    }, 'Health check successful')
  );
});

// ─── Feature Routes (Rate Limited) ──────────────────────────
app.use('/api/ai', aiRateLimiter, aiRoutes);
app.use('/api/navigation', aiRateLimiter, navigationRoutes);
app.use('/api/accessibility', aiRateLimiter, accessibilityRoutes);
app.use('/api/transport', aiRateLimiter, transportRoutes);
app.use('/api/operations', aiRateLimiter, operationsRoutes);
app.use('/api/emergency', aiRateLimiter, emergencyRoutes);
app.use('/api/crowd', aiRateLimiter, crowdRoutes);

// ─── Global 404 & Error Handlers ────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Accepting requests from frontend: ${frontendUrl}`);
});

export default app;
