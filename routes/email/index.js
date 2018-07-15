import express from 'express';
import getEmail from './getEmail';
let router=express.Router();

router.post('/',getEmail);
export default router;