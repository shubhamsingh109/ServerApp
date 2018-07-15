/*===================== load all the things we need ========================================*/
import express from 'express';
/*===================  load up the schema  ==============================================*/
import Schema from '../../model/Schema';

module.exports =(req,res)=>{ 
/*=================== check if the credentials are right   =================================*/
  Schema.update({"email":req.body.email,
    "category":{$elemMatch:{"categoryId":req.params.categoryId}}},{
      $pull:{"category":{"categoryId":req.params.categoryId}}
        },{strict:false} //update the category after checking email and category name
        ,
        (err,result)=>{
          if(err)
            res.send(err);  //error
          else
          {
            res.send(result) //success
          }
        })
}

