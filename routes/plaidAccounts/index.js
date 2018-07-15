/*===================== load all the files we need ========================================*/
import express from 'express';
import accessToken from './plaidAccessToken';
import accounts from './plaidAccount';
import item from './plaidItem';

let router=express.Router();
/*=====================     providing routers    ========================================*/
router.post('/item',item);
router.post('/accesstoken',accessToken);
router.post('/accounts',accounts);

export default router;
