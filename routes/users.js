import { Router } from 'express';
import Authentication from '../middlewares/authentication.js';

import userController from '../controller/userController.js';

const router = Router();

router.get('/cart',Authentication, userController.GetCart);
router.get('/', userController.GetIndex);

export default router;
