import { Router } from 'express';
import { OperationsController } from '../controllers/operations.controller';

const router = Router();

// POST /api/operations/summary
router.post('/summary', OperationsController.generateSummary);

export default router;
