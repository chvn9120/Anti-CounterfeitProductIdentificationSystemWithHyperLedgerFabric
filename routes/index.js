import { Router } from 'express';
import indexController from '../controller/indexController.js';

const router = Router();

router.get('/at', indexController.GetAssetTransfer);
router.get('/register', indexController.GetRegister);
router.get('/login', indexController.GetLogin);
router.get('/', indexController.GetIndex);

export default router;
