/*===================== load all the files we need ========================================*/
import express from 'express';
/*===================  load up the user model ==============================================*/
import User from '../../model/Schema';
import bcrypt from 'bcrypt-nodejs';

module.exports = (req,res)=>{
	User.find({"email":req.body.email},(err,result)=>{  //if the email matches
		if(result)
		{
			let afterHashPassword = bcrypt.genSalt(10, function (err, salt) {
				if (err) {
					return res.status(404).json({
						success : false,
						message : "bcrypt genSalt error " + err 
					});
				}
				bcrypt.hash(req.body.password, salt,null, function(err, hash) {
					if (err) {
						return res.status(404).json({
							success : false,
							message : "bcrypt hash error " + err 
						});
					}
					afterHashPassword = hash;
						User.update({"email":req.body.email},{$set:{"password":afterHashPassword}},(err,result)=>{ //check the email and pass
							if(err){
								res.send(err) //send error
							}
							else{
								res.send(result); //send the result
							}
						})
					})
			})
		}
		else{
				res.send({"response":config.Conf.login.resetPassword.notExist}) ;//email doesn't exists
			}})
}
