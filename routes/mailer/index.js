/*===================== load all the files we need ========================================*/
import express from 'express';
import mailSend from './mailSend';

let router=express.Router();

/*=====================     providing routers    ========================================*/
router.post('/', mailSend); // handle the route at yourdomain.com/sayHello

export default router;