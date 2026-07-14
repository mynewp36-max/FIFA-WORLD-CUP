"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transport_controller_1 = require("../controllers/transport.controller");
const router = (0, express_1.Router)();
// POST /api/transport/recommend
router.post('/recommend', transport_controller_1.TransportController.recommend);
exports.default = router;
//# sourceMappingURL=transport.routes.js.map