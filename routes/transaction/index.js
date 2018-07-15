/*===================== load all the files we need ========================================*/
import express from 'express';
import passport from 'passport';
import addtransaction from './add-transaction';
import deletetransaction from './delete-transaction';
import updatetransaction from './updatetransaction';
import gettransaction from './get-transaction';
let router = express.Router();

router.use(passport.authenticate('jwt', { session: false }),(req,res,next)=>{
	next();
})
/*=====================     providing routers    ========================================*/
router.post('/',gettransaction);
router.put('/:account_id/:categoryId',addtransaction);
router.put('/:transaction_id',deletetransaction);
router.put('/update/updatetransaction/:transaction_id',updatetransaction);

export default router;