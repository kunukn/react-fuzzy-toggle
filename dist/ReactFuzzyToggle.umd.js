(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactFuzzyToggle"] = factory(require("React"));
	else
		root["ReactFuzzyToggle"] = factory(root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FuzzyToggle = __webpack_require__(2);

Object.defineProperty(exports, 'FuzzyToggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FuzzyToggle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 _state_ is internal state.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 used for minimizing unnessary re-renderings and because setState is async.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

//import PropTypes from 'prop-types';

var log = console.log.bind(console);
var warn = console.warn.bind(console);

var rAF = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (callback) {
  return window.setTimeout(callback, 16);
};
var cAF = window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : window.clearInterval.bind(window);

var TOGGLE = {
  EMPTY: 'EMPTY',
  FULL: 'FULL',
  DECREASING: 'DECREASING',
  INCREASING: 'INCREASING'
};

var FuzzyToggle = function (_React$Component) {
  _inherits(FuzzyToggle, _React$Component);

  // static propTypes = {
  //   duration: PropTypes.number,
  //   isFull: PropTypes.bool,
  //   onFull: PropTypes.func,
  //   onEmpty: PropTypes.func,
  //   onDecreasing: PropTypes.func,
  //   onDecreasing: PropTypes.func,
  // };

  function FuzzyToggle(props) {
    _classCallCheck(this, FuzzyToggle);

    var _this = _possibleConstructorReturn(this, (FuzzyToggle.__proto__ || Object.getPrototypeOf(FuzzyToggle)).call(this, props));

    _this.onFull = function () {
      _this.props.onFull && _this.props.onFull();
    };

    _this.onEmpty = function () {
      _this.props.onEmpty && _this.props.onEmpty();
    };

    _this.onIncreasing = function () {
      _this.props.onIncreasing && _this.props.onIncreasing();
    };

    _this.onDecreasing = function () {
      _this.props.onDecreasing && _this.props.onDecreasing();
    };

    _this.onToggle = function () {

      var update_State_ = function update_State_(_ref) {
        var toggleState = _ref.toggleState,
            isReverse = _ref.isReverse;

        var now = _this.now();

        _this._state_.toggleState = toggleState;

        if (isReverse) {
          var _this$_state_ = _this._state_,
              duration = _this$_state_.duration,
              startTime = _this$_state_.startTime;

          var elapsedTime = Math.min(duration, now - startTime);
          var subtract = Math.max(0, duration - elapsedTime);
          _this._state_.startTime = now - subtract;
        } else {
          _this._state_.startTime = now;
        }
      };

      var doIncrease = function doIncrease() {
        _this.setState({ toggleState: TOGGLE.INCREASING });
        _this.onIncreasing();
        _this.increaseEvent();
      };

      var doDecrease = function doDecrease() {
        _this.setState({ toggleState: TOGGLE.DECREASING });
        _this.onDecreasing();
        _this.decreaseEvent();
      };

      if (_this._state_.toggleState === TOGGLE.FULL) {
        update_State_({ toggleState: TOGGLE.DECREASING });
        doDecrease();
      } else if (_this._state_.toggleState === TOGGLE.EMPTY) {
        update_State_({ toggleState: TOGGLE.INCREASING });
        doIncrease();
      } else if (_this._state_.toggleState === TOGGLE.INCREASING) {
        update_State_({ toggleState: TOGGLE.DECREASING, isReverse: true });
        doDecrease();
      } else if (_this._state_.toggleState === TOGGLE.DECREASING) {
        update_State_({
          toggleState: TOGGLE.INCREASING,
          isReverse: true
        });
        doIncrease();
      }
    };

    _this.setDuration = function (duration) {
      _this._state_.duration = parseInt(duration, 10) || 0;
    };

    _this.setToEmptyState = function () {
      _this._state_.toggleState = TOGGLE.EMPTY;
      _this.setState({
        toggleState: TOGGLE.EMPTY,
        range: 0
      });
      _this.onEmpty();
    };

    _this.decreaseEvent = function () {
      if (_this._state_.toggleState !== TOGGLE.DECREASING) {
        return;
      }

      var _this$_state_2 = _this._state_,
          duration = _this$_state_2.duration,
          startTime = _this$_state_2.startTime;

      var elapsedTime = Math.min(duration, _this.now() - startTime);
      var range = 1 - elapsedTime / duration;

      _this.setState({ range: range });

      if (elapsedTime < duration) {
        _this._state_.timeout = _this.nextTick(_this.decreaseEvent);
      } else {
        _this.setToEmptyState();
      }
    };

    _this.setToFullState = function () {
      _this._state_.toggleState = TOGGLE.FULL;
      _this.setState({
        toggleState: TOGGLE.FULL,
        range: 1
      });
      _this.onFull();
    };

    _this.increaseEvent = function () {
      if (_this._state_.toggleState !== TOGGLE.INCREASING) {
        return;
      }

      var _this$_state_3 = _this._state_,
          duration = _this$_state_3.duration,
          startTime = _this$_state_3.startTime;

      var elapsedTime = Math.min(duration, _this.now() - startTime);
      var range = elapsedTime / duration;

      _this.setState({ range: range });

      if (elapsedTime < duration) {
        _this.nextTick(_this.increaseEvent);
      } else {
        _this.setToFullState();
      }
    };

    _this.nextTick = function (callback) {
      _this._state_.timeout = rAF(callback);
    };

    _this._state_ = {
      toggleState: _this.props.isFull ? TOGGLE.FULL : TOGGLE.EMPTY,
      range: _this.props.isFull ? 1 : 0
    };

    _this.setDuration(_this.props.duration);

    _this.state = {
      toggleState: _this._state_.toggleState,
      range: _this._state_.range
    };
    return _this;
  }

  _createClass(FuzzyToggle, [{
    key: 'now',
    value: function now() {
      return new Date().getTime();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.duration !== this.props.duration) {
        this.setDuration(nextProps.duration);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.range !== this.state.range;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.render({
        onToggle: this.onToggle,
        state: this.state
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      cAF(this._state_.timeout);
    }
  }]);

  return FuzzyToggle;
}(_react2.default.Component);

FuzzyToggle.defaultProps = _defineProperty({
  duration: 300,
  isFull: true,
  onFull: null,
  onEmpty: null,
  onDecreasing: null
}, 'onDecreasing', null);
exports.default = FuzzyToggle;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ]);
});