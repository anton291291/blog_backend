"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _User = _interopRequireDefault(require("./models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JWTStrategy = require('passport-jwt').Strategy;

var ExtractJWT = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

var _default = function _default(passport) {
  passport.use(new JWTStrategy(opts, function (jwt_payload, done) {
    _User["default"].findById(jwt_payload.id).then(function (user) {
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })["catch"](function (err) {
      return console.error(err);
    });
  }));
};

exports["default"] = _default;