/*===================== load all the things we need ==========================================*/
import express from 'express';
/*===================  load up the schema  ================================================*/
import Schema from '../../model/Schema';
/*===================  load up the config file  ==============================================*/
import *  as config from  '../../config/app.config';

module.exports = (req,res)=>{
/* ========================= creates a random id and store in db =============================*/
  let categoryId=parseInt(Math.random()*10000000);
/*===========================  find the category name  =======================================*/
  Schema.find({"email":req.body.email,
    "category":{$elemMatch:{categoryName:req.body.categoryName}}}, 
    (err,result)=>{
      if(result.length!=0){
        res.send({name:config.Conf.addCategory.nameExists}); //if email id is found
      }
      else{
        Schema.update({"email":req.body.email},
                      {$addToSet:{"category":{"categoryId":categoryId, //update the categoryId and category name
                      "categoryName":req.body.categoryName,"budget":req.body.budget}}},
                      {strict:false},(err,result)=>{
                        if(err){
                          res.send(err);  //error
                        }
                        else{
                          res.send(result);  //category added
                        }
                      })
      }
    })
}

