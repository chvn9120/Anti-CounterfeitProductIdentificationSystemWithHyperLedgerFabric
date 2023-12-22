import { Router } from 'express';
import { body, param, query, check } from 'express-validator';

import productController from '../controller/productController.js';

const router = Router();

router.get('/:id', param('id'), productController.GetProductById);

export default router;
