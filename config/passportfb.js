const FacebookStrategy = require("passport-facebook").Strategy;

const mongoose = require("mongoose");
const passport = require("passport");

const Fb_user = require("../models/Fb_user");

module.exports = function (passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
      },
      async function (token, refreshToken, profile, done) {
        const newFbUser = {
          uid: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          middleName: profile.name.middleName,
          lastName: profile.name.familyName,
          gender: profile.gender,
          profileUrl: profile.profileUrl,
          // profilePic: profile.photos[0].value,
        };
        try {
          let user = await Fb_user.findOne({ uid: profile.id });
          if (user) {
            console.log(user);
            done(null, user);
          } else {
            user = await Fb_user.create(newFbUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Fb_user.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
