// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
//
// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
//
// passport.deserializeUser(function(user, done) {
//     done(null, user);
// });
//
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID || {clientID},
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET || {clientSecret},
//     callbackURL: process.env.CALLBACK_URL || {callbackURL},
//     passReqToCallback:true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     // console.log(profile)
//     return done(null, profile);
//   }
// ));
