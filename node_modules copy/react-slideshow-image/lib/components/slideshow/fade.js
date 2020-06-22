"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _tween = _interopRequireDefault(require("@tweenjs/tween.js"));

var _helpers = require("../../helpers.js");

require("./fade.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Fade =
/*#__PURE__*/
function (_Component) {
  _inherits(Fade, _Component);

  function Fade(props) {
    var _this;

    _classCallCheck(this, Fade);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Fade).call(this, props));
    _this.state = {
      index: props.defaultIndex && props.defaultIndex < props.children.length ? props.defaultIndex : 0
    };
    _this.width = 0;
    _this.timeout = null;
    _this.divsContainer = null;
    _this.wrapper = null;
    _this.setWidth = _this.setWidth.bind(_assertThisInitialized(_this));
    _this.resizeListener = _this.resizeListener.bind(_assertThisInitialized(_this));
    _this.navigate = _this.navigate.bind(_assertThisInitialized(_this));
    _this.preFade = _this.preFade.bind(_assertThisInitialized(_this));
    _this.tweenGroup = new _tween["default"].Group();
    return _this;
  }

  _createClass(Fade, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.resizeListener);
      this.setWidth();
      this.play();
    }
  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      var _this$props = this.props,
          autoplay = _this$props.autoplay,
          children = _this$props.children;
      var index = this.state.index;

      if (autoplay && children.length > 1) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          return _this2.fadeImages(index + 1);
        }, this.props.duration);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      if (this.props.autoplay !== props.autoplay) {
        if (this.props.autoplay) {
          this.play();
        } else {
          clearTimeout(this.timeout);
        }
      }

      if (this.props.children.length != props.children.length) {
        this.applyStyle();
        this.play();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.willUnmount = true;
      clearTimeout(this.timeout);
      window.removeEventListener('resize', this.resizeListener);
    }
  }, {
    key: "setWidth",
    value: function setWidth() {
      this.width = this.wrapper.clientWidth;
      this.applyStyle();
    }
  }, {
    key: "resizeListener",
    value: function resizeListener() {
      this.setWidth();
    }
  }, {
    key: "applyStyle",
    value: function applyStyle() {
      var fullwidth = this.width * this.props.children.length;
      this.divsContainer.style.width = "".concat(fullwidth, "px");

      for (var index = 0; index < this.divsContainer.children.length; index++) {
        var eachDiv = this.divsContainer.children[index];

        if (eachDiv) {
          eachDiv.style.width = "".concat(this.width, "px");
          eachDiv.style.left = "".concat(index * -this.width, "px");
        }
      }
    }
  }, {
    key: "goNext",
    value: function goNext() {
      var index = this.state.index;
      var _this$props2 = this.props,
          children = _this$props2.children,
          infinite = _this$props2.infinite;

      if (!infinite && index === children.length - 1) {
        return;
      }

      this.fadeImages((index + 1) % children.length);
    }
  }, {
    key: "goBack",
    value: function goBack() {
      var index = this.state.index;
      var _this$props3 = this.props,
          children = _this$props3.children,
          infinite = _this$props3.infinite;

      if (!infinite && index === 0) {
        return;
      }

      this.fadeImages(index === 0 ? children.length - 1 : index - 1);
    }
  }, {
    key: "navigate",
    value: function navigate(_ref) {
      var dataset = _ref.target.dataset;

      if (dataset.key != this.state.index) {
        this.goTo(parseInt(dataset.key));
      }
    }
  }, {
    key: "goTo",
    value: function goTo(index) {
      this.fadeImages(index);
    }
  }, {
    key: "preFade",
    value: function preFade(_ref2) {
      var currentTarget = _ref2.currentTarget;

      if (currentTarget.dataset.type === 'prev') {
        this.goBack();
      } else {
        this.goNext();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          indicators = _this$props4.indicators,
          arrows = _this$props4.arrows,
          infinite = _this$props4.infinite,
          children = _this$props4.children;
      var index = this.state.index;
      var unhandledProps = (0, _helpers.getUnhandledProps)(Fade.propTypes, this.props);
      return _react["default"].createElement("div", unhandledProps, _react["default"].createElement("div", {
        className: "react-slideshow-container"
      }, arrows && _react["default"].createElement("div", {
        className: "nav ".concat(index <= 0 && !infinite ? 'disabled' : ''),
        "data-type": "prev",
        onClick: this.preFade
      }, _react["default"].createElement("span", null)), _react["default"].createElement("div", {
        className: "react-slideshow-fade-wrapper",
        ref: function ref(_ref3) {
          return _this3.wrapper = _ref3;
        }
      }, _react["default"].createElement("div", {
        className: "react-slideshow-fade-images-wrap",
        ref: function ref(wrap) {
          return _this3.divsContainer = wrap;
        }
      }, children.map(function (each, key) {
        return _react["default"].createElement("div", {
          style: {
            opacity: key === index ? '1' : '0',
            zIndex: key === index ? '1' : '0'
          },
          "data-index": key,
          key: key
        }, each);
      }))), arrows && _react["default"].createElement("div", {
        className: "nav ".concat(index === children.length - 1 && !infinite ? 'disabled' : ''),
        "data-type": "next",
        onClick: this.preFade
      }, _react["default"].createElement("span", null))), indicators && _react["default"].createElement("div", {
        className: "indicators"
      }, children.map(function (each, key) {
        return _react["default"].createElement("div", {
          key: key,
          "data-key": key,
          className: index === key ? 'active' : '',
          onClick: _this3.navigate
        });
      })));
    }
  }, {
    key: "fadeImages",
    value: function fadeImages(newIndex) {
      var _this4 = this;

      var index = this.state.index;
      var _this$props5 = this.props,
          autoplay = _this$props5.autoplay,
          children = _this$props5.children,
          infinite = _this$props5.infinite,
          duration = _this$props5.duration,
          transitionDuration = _this$props5.transitionDuration,
          onChange = _this$props5.onChange;
      var existingTweens = this.tweenGroup.getAll();

      if (!existingTweens.length) {
        if (!this.divsContainer.children[newIndex]) {
          newIndex = 0;
        }

        clearTimeout(this.timeout);
        var value = {
          opacity: 0
        };

        var animate = function animate() {
          if (_this4.willUnmount) {
            _this4.tweenGroup.removeAll();

            return;
          }

          requestAnimationFrame(animate);

          _this4.tweenGroup.update();
        };

        animate();
        var tween = new _tween["default"].Tween(value, this.tweenGroup).to({
          opacity: 1
        }, transitionDuration).onUpdate(function (value) {
          _this4.divsContainer.children[newIndex].style.opacity = value.opacity;
          _this4.divsContainer.children[index].style.opacity = 1 - value.opacity;
        }).start();
        tween.onComplete(function () {
          if (_this4.willUnmount) {
            return;
          }

          _this4.setState({
            index: newIndex
          });

          if (typeof onChange === 'function') {
            onChange(index, newIndex);
          }

          if (autoplay && (infinite || newIndex < children.length - 1)) {
            clearTimeout(_this4.timeout);
            _this4.timeout = setTimeout(function () {
              _this4.fadeImages((newIndex + 1) % children.length);
            }, duration);
          }
        });
      }
    }
  }]);

  return Fade;
}(_react.Component);

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  defaultIndex: 0,
  indicators: false,
  arrows: true,
  autoplay: true,
  infinite: true
};
Fade.propTypes = {
  duration: _propTypes["default"].number,
  transitionDuration: _propTypes["default"].number,
  defaultIndex: _propTypes["default"].number,
  indicators: _propTypes["default"].bool,
  arrows: _propTypes["default"].bool,
  autoplay: _propTypes["default"].bool,
  infinite: _propTypes["default"].bool,
  onChange: _propTypes["default"].func
};
var _default = Fade;
exports["default"] = _default;