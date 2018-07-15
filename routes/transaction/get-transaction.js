/*===================== load all the files we need ========================================*/
import express from 'express';
/*===================  load up the schema ==============================================*/
import schema from '../../model/Schema';
import logger from '../../log4js';

module.exports=(req,res)=>{
  schema.find({"email":req.body.email},
			(err,result)=>{ //find the specified email id and account type in Account Key
        if(err){ //If result is empty
          res.json(err);
      }
      else{
        		res.json(result); //send the response
            }
        })
}