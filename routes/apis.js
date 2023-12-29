import { Router } from 'express';
import { body, param, query, check } from 'express-validator';
import apiController from '../controller/apiController.js';

const router = Router();

router.get('/4/:asset_id', param('asset_id'), apiController.GetDeleteAssetById);
router.get('/3/:asset_id', param('asset_id'), apiController.GetExistAssetById);
router.get('/2/:asset_id', param('asset_id'), apiController.GetAssetById);
router.get('/1', apiController.GetIndex);

export default router;
