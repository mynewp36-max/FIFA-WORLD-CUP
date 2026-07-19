"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operations_controller_1 = require("../controllers/operations.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const schemas_1 = require("../../utils/schemas");
const router = (0, express_1.Router)();
// POST /api/operations/summary
router.post('/summary', (0, validateRequest_1.validateRequest)(schemas_1.OperationsSummarySchema), operations_controller_1.OperationsController.generateSummary);
exports.default = router;
//# sourceMappingURL=operations.routes.js.map