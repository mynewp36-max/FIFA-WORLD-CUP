"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emergency_controller_1 = require("../controllers/emergency.controller");
const router = (0, express_1.Router)();
// POST /api/emergency/assist
router.post('/assist', emergency_controller_1.EmergencyController.assist);
exports.default = router;
//# sourceMappingURL=emergency.routes.js.map