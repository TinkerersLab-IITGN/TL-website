const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "229423012134-u4dv6s53mpllopu3ig79o4njqr4cr2nl.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "8yISt8ybrWPB7ouvCnJFxMsT",
    callbackURL: process.env.CALLBACK_URL || "https://young-oasis-59360.herokuapp.com/google/callback",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // console.log(profile)
    return done(null, profile);
  }
));
