 /*===================  load up the config file  ===========================================*/
 import key from  '../../config/plaid.config';
 /*===================== load all the files we need ========================================*/
 import express from 'express';

 module.exports = (request,response,next)=>{
	var client=key.client;  //getting plaid keys data from plaid.config.js

  client.getAuth(request.body.access_token, function(error, authResponse) {
    if (error != null) {
      var msg = 'Unable to pull accounts from the Plaid API.';
      console.log(msg + '\n' + error);

      return response.json({
        error: msg
      });
    }

    /*===================sendind the response in JSON from=========================*/
    response.json({
      error: false,
      accounts: authResponse.accounts,  //getting present accounts informatin in Institution
      numbers: authResponse.numbers,    //getting additional information such as routing number
    });
  });
}

