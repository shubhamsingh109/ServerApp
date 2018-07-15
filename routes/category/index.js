/*===================== load all the files we need ========================================*/
import express from 'express';
import addcategory from './addcategory';
import deletecategory from './deletecategory';
import getcategory from './getcategory';
import updatecategory from './updatecategory';
import passport from 'passport';
let router=express.Router();


router.use(passport.authenticate('jwt', { session: false }),(req,res,next)=>{
	next();
})
/*=====================     providing routers    ========================================*/
router.post('/addcategory',addcategory);
router.put('/deletecategory/:categoryId',deletecategory);
router.post('/getcategory',getcategory);
router.put('/updatecategory/:categoryId',updatecategory);
export default router;
