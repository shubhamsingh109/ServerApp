/*===================== load all the files we need ========================================*/
import express from 'express';
import login from './login';

let router=express.Router();
/*=====================     providing routers    ========================================*/
router.post('/',login);

export default router;
