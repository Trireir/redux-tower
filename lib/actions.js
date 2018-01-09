'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.unprefix = unprefix;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PREFIX = exports.PREFIX = '@@redux-tower/';

var INTERCEPTED = exports.INTERCEPTED = PREFIX + 'INTERCEPTED';
var intercepted = exports.intercepted = function intercepted(action) {
  return _extends({}, action, _defineProperty({}, INTERCEPTED, true));
};
function unprefix(type) {
  if (typeof type !== 'string') {
    throw new Error('Only accept string, but passed \'' + (typeof type === 'undefined' ? 'undefined' : _typeof(type)) + '\'');
  }
  return type.replace(PREFIX, '');
}
var isPrefixed = exports.isPrefixed = function isPrefixed(name) {
  return name.indexOf(PREFIX) === 0;
};
var isTowerAction = exports.isTowerAction = function isTowerAction(action) {
  return !!(action && action.type && isPrefixed(action.type));
};
var isHistoryAction = exports.isHistoryAction = function isHistoryAction(action) {
  return !!(action && action.type && HISTORY_ACTIONS.indexOf(action.type) !== -1);
};
var isIntercepted = exports.isIntercepted = function isIntercepted(action) {
  return !!(action && action[INTERCEPTED]);
};

var createActionCreator = exports.createActionCreator = function createActionCreator(type) {
  return function (payload) {
    return { type: type, payload: payload };
  };
};

var INIT = exports.INIT = PREFIX + 'INIT';
var CHANGE_ELEMENT = exports.CHANGE_ELEMENT = PREFIX + 'CHANGE_ELEMENT';
var init = exports.init = createActionCreator(INIT);
var changeElement = exports.changeElement = createActionCreator(CHANGE_ELEMENT);

var UPDATE_PATH_INFO = exports.UPDATE_PATH_INFO = PREFIX + 'UPDATE_PATH_INFO';
var updatePathInfo = exports.updatePathInfo = createActionCreator(UPDATE_PATH_INFO);

var createActionCreatorArgs = exports.createActionCreatorArgs = function createActionCreatorArgs(type) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return { type: type, payload: args };
  };
};

var PUSH = exports.PUSH = PREFIX + 'PUSH';
var REPLACE = exports.REPLACE = PREFIX + 'REPLACE';
var GO = exports.GO = PREFIX + 'GO';
var GO_BACK = exports.GO_BACK = PREFIX + 'GO_BACK';
var GO_FORWARD = exports.GO_FORWARD = PREFIX + 'GO_FORWARD';
var push = exports.push = createActionCreatorArgs(PUSH);
var replace = exports.replace = createActionCreatorArgs(REPLACE);
var go = exports.go = createActionCreatorArgs(GO);
var goBack = exports.goBack = createActionCreatorArgs(GO_BACK);
var goForward = exports.goForward = createActionCreatorArgs(GO_FORWARD);

var HISTORY_ACTIONS = exports.HISTORY_ACTIONS = [PUSH, REPLACE, GO, GO_BACK, GO_FORWARD];