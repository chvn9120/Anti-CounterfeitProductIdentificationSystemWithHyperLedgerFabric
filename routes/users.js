import { Router } from 'express';
import userController from '../controller/userController.js';

const router = Router();

router.get('/', userController.GetIndex);

export default router;
