const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "322350239972-0sg843353ct016aammau5ogi32fgrlth.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3001/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
