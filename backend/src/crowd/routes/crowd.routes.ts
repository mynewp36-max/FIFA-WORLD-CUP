import { Router } from 'express';
import { CrowdController } from '../controllers/crowd.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { CrowdAnalyzeSchema } from '../../utils/schemas';

const router = Router();

// POST /api/crowd/analyze
router.post('/analyze', validateRequest(CrowdAnalyzeSchema), CrowdController.analyzeSector);

export default router;
