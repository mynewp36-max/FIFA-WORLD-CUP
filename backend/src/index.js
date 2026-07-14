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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const requestLogger_1 = require("./middleware/requestLogger");
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
// 1. Validate required environment variables before server startup
if (!process.env.OPENROUTER_API_KEY) {
    console.error('\n[FATAL ERROR] Server failed to start.');
    console.error('Reason: Missing required environment variable: OPENROUTER_API_KEY');
    console.error('Please add OPENROUTER_API_KEY to your .env file.\n');
    process.exit(1);
}
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const helmet_1 = __importDefault(require("helmet"));
// Apply Helmet security headers early in the middleware pipeline.
// We explicitly set crossOriginResourcePolicy to false because we are
// building an API meant to be consumed by a cross-origin React frontend.
// The CORS middleware directly below will handle origin verification securely.
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
// 2. Configurable CORS
app.use((0, cors_1.default)({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
const compression_1 = __importDefault(require("compression"));
// 2.5 Compression (Gzip Only)
app.use((req, res, next) => {
    const acceptEncoding = req.headers['accept-encoding'];
    if (typeof acceptEncoding === 'string' && acceptEncoding.includes('gzip')) {
        // Force compression to use gzip exclusively by overriding the header
        req.headers['accept-encoding'] = 'gzip';
    }
    else {
        // If the client doesn't support gzip, disable compression entirely
        delete req.headers['accept-encoding'];
    }
    next();
});
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(requestLogger_1.requestLogger);
// 3. Import existing routes
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const navigation_routes_1 = __importDefault(require("./navigation/routes/navigation.routes"));
const accessibility_routes_1 = __importDefault(require("./accessibility/routes/accessibility.routes"));
const transport_routes_1 = __importDefault(require("./transport/routes/transport.routes"));
const operations_routes_1 = __importDefault(require("./operations/routes/operations.routes"));
const emergency_routes_1 = __importDefault(require("./emergency/routes/emergency.routes"));
const response_1 = require("./utils/response");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger.json'), 'utf8'));
// Swagger UI Route
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// 4. Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json((0, response_1.sendResponse)(req, true, {
        status: 'ok',
        service: 'FIFA World Cup AI Stadium Companion',
        version: '1.0.0',
    }, 'Health check successful'));
});
const rateLimiter_1 = require("./middleware/rateLimiter");
// Mount business logic routes (Rate Limited)
app.use('/api/ai', rateLimiter_1.aiRateLimiter, ai_routes_1.default);
app.use('/api/navigation', rateLimiter_1.aiRateLimiter, navigation_routes_1.default);
app.use('/api/accessibility', rateLimiter_1.aiRateLimiter, accessibility_routes_1.default);
app.use('/api/transport', rateLimiter_1.aiRateLimiter, transport_routes_1.default);
app.use('/api/operations', rateLimiter_1.aiRateLimiter, operations_routes_1.default);
app.use('/api/emergency', rateLimiter_1.aiRateLimiter, emergency_routes_1.default);
// 5. Global 404 Handler
app.use(errorHandler_1.notFoundHandler);
// 6. Global Error Middleware
app.use(errorHandler_1.errorHandler);
// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Accepting requests from frontend: ${frontendUrl}`);
});
//# sourceMappingURL=index.js.map