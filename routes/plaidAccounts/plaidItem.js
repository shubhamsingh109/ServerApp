  /*===================== load all the files we need ========================================*/
  import express from 'express';
  /*===================  load up the config file  ===========================================*/
  import key from  '../../config/plaid.config';
  import plaid from 'plaid';


  module.exports = (request,response,next)=>{
  	console.log("plaid item",key.client);
  	var client=key.client;    //getting plaid keys data from plaid.config.js

    /*============= function for authenticating the Item in exchange of access token======== */

    client.getItem(request.body.access_token, function(error, itemResponse) {
      if (error != null) {
        return response.json
        ({
          error: error
        });
      }

      /*===============  get additional informations about the Institution  =================*/
      client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes)
       {
        if (err != null) {
          var msg = 'Unable to pull institution information from the Plaid API.';
          console.log(msg + '\n' + error);
          return response.json({
            error: msg
          });
        } else {
          response.json({
            item: itemResponse.item,
            institution: instRes.institution,
          });
        }
      });
    });
    
  }

