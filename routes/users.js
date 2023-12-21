import { Router } from 'express';
import userController from '../controller/userController.js';

const router = Router();

router.get('/order', userController.GetOrder);
router.get('/cart', userController.GetCart);
router.get('/', userController.GetIndex);

export default router;
