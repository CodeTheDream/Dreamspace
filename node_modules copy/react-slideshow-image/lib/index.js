"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Slide", {
  enumerable: true,
  get: function get() {
    return _slide["default"];
  }
});
Object.defineProperty(exports, "Fade", {
  enumerable: true,
  get: function get() {
    return _fade["default"];
  }
});
Object.defineProperty(exports, "Zoom", {
  enumerable: true,
  get: function get() {
    return _zoom["default"];
  }
});

require("./components/slideshow/general.css");

var _slide = _interopRequireDefault(require("./components/slideshow/slide"));

var _fade = _interopRequireDefault(require("./components/slideshow/fade"));

var _zoom = _interopRequireDefault(require("./components/slideshow/zoom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }