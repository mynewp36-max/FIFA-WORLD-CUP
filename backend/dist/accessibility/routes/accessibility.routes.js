"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accessibility_controller_1 = require("../controllers/accessibility.controller");
const router = (0, express_1.Router)();
// POST /api/accessibility/assist
router.post('/assist', accessibility_controller_1.AccessibilityController.assist);
exports.default = router;
//# sourceMappingURL=accessibility.routes.js.map