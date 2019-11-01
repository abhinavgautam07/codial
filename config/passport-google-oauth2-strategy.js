const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users_schema');
//tell passport to use new strategy for google auth
passport.use(new googleStrategy({
  clientID: "786190956504-64ov7laa6n0j57errp8ptlskufqq268h.apps.googleusercontent.com",
  clientSecret: "1NfDBMM7sShGUjg7xPmHzwhv",
  callbackURL: "http://localhost:8000/users/auth/google/callback"
},
  function(accessToken,refreshToken,profile,done){
    
    //profile contains user information
    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
      if(err){
        console.log(err,"error in gooogle");
        return;
      }
      console.log(profile);
      if(user){
        //if found ,set it as req.user
        return done(null,user);
      }else{
        // else create the user and set req.user
        User.create({
          name:profile.displayName,
          email:profile.emails[0].value,
          password:crypto.randomBytes(20).toString('hex')
        },function(err,newUser){
          if(err){
            console.log(err,"error in creating the user");
            return;
          }
          return done(null,newUser);

        });
      }
    });
  }
));
module.exports=passport;