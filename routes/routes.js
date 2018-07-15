let JwtStrategy = require('passport-jwt').Strategy;  
let ExtractJwt = require('passport-jwt').ExtractJwt;  
let UserSchema = require('../model/Schema');
import jwt from 'jsonwebtoken';
module.exports = function(app, passport) {

	/*=========================  normal routes   ==================================================*/
// show the home page (will also have our login links)
app.get('/', function(req, res) {
	res.render('index.ejs');
});
/*============================== PROFILE SECTION =============================================*/
app.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile.ejs', {
		user : req.user
	});
});
/*============================================ LOGOUT =========================================
*/	app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});
/*===================   AUTHENTICATE (FIRST LOGIN) =======================================
*/
// facebook -------------------------------
   // send to facebook to do the authentication
   app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' })

   	);
   app.get('/auth/facebook/callback',
   	passport.authenticate('facebook', {
   		failureRedirect : 'http://localhost:4200/login'
   	}), (req, res) => {
   		if(res.user==false){
   			res.redirect("http://localhost:4200/login")
   		}
   		let data=req.user;
   		let token="Bearer "+jwt.sign({data},"hithisissecret");
   		console.log("This is fb token", token);
   		res.cookie('token',{token:token,email:req.user.email});
   		res.redirect('http://localhost:4200/middleware');
   	});
// twitter --------------------------------
  // send to twitter to do the authentication
  app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }),(req,res)=>{
  	res.json(req.user);
  });
// handle the callback after twitter has authenticated the user
app.get('/auth/twitter/callback',
	passport.authenticate('twitter', {
		failureRedirect : 'http://localhost:4200/login'
	}), (req, res) => {
		if(res.user==false){
			res.redirect('http://localhost:4200/login');
		}
		let data=req.user;
		let token="Bearer "+jwt.sign({data},"hithisissecret");
		console.log("This is twitter token", token);
		res.cookie('token',{"token":token,"email":req.user.email});
		res.redirect('http://localhost:4200/middleware');
	});
// google ---------------------------------
   // send to google to do the authentication
   app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] },
   	(req,res)=>{
   		res.json(req.user);
   	}));

   app.get('/auth/google/callback',
   	passport.authenticate('google', {
   		failureRedirect : 'http://localhost:4200/login'
   	}), (req, res) => {
   		if(res.user==false){
   			res.redirect('http://localhost:4200/middleware');
   		}
   		let data=req.user;
   		let token="Bearer "+jwt.sign({data},"hithisissecret");
   		console.log("This is twitter token", token);
   		res.cookie('token',{"token":token,"email":req.user.email});
				//res.cookie('token', token);
				res.redirect('http://localhost:4200/middleware');
			});

// ==============AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) ==================================================
    // facebook -------------------------------
    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
// handle the callback after facebook has authorized the user
app.get('/connect/facebook/callback',
	passport.authorize('facebook', {
		successRedirect : 'http://localhost:4200/dashboard',
		failureRedirect : 'http://localhost:4200/login'
	}));
// twitter --------------------------------
// send to twitter to do the authentication
app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
// handle the callback after twitter has authorized the user
app.get('/connect/twitter/callback',
	passport.authorize('twitter', {
		successRedirect : 'http://localhost:4200/dashboard',
		failureRedirect : 'http://localhost:4200/login'
	}));
// google ---------------------------------
// send to google to do the authentication
app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
// the callback after google has authorized the user
app.get('/connect/google/callback',
	passport.authorize('google', {
		successRedirect : 'http://localhost:4200/dashboard',
		failureRedirect : 'http://localhost:4200/login'
	}));

// ===================     UNLINK ACCOUNTS     =========================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future
// facebook -------------------------------
app.get('/unlink/facebook', function(req, res) {
	var user            = req.user;
	user.facebook.token = undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
});
// twitter --------------------------------
app.get('/unlink/twitter', function(req, res) {
	var user           = req.user;
	user.twitter.token = undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
});
// google ---------------------------------
app.get('/unlink/google', function(req, res) {
	var user          = req.user;
	user.google.token = undefined;
	user.save(function(err) {
		res.redirect('/profile');
	});
});

};
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}