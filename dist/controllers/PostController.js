"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Post = _interopRequireDefault(require("../models/Post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PostController =
/*#__PURE__*/
function () {
  function PostController() {
    _classCallCheck(this, PostController);
  }

  _createClass(PostController, [{
    key: "index",
    value: function index(req, res) {
      _Post["default"].find().then(function (posts) {
        if (!posts) {
          return res.send(err);
        }

        res.json(posts);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var data = req.body;
      var post = new _Post["default"]({
        title: data.title,
        text: data.text,
        imageUrl: data.imageUrl
      });
      post.save().then(function () {
        res.json({
          status: "ok"
        });
      });
    }
  }, {
    key: "find",
    value: function find(req, res) {
      var query = req.params.query;

      _Post["default"].find({
        $text: {
          $search: query,
          $language: 'russian'
        }
      }).then(function (post) {
        if (!post) {
          res.json({
            error: "not found"
          });
        }

        res.json(post);
      });
    }
  }, {
    key: "update",
    value: function update(req, res) {
      _Post["default"].findByIdAndUpdate({
        _id: req.params.id
      }, {
        $set: req.body
      }).then(function () {
        res.json({
          status: "updated"
        });
      })["catch"](function (err) {
        res.send(err);
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      _Post["default"].deleteOne({
        _id: req.params.id
      }).then(function (post) {
        if (post) {
          res.json({
            status: "deleted"
          });
        } else {
          res.json({
            status: "error"
          });
        }

        ;
      });
    }
  }]);

  return PostController;
}();

;
var _default = PostController;
exports["default"] = _default;