import { Router } from 'express';
import productController from '../controller/productController.js';

const router = Router();

router.get('/', productController.GetIndex);

export default router;
