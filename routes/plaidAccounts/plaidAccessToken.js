 /*===================  load up the config file  ===========================================*/
 import key from  '../../config/plaid.config';
 /*===================== load all the files we need ========================================*/
 import express from 'express';

 module.exports = (request,response,next)=>{
	var client=key.client; //getting plaid keys data from plaid.config.js
  let PUBLIC_TOKEN = request.body.public_token;  //getting public token 

  /*=================== getting ACCESS_TOKEN in exchange of PUBLIC_TOKEN=====================*/

  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
   
    if (error != null) {
      var msg = 'Could not exchange public_token!';

      return response.json({
        error: msg
      });
    }

    /*===================ACCESS_TOKEN received=========================*/
    let ACCESS_TOKEN = tokenResponse.access_token;

    /*===================ITEM_ID received=========================*/
    let ITEM_ID = tokenResponse.item_id;

    /*===================sendind the response in JSON from=========================*/
    response.json({
      'Access Token': ACCESS_TOKEN,
      'Item_ID':ITEM_ID
    });
  });
  
}

