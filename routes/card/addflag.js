/*===================== load all the files we need ========================================*/
import express from 'express';
/*===================  load up the schema  ==============================================*/
import Schema from '../../model/Schema';
module.exports = (req,res)=>{
	Schema.updateOne({"Email":req.body.Email,"Account.cardNo":req.body.cardNo},
	//updating flag corresponding tothe email and card no
	{$set:{"Account.$.flag":req.body.flag}},{strict:false},(err,result)=>{
		if(err){

			res.send(err);  //error
		}
		else{
			res.send({flag:req.body.flag});
		}
	})
}
