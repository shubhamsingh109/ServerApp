/*===================== load all the things we need ========================================*/
import express from 'express';
/*===================  load up the schema ==============================================*/
import Schema from '../../model/Schema';

module.exports = (req,res)=>{
      Schema.find({"email":req.body.email},(err,result)=>{ //if email matches
      	if(err)
      		res.send(err);
      	else
      	{ 
             res.send(result[0].category) //return the categories 
         }
     })
  }