/*===================== load all the files we need ========================================*/
import express from 'express';
import deleteUser from './delete';
import passport from 'passport';

let router=express.Router();

router.use(passport.authenticate('jwt', { session: false }),(req,res,next)=>{
	next();
})
/*=====================     providing routers    ========================================*/

router.post('/',deleteUser);

export default router;
