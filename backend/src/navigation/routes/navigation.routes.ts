import { Router } from 'express';
import { NavigationController } from '../controllers/navigation.controller';

const router = Router();

// Route: POST /api/navigation/route
router.post('/route', NavigationController.getRoute);

export default router;
