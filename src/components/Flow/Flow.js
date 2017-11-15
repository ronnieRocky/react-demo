'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Rect = require('./Shape/Rect');

var _Rect2 = _interopRequireDefault(_Rect);

var _Circle = require('./Shape/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _Line = require('./Shape/Line');

var _Line2 = _interopRequireDefault(_Line);

var _Math = require('./utils/Math');

var _Func = require('./utils/Func');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flow = function (_React$Component) {
  _inherits(Flow, _React$Component);

  function Flow(props) {
    _classCallCheck(this, Flow);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      defaultlen: 50,
      r: 10,
      height: 80,
      width: 80,
      fill: 'white',
      stroke: 'blue'
    };
    return _this;
  }

  Flow.prototype.init = function init(x, y) {
    var r = this.state.r;
    var defaultlen = this.state.defaultlen;
    var tx = x;
    var ty = y;
    var con = [];
    var lastOffset = void 0;
    var lastWidth = void 0;
    var lastHeight = void 0;
    var defFill = void 0;
    var defStroke = void 0;
    var finCon = [];
    if (_typeof(this.props.children) === 'object' && Array.isArray(this.props.children)) {
      var arr = this.props.children;
      for (var i = 0; i < arr.length; i++) {
        if (i === 0) {
          lastOffset = (0, _Func.isUndefined)(arr[i].props.offset, 0);
          lastWidth = (0, _Func.isUndefined)(arr[i].props.width, this.state.width);
          lastHeight = (0, _Func.isUndefined)(arr[i].props.height, this.state.height);
          defFill = (0, _Func.isUndefined)(arr[i].props.fill, this.state.fill);
          defStroke = (0, _Func.isUndefined)(arr[i].props.stroke, this.state.stroke);

          var firChild = _react2.default.cloneElement(arr[i], { x: tx, y: ty, key: i, location: i,
            width: lastWidth, height: lastHeight,
            fill: defFill, stroke: defStroke });
          con.push(firChild);
        }
        if (i > 0) {
          var _arr$i$props = arr[i].props;
          var width = _arr$i$props.width;
          var height = _arr$i$props.height;

          var position = (0, _Math.onPosition)(tx, ty, r, defaultlen, lastWidth, lastHeight, lastOffset);
          var tempwidth = (0, _Func.isUndefined)(width, this.state.width);
          var bp = (0, _Math.onRectMathDirect)(position.lp.x2, position.lp.y2, tempwidth);
          tx = bp.x;
          ty = bp.y;
          lastOffset = (0, _Func.isUndefined)(arr[i].props.offset, 0);
          lastWidth = (0, _Func.isUndefined)(arr[i].props.width, this.state.width);
          lastHeight = (0, _Func.isUndefined)(arr[i].props.height, this.state.height);
          defFill = (0, _Func.isUndefined)(arr[i].props.fill, this.state.fill);
          defStroke = (0, _Func.isUndefined)(arr[i].props.stroke, this.state.stroke);
          var othChild = _react2.default.cloneElement(arr[i], { x: tx, y: ty, key: i, location: i,
            width: lastWidth, height: lastHeight,
            fill: defFill, stroke: defStroke });
          con.push(othChild);
        }
      }
      var lastChild = con.slice(-1);
      var newLastChild = _react2.default.cloneElement(lastChild[0], { location: 'last' });
      finCon = con.slice(0, con.length - 1);
      finCon.push(newLastChild);
    } else {
      var child = this.props.children;
      lastWidth = (0, _Func.isUndefined)(child.width, this.state.width);
      lastHeight = (0, _Func.isUndefined)(child.height, this.state.height);
      defFill = (0, _Func.isUndefined)(child.fill, this.state.fill);
      defStroke = (0, _Func.isUndefined)(child.stroke, this.state.stroke);
      var singleChild = _react2.default.cloneElement(child, { x: tx, y: ty, key: 1, location: 'last',
        width: lastWidth, height: lastHeight,
        fill: defFill, stroke: defStroke });
      finCon.push(singleChild);
    }
    return finCon;
  };

  Flow.prototype.render = function render() {
    var _props = this.props;
    var x = _props.x;
    var y = _props.y;
    var width = _props.width;
    var height = _props.height;

    var children = this.init(x, y);
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'svg',
        { width: width, height: height },
        children
      )
    );
  };

  return Flow;
}(_react2.default.Component);

exports.default = Flow;