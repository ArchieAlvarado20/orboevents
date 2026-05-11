const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");
const Role = require("../models/Role");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name =
          profile.displayName || profile.name?.givenName || "No Name";

        if (!email) {
          return done(new Error("No email from Google"), null);
        }

        let user = await User.findOne({ email });

        if (!user) {
          const defaultRole = await Role.findOne({ name: "User" });

          if (!defaultRole) {
            return done(new Error("Default role not found"), null);
          }

          user = await User.create({
            name,
            email,
            password: "google-auth",
            role: defaultRole._id,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
