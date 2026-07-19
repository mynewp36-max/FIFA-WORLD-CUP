"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ============================================================
// Server Entry Point
// All imports are declared at the top per ESM/CommonJS best
// practice. Middleware is applied in strict order: security
// headers → CORS → compression → body parsing → logging →
// routes → error handling.
// ============================================================
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const env_1 = require("./config/env");
const requestLogger_1 = require("./middleware/requestLogger");
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const response_1 = require("./utils/response");
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const navigation_routes_1 = __importDefault(require("./navigation/routes/navigation.routes"));
const accessibility_routes_1 = __importDefault(require("./accessibility/routes/accessibility.routes"));
const transport_routes_1 = __importDefault(require("./transport/routes/transport.routes"));
const operations_routes_1 = __importDefault(require("./operations/routes/operations.routes"));
const emergency_routes_1 = __importDefault(require("./emergency/routes/emergency.routes"));
const crowd_routes_1 = __importDefault(require("./crowd/routes/crowd.routes"));
const app = (0, express_1.default)();
const { PORT: port, FRONTEND_URL: frontendUrl } = env_1.env;
// ─── Security Headers ───────────────────────────────────────
app.use((0, helmet_1.default)({
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
}));
// ─── CORS ───────────────────────────────────────────────────
app.use((0, cors_1.default)({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
// ─── Compression (gzip only) ────────────────────────────────
// Force gzip-only compression. If the client doesn't support
// gzip, disable compression entirely to avoid sending deflate.
app.use((req, _res, next) => {
    const acceptEncoding = req.headers['accept-encoding'];
    if (typeof acceptEncoding === 'string' && acceptEncoding.includes('gzip')) {
        req.headers['accept-encoding'] = 'gzip';
    }
    else {
        delete req.headers['accept-encoding'];
    }
    next();
});
app.use((0, compression_1.default)());
// ─── Body Parsing & Logging ─────────────────────────────────
app.use(express_1.default.json());
app.use(requestLogger_1.requestLogger);
// ─── Swagger UI ─────────────────────────────────────────────
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger.json'), 'utf8'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// ─── Health Check ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.status(200).json((0, response_1.sendResponse)(req, true, {
        status: 'ok',
        service: 'FIFA World Cup AI Stadium Companion',
        version: '1.0.0',
    }, 'Health check successful'));
});
// ─── Feature Routes (Rate Limited) ──────────────────────────
app.use('/api/ai', rateLimiter_1.aiRateLimiter, ai_routes_1.default);
app.use('/api/navigation', rateLimiter_1.aiRateLimiter, navigation_routes_1.default);
app.use('/api/accessibility', rateLimiter_1.aiRateLimiter, accessibility_routes_1.default);
app.use('/api/transport', rateLimiter_1.aiRateLimiter, transport_routes_1.default);
app.use('/api/operations', rateLimiter_1.aiRateLimiter, operations_routes_1.default);
app.use('/api/emergency', rateLimiter_1.aiRateLimiter, emergency_routes_1.default);
app.use('/api/crowd', rateLimiter_1.aiRateLimiter, crowd_routes_1.default);
// ─── Global 404 & Error Handlers ────────────────────────────
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// ─── Start Server ────────────────────────────────────────────
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Accepting requests from frontend: ${frontendUrl}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map