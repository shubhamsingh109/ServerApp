/*===================== load all the files we need ========================================*/
import express from 'express';
import addaccount from './addaccount';
import deleteaccount from './deleteaccount';
import getaccount from './getaccount';
let router=express.Router();

/*=====================     providing routers    ========================================*/
router.post('/addaccount',addaccount);
router.post('/deleteaccount',deleteaccount);
router.post('/getaccount',getaccount);

export default router;
