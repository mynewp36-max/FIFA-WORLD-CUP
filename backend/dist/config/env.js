"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().default('3000'),
    FRONTEND_URL: zod_1.z.string().url().default('http://localhost:5173'),
    OPENROUTER_API_KEY: zod_1.z.string().min(1, 'OPENROUTER_API_KEY is required'),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error('\n[FATAL ERROR] Invalid environment variables:');
    console.error(_env.error.format());
    process.exit(1);
}
exports.env = _env.data;
//# sourceMappingURL=env.js.map