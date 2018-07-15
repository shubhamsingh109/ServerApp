/*===================== load all the things we need ========================================*/
import express from 'express';
/*===================  load up the schema ==============================================*/
import schema from '../../model/Schema';
import logger from '../../log4js';

module.exports = (req,res)=>{
  // updates the category name and budget 
  schema.update({"email":req.body.email,"transaction":{$elemMatch:{transaction_id:req.params.transaction_id}}},
    {$set:{"transaction.$.transaction_id":req.params.transaction_id,"transaction.$.account_id" : req.body.account_id,"transaction.$.categoryId" : req.body.categoryId,"transaction.$.date":req.body.date,"transaction.$.expense": req.body.expense,"transaction.$.description":req.body.description}},
    {strict:false},(err,result)=>{
      if(err){
       res.send(err);  //error
      }
      else{
        res.send(result);  //transaction updated
      }
    }
  )

}




