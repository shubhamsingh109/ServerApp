/*===================== load all the things we need ========================================*/
  import express from 'express';
/*===================  load up the schema  ==============================================*/
  import Schema from '../../model/Schema'

  module.exports = (req,res)=>{
/*  ==================  updates the category name and budget  ============================================================================*/
  Schema.update({"email":req.body.email,"category":{$elemMatch:{categoryId:req.params.categoryId}}},
    {$set:{"category.$.categoryId":req.params.categoryId,"category.$.budget":req.body.budget,"category.$.categoryName":req.body.categoryName}},
    {strict:false},(err,result)=>{
      if(err){
        res.send(err);  //error
      }
      else{
        res.send(result); //category updated
      }
    }
 )
}

