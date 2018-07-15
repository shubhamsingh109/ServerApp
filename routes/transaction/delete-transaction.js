/*===================== load all the things we need ========================================*/
import express from 'express';
/*=================== load up the schema  ==============================================*/
import schema from '../../model/Schema';
import logger from '../../log4js';
/*===================  load up the config file =============================================*/
import *  as config from  '../../config/app.config';

module.exports=(req,res)=>{
 logger.debug('inside the delete transaction' + ' ' + 'delete-transaction.js:7');
 schema.find({"email":req.body.email,
   "transaction":{$elemMatch:{transaction_id:req.params.transaction_id}}}, 
   (err,result)=>{
    ;
    if(result.length===0){
      logger.info("Category Doesnot exists");
			res.send(config.Conf.deleteTransaction.notExistCategory); //if account id and category id as well are not found 
    }
    else{
     schema.update({"email":req.body.email,
      "transaction":{$elemMatch:{"transaction_id":req.params.transaction_id}}},{
        $pull:{"transaction":{"transaction_id":req.params.transaction_id}}
        },{strict:false} //update the category after checking email and category name
        ,
        (err,result)=>{
          if(err)    //error
            res.send(err);
          else
          {
            res.send(result)     //transaction deleted
          }
        })
   }   	
 });
};