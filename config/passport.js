/*===================== load all the things we need ========================================*/
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;  
/*===================  load up the user model ==============================================*/
var User = require('../model/Schema');
/*=====================  load the auth variables ===========================================*/
var configAuth = require('./auth'); // use this one for testing
module.exports = function(passport) {
/*==================== used to serialize the user for the session ==========================*/
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
/*====================== used to deserialize the user ======================================*/
    passport.deserializeUser(function(id, done) {
        User.findbyId(id, function(err, user) {
            done(err, user);
        });
    });
/*===============================   FACEBOOK ================================================*/
    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : configAuth.facebookAuth.profileFields,
     },
    function(token, refreshToken, profile, done) {
    // asynchronous
        process.nextTick(function() {
            User.findOne({ 'email' : profile.emails[0].value },function(err, user) {
                    if (err)
                        return done(err,false);

                    if (user) {
                                return done(null, user);
                    } 
                    else {
                        // if there is no user, create them
                        let newUser = new User();
                        newUser.fullName  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.email = profile.emails[0].value;
                        newUser.password = "";
                        newUser.contact = 0;
                        newUser.dob = "12/12/12";
                        
                        newUser.save(function(err) {
                            if (err)
                                return done(err, false);
                                //throw err;
                            return done(null, newUser);
                        });
                    }
                });
        });
}));
/*===================================   TWITTER ============================================*/
   passport.use(new TwitterStrategy({
        consumerKey       : configAuth.twitterAuth.consumerKey,
        consumerSecret    : configAuth.twitterAuth.consumerSecret,
        callbackURL       : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (checking if a user is logged in or not)
      },
    function(req, token, tokenSecret, profile, done) {
         // asynchronous
                User.findOne({ 'email' : profile.username+"@gmail.com"}, function(err, user) {
                    if (err)
                        return done(err,false);

                    if (user) {
                        return done(null, user); // user found, return that user
                    } 
                    else {
                        // if there is no user, create them
                        let newUser = new User();
                        newUser.email = profile.username+"@gmail.com";
                        newUser.password = "";
                        newUser.contact = 0;
                        newUser.dob = "12/12/12";
                        newUser.fullName = profile.username;
                        
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
    }));
/*==============================    GOOGLE    ==============================================*/
   passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, token, refreshToken, profile, done) {
          User.findOne({ 'email' : profile.emails[0].value}, function(err, user) {
                    if (err)
                        return done(err,false);
                    if (user) {
                        return done(null, user);
                    } 
                    else {
                        var newUser = new User();
                        newUser.fullName  = profile.displayName;
                        newUser.email = profile.emails[0].value;
                        newUser.password = "";
                        newUser.contact = 0;
                        newUser.dob = "12/12/12";
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
    }));
};
