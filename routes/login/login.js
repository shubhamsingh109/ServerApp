import express from 'express';

import User from '../../model/Schema';

import jwt from 'jsonwebtoken';

import comparePassword from '../../utils/comparePassword';



module.exports = (req,res)=>{

    User.findOne({"email":req.body.email},(err,result)=>{

      //finds the email id, if already exists

      if(err)

      {

        console.log(err, "this is ")

        res.send({error:"error occured"});

      }

      //if email not found, that is not registered

      else if(result==null){

        console.log(err, "this is after")

        res.send({error:"user not found"});

      }

      // if email exists, compare password

      else{

        comparePassword(req.body.password,result.password,(err,isMatch)=>{

        if(isMatch&&!err){

          let token=jwt.sign({result},"hithisissecret",{

        expiresIn: 10080 // in seconds

      });

           res.json({ success: true, token: 'Bearer ' + token });

        }

        else{

           res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });



        }

        }) 

        

      }

    })

  }