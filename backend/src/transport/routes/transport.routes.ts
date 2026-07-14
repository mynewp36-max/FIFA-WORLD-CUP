import { Router } from 'express';
import { TransportController } from '../controllers/transport.controller';

const router = Router();

// POST /api/transport/recommend
router.post('/recommend', TransportController.recommend);

export default router;
