/*===================== load all the files we need ========================================*/
import express from 'express';
/*===================  load up the user model ==============================================*/
import User from '../../model/Schema';
/*===================  load up the config file ==============================================*/
import *  as config from  '../../config/app.config';

module.exports = (req,res) => { 
//Calling find function
User.find({"email":req.body.email},(err,data)=>{ //find the specific email
   if(data===undefined){ // data metioned is undefined
    res.send({'Message':config.Conf.forget.invalidEmail}); //send the message if email the email is invalid
    }
    else{
res.json(data);  // send the result in json format
}
});
}






