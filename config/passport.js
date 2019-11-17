const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
// const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.isAdmin === "false") {
        User.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }

            console.log(jwt_payload);

            return done(null, false);
          })
          .catch(err => console.log(err));
      } else {
        Admin.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }

            console.log(jwt_payload);

            return done(null, false);
          })
          .catch(err => console.log(err));
      }
    })
  );
};
