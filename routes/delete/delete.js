/*===================== load all the things we need ========================================*/
import express from 'express';
/*===================  load up the schema  ==============================================*/
import Schema from '../../model/Schema';

module.exports =(req,res)=>{
  Schema.remove({"email":req.body.email},(err,result)=>{ // Remove the user with the specified email id
  	if(err){
  		res.send(err);   //error
  	}
  	else{
          res.send(result); //send the result
        }
      });
}
