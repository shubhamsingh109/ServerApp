	import express from 'express';
  /*===================  load up schema file  ==============================================*/
  import Schema from '../../model/Schema';
  let router=express.Router();
  /*===================  load up the config file  ============================================*/
  import *  as config from  '../../config/app.config';

  module.exports= (req,res)=>{
		Schema.findOne({"email":req.body.email,"account":{$elemMatch:{"account_id":req.body.account_id}}},(err,result)=>{ //check if the email and account type accout is there
      if(err){
        res.send(err); //error
      }
      else if(result){
                 res.send({"response":config.Conf.addAccount.alreadyExist}) //account already exists
               }
               else{
             Schema.update({"email":req.body.email},{ //update the account once the server check that email specified is present
              $addToSet:{"account":{"type":req.body.type,"balances":req.body.balances,"name":req.body.name,"account_id":req.body.account_id,"flag":req.body.flag,"institution_name":req.body.institution_name}}},{strict:false} 
              ,
              (err,result)=>{
                if(err)
                  res.send(err); //error
                else
                {
                res.send(result) //send the result
              }
            })
           }
         })
  }


