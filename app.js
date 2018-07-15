import logger from './log4js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
//import logger from 'morgan';
import Schema from './model/Schema';
import path from 'path';
import config from './config/config';
// import favicon from 'serve-favicon';
import mongoose from 'mongoose';
// import index from './routes/index';
let passport = require('passport');
import plaid from 'plaid';
import moment from 'moment';
let flash    = require('connect-flash');
import session from 'express-session';
import cors from 'cors';
let configDB = require('./config/database.js');
const app = express();
const debug = Debug('express-es-6:app');
import card from './routes/card';
import account from './routes/account';
import register from  './routes/register';
import login from  './routes/login';
import reset from './routes/resetpassword';
import category  from './routes/category';
import deleteUser from './routes/delete'; 
import forget from './routes/forget';
import verification from './routes/verification';
import mailer from './routes/mailer';
import resetPassword from './routes/resetpassword';
import transaction from './routes/transaction';
import plaidAccounts from './routes/plaidAccounts';
import upload from './routes/upload';
import email from './routes/email';
 //let bcrypt = require('bcrypt-nodejs');
 import jwt from 'jsonwebtoken';
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
// Initialize the Plaid client
var client = new plaid.Client(
  '59b928e6bdc6a46595e87ab1',
  '48d6cb02b1f767426e224709b2f773',
  '0db4a76988169fc8ed287c31fdf94a',
   plaid.environments['sandbox']
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(passport.initialize());
require('./config/passport')(passport);





app.post('/get_access_token', function(request, response, next) {
  console.log("get_access_token hgfj");
 // console.log("hey ajd",request.body.public_token);
    console.log("123");
  let PUBLIC_TOKEN = request.body.public_token;
  console.log("123");
  console.log("hey variable",PUBLIC_TOKEN);

  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    console.log("PUBLIC_TOKEN");
    if (error != null) {
      var msg = 'Could not exchange public_token!';
      console.log(msg + '\n' + error);
      return response.json({
        error: msg
      });
    }
    let ACCESS_TOKEN = tokenResponse.access_token;
    let ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    response.json({
      'Access Token': ACCESS_TOKEN,
      'Item_ID':ITEM_ID
    });
  });
})


app.post('/accounts', function(request, response, next) {
  // Retrieve high-level account information and account and routing numbers
  // for each account associated with the Item.
  console.log("hello accounts");
  // console.log("HEY",ACCESS_TOKEN);
  client.getAuth(request.body.access_token, function(error, authResponse) {
    if (error != null) {
      var msg = 'Unable to pull accounts from the Plaid API.';
      console.log(msg + '\n' + error);
      return response.json({
        error: msg
      });
    }

    console.log(authResponse.accounts);
    response.json({
      error: false,
      accounts: authResponse.accounts,
      numbers: authResponse.numbers,
    });
  });
});



app.post('/item', function(request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  console.log(client);
  client.getItem(request.body.access_token, function(error, itemResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));
      return response.json({
        error: error
      });
    }

    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
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
});


// app.use('/', index);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
   // persistent login sessions

   //app.use(passport.initialize());
  app.use(passport.session());
   app.use(flash()); // use connect-flash for flash messages stored in session
   require('./config/jwt-passport')(passport);
// routes ========
//==============================================================
require('./routes/routes.js')(app, passport);
  
  logger.debug('before call of card route' + ' ' + 'app.js:66');
app.use('/card',card)
  logger.debug('before call of Account route' + ' ' + 'app.js:72');
app.use('/account',account)
   logger.debug('before call of register route' + ' ' + 'app.js:78');
app.use('/register',register)
  logger.debug('before call of login route' + ' ' + 'app.js:81');
app.use('/login',login)
  logger.debug('before call of resetPassword route' + ' ' + 'app.js:84');
app.use('/reset',reset)
  logger.debug('before call of addcategory route' + ' ' + 'app.js:87');
app.use('/category',category)
  logger.debug('before call of /delete route' + ' ' + 'app.js:90');
app.use('/deleteuser',deleteUser)
  logger.debug('before call of /forget route' + ' ' + 'app.js:93');
app.use('/forget',forget)
  logger.debug('before call of /verification route' + ' ' + 'app.js:96');
app.use('/verify',verification)
  logger.debug('before call of /mailer route' + ' ' + 'app.js:99');
app.use('/mailer',mailer)
app.use('/resetpassword',resetPassword);
  app.use('/transaction',transaction);
  app.use('/plaidaccounts',plaidAccounts); 
app.use('/upload',upload);
app.use('/email',email);





// catch 404 and forward to error handler
app.use((req, res, next) => {
    logger.error(err.status + ' ' +res + ' ' + 'route NOT Found' + 'app.js:114');
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);
  logger.error(err.status + ' ' + 'internal server error' + 'app.js:129');
});

// Handle uncaughtException
// process.on('uncaughtException', (err) => {
//   debug('Caught exception: %j', err);
//   process.exit(1);
// });

export default app;
