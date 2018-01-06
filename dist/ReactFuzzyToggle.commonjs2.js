module.exports =
/******/ (function(modules) { // webpackBootstrap
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


var FuzzyToggle = __webpack_require__(2).default;

module.exports = {
  FuzzyToggle: FuzzyToggle
};

// export { default as FuzzyToggle } from './FuzzyToggle';

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 _state_ is internal state for sync and rendering control.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 setState is async and I need sync control because timing is important 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 and because I need to control what is to be re-rendered.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// eslint-disable-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

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

var util = {
  isFuzzy: function isFuzzy(toggleState) {
    return toggleState === TOGGLE.INCREASING || toggleState === TOGGLE.DECREASING;
  },
  clamp: function clamp(_ref) {
    var value = _ref.value,
        _ref$max = _ref.max,
        max = _ref$max === undefined ? 1 : _ref$max,
        _ref$min = _ref.min,
        min = _ref$min === undefined ? 0 : _ref$min;

    if (value > max) return max;
    if (value < min) return min;
    return value;
  },
  now: function now() {
    return new Date().getTime();
  },
  sanitizeDuration: function sanitizeDuration(duration) {
    return Math.max(0, parseInt(+duration, 10) || 0);
  }
};

var FuzzyToggle = function (_React$Component) {
  _inherits(FuzzyToggle, _React$Component);

  // static propTypes = {
  //   render: PropTypes.func.isRequired,
  //   duration: PropTypes.number,
  //   isEmpty: PropTypes.bool,
  //   onFull: PropTypes.func,
  //   onEmpty: PropTypes.func,
  //   onDecreasing: PropTypes.func,
  //   onDecreasing: PropTypes.func,
  // };

  function FuzzyToggle(props) {
    _classCallCheck(this, FuzzyToggle);

    var _this = _possibleConstructorReturn(this, (FuzzyToggle.__proto__ || Object.getPrototypeOf(FuzzyToggle)).call(this, props));

    _this.onFull = function () {
      if (_this.props.onFull) _this.props.onFull();
    };

    _this.onEmpty = function () {
      if (_this.props.onEmpty) _this.props.onEmpty();
    };

    _this.onIncreasing = function () {
      if (_this.props.onIncreasing) _this.props.onIncreasing();
    };

    _this.onDecreasing = function () {
      if (_this.props.onDecreasing) _this.props.onDecreasing();
    };

    _this.onToggle = function () {
      var updateInternalState = function updateInternalState(_ref2) {
        var toggleState = _ref2.toggleState,
            _ref2$hasReversed = _ref2.hasReversed,
            hasReversed = _ref2$hasReversed === undefined ? false : _ref2$hasReversed;

        var now = util.now();

        _this._state_.toggleState = toggleState;
        _this._state_.hasReversed = hasReversed;

        if (hasReversed) {
          var startTime = _this._state_.startTime;

          var duration = util.sanitizeDuration(_this.props.duration);
          var elapsedTime = Math.min(duration, now - startTime);
          var subtract = Math.max(0, duration - elapsedTime);
          _this._state_.startTime = now - subtract;
        } else {
          _this._state_.startTime = now;
        }

        _this.setState({
          toggleState: _this._state_.toggleState,
          hasReversed: _this._state_.hasReversed,
          isFuzzy: util.isFuzzy(_this._state_.toggleState)
        });
      };

      var doIncrease = function doIncrease() {
        _this.onIncreasing();
        _this.increaseEvent();
      };

      var doDecrease = function doDecrease() {
        _this.onDecreasing();
        _this.decreaseEvent();
      };

      if (_this._state_.toggleState === TOGGLE.FULL) {
        updateInternalState({ toggleState: TOGGLE.DECREASING });
        doDecrease();
      } else if (_this._state_.toggleState === TOGGLE.EMPTY) {
        updateInternalState({ toggleState: TOGGLE.INCREASING });
        doIncrease();
      } else if (_this._state_.toggleState === TOGGLE.INCREASING) {
        updateInternalState({
          toggleState: TOGGLE.DECREASING,
          hasReversed: true
        });
        doDecrease();
      } else if (_this._state_.toggleState === TOGGLE.DECREASING) {
        updateInternalState({
          toggleState: TOGGLE.INCREASING,
          hasReversed: true
        });
        doIncrease();
      }
    };

    _this.setToEmptyState = function () {
      _this.setState({
        range: 0,
        toggleState: TOGGLE.EMPTY,
        isFuzzy: false
      });
      _this._state_.toggleState = TOGGLE.EMPTY;
      _this.onEmpty();
    };

    _this.decreaseEvent = function () {
      if (_this._state_.toggleState !== TOGGLE.DECREASING) {
        return;
      }

      var duration = util.sanitizeDuration(_this.props.duration);
      if (duration <= 0) {
        _this.setToEmptyState();
        return;
      }

      var startTime = _this._state_.startTime;


      var elapsedTime = Math.min(duration, util.now() - startTime);
      var range = util.clamp({ value: 1 - elapsedTime / duration });

      _this.setState({ range: range });

      if (elapsedTime < duration) {
        _this._state_.timeout = _this.nextTick(_this.decreaseEvent);
      } else {
        _this.setToEmptyState();
      }
    };

    _this.setToFullState = function () {
      _this.setState({
        range: 1,
        toggleState: TOGGLE.FULL,
        isFuzzy: false
      });
      _this._state_.toggleState = TOGGLE.FULL;
      _this.onFull();
    };

    _this.increaseEvent = function () {
      if (_this._state_.toggleState !== TOGGLE.INCREASING) {
        return;
      }

      var duration = util.sanitizeDuration(_this.props.duration);
      if (duration <= 0) {
        _this.setToFullState();
        return;
      }

      var startTime = _this._state_.startTime;

      var elapsedTime = Math.min(duration, util.now() - startTime);
      var range = util.clamp({ value: elapsedTime / duration });

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
      toggleState: _this.props.isEmpty ? TOGGLE.EMPTY : TOGGLE.FULL,
      hasReversed: false
    };

    _this.state = {
      toggleState: _this._state_.toggleState,
      hasReversed: _this._state_.hasReversed,
      range: _this.props.isEmpty ? 0 : 1,
      isFuzzy: false
    };
    return _this;
  }

  _createClass(FuzzyToggle, [{
    key: 'render',
    value: function render() {
      return this.props.render({
        onToggle: this.onToggle,
        toggleState: this.state.toggleState,
        isFuzzy: util.isFuzzy(this.state.toggleState),
        range: this.state.range,
        hasReversed: this.state.hasReversed
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

FuzzyToggle.defaultProps = {
  duration: 300,
  isEmpty: false,
  onFull: null,
  onEmpty: null,
  onDecreasing: null
};
exports.default = FuzzyToggle;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);