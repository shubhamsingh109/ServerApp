/*===================== load all the things we need ========================================*/
import express from 'express';
/*===================  load up the schema  ==============================================*/
import schema from '../../model/Schema';
import logger from '../../log4js';
/*===================  load up the config file ==============================================*/
import *  as config from  '../../config/app.config';

module.exports=(req,res)=>{
    
    let expense=parseInt(req.body.expense);
    logger.debug('inside add transaction route' + ' ' + 'add-transaction.js:7');
    schema.find({"email":req.body.email,
      "account":{$elemMatch:{account_id:req.params.account_id}},"category":{$elemMatch:{categoryId:req.params.categoryId}}}, 
      (err,result)=>{
         if(result.length===0){
            logger.info("transaction not added");
				res.send(config.Conf.addTransaction.notExist); //if account id and category id as well are not found 
            }	
            else{
                let rand = Math.floor(Math.random() * 1000000000);
                
                schema.update({"email": req.body.email}, //if email matches
                  {$addToSet:{"transaction": {"transaction_id":rand,"account_id" : req.params.account_id,
                  "categoryId" : req.params.categoryId,"date":req.body.date,"expense": req.body.expense,
                  "description":req.body.description}}},{strict:false},
                  (err,result)=>{
                      if(err){
                         res.json(err);
                     }
                     else{
                         res.json(result);
                     }
                 }) /*Callback closed*/
            }
        });
};