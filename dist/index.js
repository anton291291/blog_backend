"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _PostController = _interopRequireDefault(require("./controllers/PostController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Post = new _PostController["default"]();

_mongoose["default"].connect('mongodb://superuser:rdflhjrjgnth@localhost:27017/blog?authSource=admin', {
  useNewUrlParser: true
});

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.get("/posts", Post.index);
app.get("/posts/:id", Post.read);
app.post("/posts", Post.create);
app["delete"]("/posts/:id", Post["delete"]);
app.put("/posts/:id", Post.update);
app.listen(4000, function () {
  console.log("server started at 4000 port");
});