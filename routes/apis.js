import { Router } from 'express';
import apiController from '../controller/apiController.js';

const router = Router();

router.get('/all', apiController.GetIndex);
router.get('/', apiController.GetIndex);

export default router;
