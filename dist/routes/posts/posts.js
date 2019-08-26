"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _PostController = _interopRequireDefault(require("../../controllers/PostController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Post = new _PostController["default"]();

var router = _express["default"].Router();

router.get("/", Post.index).post("/", Post.create);
router.get("/:id", Post.read)["delete"]("/:id", Post["delete"]).put(":id", Post.update);
var _default = router;
exports["default"] = _default;