let JwtStrategy = require('passport-jwt').Strategy;  
let ExtractJwt = require('passport-jwt').ExtractJwt;  
let User = require('../model/Schema');  

/*=============  Setup work and export for the JWT passport strategy ========================*/
module.exports = function(passport) {  
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = "hithisissecret";
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
