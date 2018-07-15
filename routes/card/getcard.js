/*===================== load all the files we need ========================================*/
import express from 'express';
/*===================  load up the user model ==============================================*/
import User from '../../model/Schema';
/*===================  load up the config file  ==============================================*/
import message from '../../config/app.config';

//returns all the cards corresponding to the email id 
module.exports =(req,res)=>{
		User.find({"Email":req.body.Email},(err,result)=>{ //find the provided email id
			console.log(result);
			if(err)
			{
				res.send(message.getCard.err);	//if any error occurs
			}
			else{
				console.log(result);
						res.send(result); //send the response
					}
				});
	}

