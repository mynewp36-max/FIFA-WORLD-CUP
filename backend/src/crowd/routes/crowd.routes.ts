import { Router } from 'express';
import { CrowdController } from '../controllers/crowd.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { z } from 'zod';

const CrowdAnalyzeSchema = z.object({
  activeSector: z.string().min(1).max(100),
  density: z.string().min(1).max(50)
});

const router = Router();

// POST /api/crowd/analyze
router.post('/analyze', validateRequest(CrowdAnalyzeSchema), CrowdController.analyzeSector);

export default router;
