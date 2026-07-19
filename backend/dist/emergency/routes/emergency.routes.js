"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emergency_controller_1 = require("../controllers/emergency.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const schemas_1 = require("../../utils/schemas");
const router = (0, express_1.Router)();
// POST /api/emergency/assist
router.post('/assist', (0, validateRequest_1.validateRequest)(schemas_1.EmergencyDispatchSchema), emergency_controller_1.EmergencyController.assist);
exports.default = router;
//# sourceMappingURL=emergency.routes.js.map