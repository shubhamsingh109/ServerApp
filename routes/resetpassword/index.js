/*===================== load all the files we need ========================================*/
import express from 'express';
import resetPassword from './resetPassword';
import passport from 'passport';

let router=express.Router();
/*=====================     providing routers    ========================================*/
router.post('/',resetPassword);

export default router;