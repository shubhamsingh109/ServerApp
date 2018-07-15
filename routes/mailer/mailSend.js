  /*===================== load all the things we need ========================================*/
  import express from 'express';
  import nodemailer from 'nodemailer';
  /*===================  load up the config file =============================================*/
  import *  as config from  '../../config/app.config';

  module.exports = (req, res) => {
    let transporter = nodemailer.createTransport({  //create a transport channel
     service: 'gmail',
     auth: {
       user: config.Conf.mailSend.email,
       pass: config.Conf.mailSend.password
     }
   });
    console.log(req.body.content);
    const mailOptions = {
  from: config.Conf.mailSend.email, // sender address //email id provided
  to: req.body.email, // list of receivers
  subject: req.body.subject, // Subject line
  html: `<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  </head>
  <body style="font-family:-apple-system, '.SFNSText-Regular', 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif; color: #666666
  ; background:white; text-decoration: none;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
  <tr align="center">
  <td valign="top" style="width: 100%;">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  </head>
  <body style="font-family:-apple-system, '.SFNSText-Regular', 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif; color: #666666
  ; background:white; text-decoration: none;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
  <tr align="center">
  <td valign="top" style="width: 100%;">
  <table style="padding: 0px; border: 0; max-width: 520px; text-align: center;" width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
  <tr align="center">
  <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 14pt; font-weight: bold; color: #333333
  ;">
  <h1>Expense Manager</h1>
  <p style="margin: 0; padding: 0;">Budget Overshoot</p>
  </td>
  </tr>
  <tr align="center">
  <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 11pt;">
  <p>`+req.body.content+`</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </body>
  </html>`// plain text body
};
  transporter.sendMail(mailOptions, function(error, info){ //send the mail
    if (error) {
      res.send({"message":config.Conf.mailSend.invalidEmail}); // invalid email
    } else {
  res.send({"information":info.response,"message":config.Conf.mailSend.budgetOvershoot}); //send the response is the budget overshoot
}
});  
}