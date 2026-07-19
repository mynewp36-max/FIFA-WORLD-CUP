import { Router } from 'express';
import { TransportController } from '../controllers/transport.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { TransportRecommendSchema } from '../../utils/schemas';

const router = Router();

// POST /api/transport/recommend
router.post('/recommend', validateRequest(TransportRecommendSchema), TransportController.recommend);

export default router;
