const passport = require('passport')
const User = require("../model/User")
const config = require("../config")

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.jwt_secret;


let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, done) {
try {
    let user = await User.findById(jwt_payload.user._id)
  if (user) {
    return done(null, user);
  } else {
      console.log("Not user")
    return done(null, false);
  }
} catch (error) {
  console.log(error)
    return(error)
}});

module.exports = passport.use(strategy)