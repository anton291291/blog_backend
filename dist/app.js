"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _user = _interopRequireDefault(require("./routes/autorization/user"));

var _passport2 = _interopRequireDefault(require("./passport"));

var _posts = _interopRequireDefault(require("./routes/posts/posts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect('mongodb://superuser:rdflhjrjgnth@localhost:27017/blog?authSource=admin', {
  useNewUrlParser: true
}).then(function () {
  console.log('Database is connected');
}, function (err) {
  console.log('Can not connect to the database' + err);
});

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use(_passport["default"].initialize());
(0, _passport2["default"])(_passport["default"]);
app.use('/api/users', _user["default"]);
app.use("/posts", _posts["default"]);
app.listen(4000, function () {
  console.log("server started at 4000 port");
});