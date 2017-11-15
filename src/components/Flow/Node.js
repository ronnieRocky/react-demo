'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = function (_React$Component) {
  _inherits(Node, _React$Component);

  function Node(props) {
    _classCallCheck(this, Node);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      defaultlen: 50,
      r: 10
    };
    return _this;
  }

  Node.prototype.render = function render() {
    var r = this.state.r;
    var defaultlen = this.state.defaultlen;
    var Shape = this.props.shape;
    var _props = this.props;
    var location = _props.location;

    var others = _objectWithoutProperties(_props, ['location']);

    var _others = _extends({}, others);

    var x = _others.x;
    var y = _others.y;
    var width = _others.width;
    var height = _others.height;
    var fill = _others.fill;
    var offset = _others.offset;

    var temoffset = (0, _Func.isUndefined)(offset, 0);
    var position = (0, _Math.onPosition)(x, y, r, defaultlen, width, height, temoffset);
    var sp = position.sp;
    var vlp = position.vlp;
    var plus = position.plusp;
    var lp = position.lp;
    return _react2.default.createElement(
      'g',
      { onClick: this.handleClick },
      _react2.default.createElement(Shape, others),
      location === 'last' ? _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement(_Line2.default, { x1: vlp.x1, y1: vlp.y1, x2: vlp.x2, y2: vlp.y2, fill: "white", stroke: "black" }),
        _react2.default.createElement(_Circle2.default, { cx: plus.cx, cy: plus.cy, r: r, fill: "white", stroke: "black" })
      ) : _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement(_Line2.default, { x1: vlp.x1, y1: vlp.y1, x2: vlp.x2, y2: vlp.y2, fill: "white", stroke: "green" }),
        _react2.default.createElement(_Circle2.default, { cx: plus.cx, cy: plus.cy, r: r, fill: "white", stroke: "pink" }),
        _react2.default.createElement(_Line2.default, { x1: lp.x1, y1: lp.y1, x2: lp.x2, y2: lp.y2, fill: "white", stroke: "red" })
      )
    );
  };

  return Node;
}(_react2.default.Component);

exports.default = Node;