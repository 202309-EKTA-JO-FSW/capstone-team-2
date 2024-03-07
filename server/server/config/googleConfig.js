const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const UserModel = require("../models/user");

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },

  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      profilePicture: profile.photos[0].value
    };
     
    try {
      let user = await UserModel.findOne({ email: profile.emails[0].value});

      if(user) {
        done(null, user);

      } else {
        user = await UserModel.create(newUser);
        done(null, user);
      };

    } catch(err) {
      console.error(err);
    };

  }));

  passport.serializeUser((user, done) => {
    done(null, user.id); 
    });
    
    passport.deserializeUser(function(id, done) {
    UserModel.findById(id ,(err, user) => done(err, user));
  });
};


