/*===================== load all the files we need ========================================*/
import express from 'express';
/*===================  load up the schema ==============================================*/
import Schema from '../../model/Schema';

module.exports=(req,res)=>{
	Schema.find({"Email":req.body.Email,"Account.type":"credit","Account":{$elemMatch:{cardNo:req.body.cardNo}}},
		(err,result)=>{
			// find the email and account type; match the cardNo
			if(result.length==0)
			{
				console.log("card not found");
				Schema.update({"Email":req.body.Email}, 
					{$addToSet:{
						"Account":{
					"cardNo":req.body.cardNo, //update the card no. expdate and holdername
					"expDate":req.body.expDate,
					"holderName":req.body.holderName,
					"type":"credit",
					"flag":"true"}
				}},
				{strict:false},(err,result)=>{
					if(err){
						res.send(err); //error
					}
					else{
						res.send(result); //success
					}
				})
			}
			else{
				res.send(result); //If email already exists
			}
        });
}

