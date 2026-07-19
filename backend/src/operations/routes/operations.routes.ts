import { Router } from 'express';
import { OperationsController } from '../controllers/operations.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { OperationsSummarySchema } from '../../utils/schemas';

const router = Router();

// POST /api/operations/summary
router.post('/summary', validateRequest(OperationsSummarySchema), OperationsController.generateSummary);

export default router;
