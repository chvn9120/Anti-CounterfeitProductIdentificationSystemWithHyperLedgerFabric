import { Router } from 'express';
import Authentication from '../middlewares/authentication.js';
import { body, param, query } from 'express-validator';

const router = Router();

import indexController from '../controller/indexController.js';
import errorController from '../controller/errorController.js';

router.get('/at', indexController.GetAssetTransfer);
router.post('/register', body('username').trim(), body('password').trim(), body('confirm_password').trim(), indexController.PostRegister);
router.get('/register', indexController.GetRegister);
router.post('/login', body('username').trim(), body('password').trim(), body('isRemember'), indexController.PostLogin);
router.get('/login', indexController.GetLogin);
router.get('/logout', indexController.GetLogout);
router.get('/', indexController.GetIndex);
router.get('/error', errorController.DisplayErrors);

export default router;
