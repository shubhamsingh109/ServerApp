import express from 'express';

import User from '../../model/Schema';

import bcrypt from 'bcrypt-nodejs';



module.exports = (req,res) => {



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

        	User.update({

		"email" : req.body.email

	},

	{$set: {"password":afterHashPassword}},

		(err,user)=>{

			if(err){

				res.status(404).json({

					success : false,

					message : "Bad Request " + err

				});

			} else{

				console.log(user);

				res.status(201).send(user);

			}

		});



      	//return afterHashPassword;

      });

    });







}