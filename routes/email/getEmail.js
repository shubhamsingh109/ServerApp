import express from 'express';
import Schema from '../../model/Schema';
module.exports=(req,res)=>{
	console.log("fj");
	Schema.find({"_id":req.body._id},(err,result)=>{
		console.log("hi");
		if(err){
			res.send(err);
		}
		else{
			console.log(result[0].email);
			res.send(result[0].email);
		}
	});

}
