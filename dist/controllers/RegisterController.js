"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _login = _interopRequireDefault(require("../validation/login"));

var _register = _interopRequireDefault(require("../validation/register"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RegisterController =
/*#__PURE__*/
function () {
  function RegisterController() {
    _classCallCheck(this, RegisterController);
  }

  _createClass(RegisterController, [{
    key: "register",
    value: function register(req, res) {
      var _validateRegisterInpu = (0, _register["default"])(req.body),
          errors = _validateRegisterInpu.errors,
          isValid = _validateRegisterInpu.isValid;

      if (!isValid) {
        return res.status(400).json(errors);
      }

      _User["default"].findOne({
        email: req.body.email
      }).then(function (user) {
        if (user) {
          return res.status(400).json({
            email: 'Email already exists'
          });
        } else {
          var avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          });
          var newUser = new _User["default"]({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar: avatar
          });

          _bcrypt["default"].genSalt(10, function (err, salt) {
            if (err) console.error('There was an error', err);else {
              _bcrypt["default"].hash(newUser.password, salt, function (err, hash) {
                if (err) console.error('There was an error', err);else {
                  newUser.password = hash;
                  newUser.save().then(function (user) {
                    res.json(user);
                  });
                }
              });
            }
          });
        }
      });
    }
  }]);

  return RegisterController;
}();

;
var _default = RegisterController;
exports["default"] = _default;