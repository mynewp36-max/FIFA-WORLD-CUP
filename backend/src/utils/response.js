"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateRequestId = () => crypto_1.default.randomUUID();
const sendResponse = (req, success, data = null, message = '') => {
    // Use existing requestId if attached to request (e.g., from a logger middleware), otherwise generate one
    const requestId = req.requestId || generateRequestId();
    return {
        success,
        data,
        message,
        requestId,
        timestamp: new Date().toISOString(),
    };
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=response.js.map