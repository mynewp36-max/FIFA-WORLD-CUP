"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operations_controller_1 = require("../controllers/operations.controller");
const router = (0, express_1.Router)();
// POST /api/operations/summary
router.post('/summary', operations_controller_1.OperationsController.generateSummary);
exports.default = router;
//# sourceMappingURL=operations.routes.js.map