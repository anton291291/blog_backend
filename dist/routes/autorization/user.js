"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _UserController = _interopRequireDefault(require("../../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = new _UserController["default"]();

var router = _express["default"].Router();

router.post('/register', User.register);
router.post('/login', User.login);
router.get('/me', _passport["default"].authenticate('jwt', {
  session: false
}), User.auth);
var _default = router;
exports["default"] = _default;