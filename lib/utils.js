'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normOffset = normOffset;
exports.removeOffset = removeOffset;
exports.parseQueryString = parseQueryString;
exports.upperFirst = upperFirst;
exports.toCamelCase = toCamelCase;
exports.isReactComponent = isReactComponent;
exports.isBlock = isBlock;
exports.isPut = isPut;
exports.isPrevent = isPrevent;

var _react = require('react');

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function normOffset(offset) {
  if (typeof offset === 'undefined') return;
  if (offset.indexOf('/') !== 0) {
    offset = '/' + offset;
  }
  if (offset.lastIndexOf('/') === offset.length - 1) {
    offset = offset.slice(0, offset.length - 1);
  }
  return offset;
}

// offset: normalized offset
function removeOffset(pathname, offset) {
  if (pathname.indexOf(offset + '/') === 0) {
    pathname = pathname.replace(offset, '');
  } else if (pathname === offset) {
    pathname = '/';
  }
  return pathname;
}

function parseQueryString(search) {
  if (search.indexOf('?') === 0) {
    search = search.slice(1);
  }
  return _querystring2.default.parse(search);
}

function upperFirst(word) {
  if (typeof word !== 'string' || word.length === 0) return word;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function toCamelCase(SNAKE_CASE) {
  var words = SNAKE_CASE.split('_');
  return [words[0].toLowerCase()].concat(_toConsumableArray(words.slice(1).map(upperFirst))).join('');
}

function isReactComponent(func) {
  return func.prototype instanceof _react.Component;
}

// https://redux-saga.github.io/redux-saga/docs/api/index.html#blocking--nonblocking
var EFFECT_TYPES = ['TAKE', 'CALL', 'APPLY', 'CPS', 'JOIN', 'CANCEL', 'FLUSH', 'CANCELLED', 'RACE'];
function isBlock(effect) {
  return EFFECT_TYPES.map(function (type) {
    return !!effect[type];
  }).reduce(function (p, c) {
    return p || c;
  }, false);
}

function isPut(effect, type) {
  return !!(effect.PUT && effect.PUT.action && effect.PUT.action.type === type);
}

function isPrevent(e) {
  return isPut(e, _actions.CHANGE_ELEMENT) || isPut(e, _actions.PUSH) || isPut(e, _actions.REPLACE);
}