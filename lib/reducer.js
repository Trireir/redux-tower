'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffset = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = routerReducer;

var _actions = require('./actions');

var initial = {
  element: undefined,
  path: undefined,
  params: undefined,
  query: undefined,
  splats: undefined,
  route: undefined,
  offset: undefined
};

// FIXME: Assuming fixed reducer/state name 'router'
var getOffset = exports.getOffset = function getOffset(state) {
  return state.router.offset;
};

function routerReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _actions.INIT:
      return _extends({}, state, payload);
    case _actions.CHANGE_ELEMENT:
      return _extends({}, state, { element: payload });
    case _actions.UPDATE_PATH_INFO:
      return _extends({}, state, payload);
    default:
      return state;
  }
}