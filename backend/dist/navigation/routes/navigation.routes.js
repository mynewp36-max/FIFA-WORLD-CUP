"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const navigation_controller_1 = require("../controllers/navigation.controller");
const router = (0, express_1.Router)();
// Route: POST /api/navigation/route
router.post('/route', navigation_controller_1.NavigationController.getRoute);
exports.default = router;
//# sourceMappingURL=navigation.routes.js.map