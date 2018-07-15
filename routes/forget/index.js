/*===================== load all the files we need ========================================*/
import express from 'express';
import forget from './forget';
import change from './change';
import passport from 'passport';

let router=express.Router();

/*=====================     providing routers    ========================================*/
router.post('/',forget);
router.put('/',change);

export default router;