'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getHref(props) {
  var withOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var to = props.to,
      offset = props.offset,
      external = props.external;
  var href = props.href;


  if (!to && !href) {
    throw new Error('<Link> component requires either "to" or "href" props.');
  }

  if (to && !href) {
    href = to;
  }

  if (withOffset && offset && !external) {
    href = offset + href;
  }

  return href;
}

var Link = exports.Link = function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, [{
    key: 'handleClick',
    value: function handleClick(e) {
      e.preventDefault();

      var onClick = this.props.onClick;

      if (typeof onClick === 'function') {
        onClick(e);
      }

      var href = getHref(this.props);
      this.props.dispatch((0, _actions.push)(href));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          external = _props.external,
          target = _props.target,
          className = _props.className,
          children = _props.children;

      var href = getHref(this.props, true);

      var props = { href: href, target: target, className: className };
      if (external) {
        props.target = '_blank';
      } else {
        props.onClick = this.handleClick.bind(this);
      }

      return _react2.default.createElement(
        'a',
        props,
        children
      );
    }
  }]);

  return Link;
}(_react.Component);

Link.defaultProps = {
  external: false,
  target: '_self'
};


function select(_ref) {
  var offset = _ref.router.offset;

  return { offset: offset };
}

exports.default = (0, _reactRedux.connect)(select)(Link);