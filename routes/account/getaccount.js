/*===================== load all the files we need ========================================*/
import express from 'express';
/*===================  load up the user model ==============================================*/
import User from '../../model/Schema';

module.exports = (req,res)=>{
	console.log(req.body.Email);
	User.find({"email":req.body.email},(err,result)=>{ //if email matches
		if(err)
			res.send(err); //error
		else
		{
			console.log(result[0].account); 
             res.send(result[0].account);//return the categories 
           }
         })
}

