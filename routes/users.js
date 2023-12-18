import { Router } from 'express';
import userController from '../controller/userController.js';

const router = Router();

/* GET users listing. */
router.get('/', userController.GetIndex);

export default router;
