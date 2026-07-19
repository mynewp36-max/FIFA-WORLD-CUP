"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crowd_controller_1 = require("../controllers/crowd.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const schemas_1 = require("../../utils/schemas");
const router = (0, express_1.Router)();
// POST /api/crowd/analyze
router.post('/analyze', (0, validateRequest_1.validateRequest)(schemas_1.CrowdAnalyzeSchema), crowd_controller_1.CrowdController.analyzeSector);
exports.default = router;
//# sourceMappingURL=crowd.routes.js.map