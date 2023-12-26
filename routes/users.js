import { Router } from 'express';
import { body, param, query, check } from 'express-validator';

import authentication from '../middlewares/authentication.js';
import userController from '../controller/userController.js';

const router = Router();

router.post('/order', body('p_id').notEmpty(), body('pQty').notEmpty(), userController.PostOrder);
router.get('/order', query('p_id'), userController.GetOrder);
router.post('/cart', body('p_id').notEmpty(), body('pQty').notEmpty(), body('inCartPage'), body('delFlag'), userController.PostCart);
router.get('/cart', query('p_id'), userController.GetCart);
router.get('/', userController.GetIndex);

export default router;
