"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transport_controller_1 = require("../controllers/transport.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const schemas_1 = require("../../utils/schemas");
const router = (0, express_1.Router)();
// POST /api/transport/recommend
router.post('/recommend', (0, validateRequest_1.validateRequest)(schemas_1.TransportRecommendSchema), transport_controller_1.TransportController.recommend);
exports.default = router;
//# sourceMappingURL=transport.routes.js.map