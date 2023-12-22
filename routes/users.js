import { Router } from 'express';

import authentication from '../middlewares/authentication.js';
import userController from '../controller/userController.js';

const router = Router();

router.get('/order', authentication, userController.GetOrder);
router.get('/cart', authentication, userController.GetCart);
router.get('/', userController.GetIndex);

export default router;
