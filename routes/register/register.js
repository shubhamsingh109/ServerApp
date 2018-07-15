/*===================== load all the things we need ========================================*/
import express from 'express';
/*===================  load up the user model ==============================================*/
import User from '../../model/Schema';
/*===================  load up the user model ==============================================*/
import message from '../../config/app.config';
import logger from '../../log4js';
/*===================  load up the user model ==============================================*/
import *  as config from  '../../config/app.config';
module.exports = (req,res)=>{
	
	console.log("saaas");
	logger.debug('inside register route' + ' ' + 'register.js:6');
	User.find({"email":req.body.email},(err,result)=>{ //check the email id
		if(result.length!=0)
		{
			logger.info(config.Conf.register.userExist );
			res.send({"response":config.Conf.register.exist}); //email already exist
		}
		else{
			logger.info(config.Conf.register.new);
			let user=new User();
			user.fullName=req.body.fullName;
			user.password=req.body.password;
			user.email=req.body.email;
			user.contact=req.body.contact;
			user.dob=req.body.dob; //input all the fields value
			user.save((err,result)=>{
				if(err){
					res.send(err);
					logger.error(err + ' ' + 'problem with registering new user' + ' ' + 'register.js:25');
				}
				else
				{
					logger.info(config.Conf.register.newUser);
					res.send(result); //send the response
				}
			})
		}
	})
}
