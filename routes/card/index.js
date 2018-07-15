/*===================== load all the files we need ========================================*/
import express from 'express';
import getcard from './getcard';
import addcard from './addcard';
import addflag from './addflag';
let router=express.Router();

/*=====================     providing routers    ========================================*/
router.post('/getcard',getcard);
router.post('/addcard',addcard);
router.post('/addflag',addflag);
export default router;
