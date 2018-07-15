/*===================== load all the files we need ========================================*/
import express from 'express';
/*===================  load up the  schema  ==============================================*/
import Schema from '../../model/Schema';
module.exports =(req,res)=>{
  Schema.update({"email":req.body.email,   //if email matches
    "account":{$elemMatch:{"account_id":req.params.account_id}}},{
      $pull:{"account":{"account_id":req.params.account_id}}
        },{strict:false} //update the category after checking email and category name
        ,
        (err,result)=>{
          if(err)
            res.send(err); //error
          else
          {
            res.send(result) //account deleted
          }
        })
}

