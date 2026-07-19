"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("../controllers/ai.controller");
const validateRequest_1 = require("../middleware/validateRequest");
const schemas_1 = require("../utils/schemas");
const router = (0, express_1.Router)();
// Route: POST /api/ai/chat
router.post('/chat', (0, validateRequest_1.validateRequest)(schemas_1.ChatRequestSchema), ai_controller_1.AiController.handleChat);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map