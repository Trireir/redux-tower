'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rules = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createMatcher = createMatcher;
exports.castRace = castRace;
exports.castRaceEffect = castRaceEffect;
exports.castBlockReturn = castBlockReturn;
exports.runRouteAction = runRouteAction;
exports.castLocation = castLocation;
exports.castRouterArray = castRouterArray;
exports.theControlTower = theControlTower;
exports.default = routerSaga;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _domainSpecificSaga = require('domain-specific-saga');

var _domainSpecificSaga2 = _interopRequireDefault(_domainSpecificSaga);

var _ruta = require('ruta3');

var _ruta2 = _interopRequireDefault(_ruta);

var _actions2 = require('./actions');

var _utils = require('./utils');

var _preprocess = require('./preprocess');

var _preprocess2 = _interopRequireDefault(_preprocess);

var _reducer = require('./reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(runRouteAction),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(theControlTower),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(handleLocationChange),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(handleHistoryAction),
    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(routerSaga);

function createMatcher(routes) {
  routes = (0, _preprocess2.default)(routes);
  var matcher = (0, _ruta2.default)();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(routes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var path = _step.value;

      var _action = routes[path];
      matcher.addRoute(path, _action);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  matcher[_preprocess.ROUTES] = routes;
  return matcher;
}

function createLocationChannel(history) {
  return (0, _reduxSaga.eventChannel)(function (emit) {
    // TODO: 'action' is not used but...
    var unlisten = history.listen(function (location, action) {
      emit(location);
    });
    return unlisten;
  }, _reduxSaga.buffers.expanding());
}

// Setup Domain Specific Saga
var rules = exports.rules = [function (value) {
  return typeof value === 'string' ? (0, _effects.put)((0, _actions2.replace)(value)) : value;
}, function (value) {
  if ((0, _utils.isReactComponent)(value)) {
    throw new Error('Use React Element instead of React Component');
  }
  return _react2.default.isValidElement(value) ? (0, _effects.put)((0, _actions2.changeElement)(value)) : value;
}];

function castRace(arg) {
  return arg;
}

function castRaceEffect(arg) {
  return arg;
}

function castBlockReturn(arg) {
  return arg;
}

// hooks: Stored current leaving hooks
// candidate: Candidate of leaving hooks in current route
function runRouteAction(preIterator, hooks, candidate, cancel, channel, asHook) {
  var iterator, ret, _iterator$next, effect, _done, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, hook, _ret, castedRace, raceEffect, _castBlockReturn, _main, _loc;

  return regeneratorRuntime.wrap(function runRouteAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          iterator = (0, _domainSpecificSaga2.default)(preIterator, rules);
          ret = void 0;

        case 2:
          if (!true) {
            _context.next = 69;
            break;
          }

          _iterator$next = iterator.next(ret), effect = _iterator$next.value, _done = _iterator$next.done;

          if (!_done) {
            _context.next = 6;
            break;
          }

          return _context.abrupt('break', 69);

        case 6:
          if (!(effect === false)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt('return', {
            prevented: true, // Prevented in entering/leaving hooks
            hooks: hooks, // Keep current leaving hooks
            location: undefined // No location change
          });

        case 8:
          if (!(typeof effect === 'boolean')) {
            _context.next = 10;
            break;
          }

          return _context.abrupt('continue', 2);

        case 10:
          if (!(0, _utils.isPut)(effect, _actions2.CHANGE_ELEMENT)) {
            _context.next = 41;
            break;
          }

          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 14;
          _iterator2 = hooks[Symbol.iterator]();

        case 16:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 26;
            break;
          }

          hook = _step2.value;
          _context.next = 20;
          return (0, _effects.call)(runRouteAction, hook(), [], [], undefined, channel, true);

        case 20:
          _ret = _context.sent;

          if (!(_ret.prevented === true)) {
            _context.next = 23;
            break;
          }

          return _context.abrupt('return', {
            prevented: true, // Prevented in leaving hooks
            hooks: hooks, // Keep current leaving hooks
            location: undefined // No location change
          });

        case 23:
          _iteratorNormalCompletion2 = true;
          _context.next = 16;
          break;

        case 26:
          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context['catch'](14);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t0;

        case 32:
          _context.prev = 32;
          _context.prev = 33;

          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }

        case 35:
          _context.prev = 35;

          if (!_didIteratorError2) {
            _context.next = 38;
            break;
          }

          throw _iteratorError2;

        case 38:
          return _context.finish(35);

        case 39:
          return _context.finish(32);

        case 40:

          // Set new leaving hooks
          hooks = candidate;

        case 41:
          if (!((0, _utils.isBlock)(effect) === true)) {
            _context.next = 62;
            break;
          }

          // TODO redux-saga flow-typed race is need to be improved.
          castedRace = castRace(_effects.race);
          _context.t1 = castRaceEffect;
          _context.next = 46;
          return castedRace({
            main: effect,
            loc: (0, _effects.take)(channel)
          });

        case 46:
          _context.t2 = _context.sent;
          raceEffect = (0, _context.t1)(_context.t2);
          _castBlockReturn = castBlockReturn(raceEffect), _main = _castBlockReturn.main, _loc = _castBlockReturn.loc;

          if (!_main) {
            _context.next = 53;
            break;
          }

          ret = _main;
          _context.next = 60;
          break;

        case 53:
          if (!_loc) {
            _context.next = 60;
            break;
          }

          if (!(typeof cancel === 'function')) {
            _context.next = 57;
            break;
          }

          _context.next = 57;
          return (0, _effects.call)(runRouteAction, cancel(), [], [], undefined, channel, true);

        case 57:
          return _context.abrupt('return', {
            prevented: true, // Prevented
            hooks: [], // Clear leaving hooks
            location: _loc // New location
          });

        case 60:
          _context.next = 65;
          break;

        case 62:
          _context.next = 64;
          return effect;

        case 64:
          ret = _context.sent;

        case 65:
          if (!(asHook && (0, _utils.isPrevent)(effect))) {
            _context.next = 67;
            break;
          }

          return _context.abrupt('return', {
            prevented: true, // Prevented in entering hooks
            hooks: hooks, // Keep current leaving hooks
            location: undefined // No location change
          });

        case 67:
          _context.next = 2;
          break;

        case 69:
          return _context.abrupt('return', {
            prevented: false, // Not prevented
            hooks: hooks, // Keep or New
            location: undefined // No location change
          });

        case 70:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[14, 28, 32, 40], [33,, 35, 39]]);
}

function castLocation(arg) {
  return arg;
}

function castRouterArray(arg) {
  return arg;
}

function theControlTower(_ref) {
  var history = _ref.history,
      matcher = _ref.matcher,
      offset = _ref.offset;

  var _getConfigurationActi, cancel, error, initial, channel, nextPath, hooks, nextLocation, entering, _action2, leaving, args, _location, _pathname, matched, actions, params, route, splats, _actions, _arr, _i, fn, _ref2, _ref3, iterator, asHook, _ret2;

  return regeneratorRuntime.wrap(function theControlTower$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _getConfigurationActi = (0, _preprocess.getConfigurationActions)(matcher), cancel = _getConfigurationActi.cancel, error = _getConfigurationActi.error, initial = _getConfigurationActi.initial;
          channel = createLocationChannel(history);

          // Run initial action

          if (!initial) {
            _context2.next = 5;
            break;
          }

          _context2.next = 5;
          return (0, _effects.call)(runRouteAction, initial(), [], [], undefined, channel, false);

        case 5:

          // Initial location
          nextPath = '' + history.location.pathname + history.location.search;
          _context2.next = 8;
          return (0, _effects.put)((0, _actions2.push)((0, _utils.removeOffset)(nextPath, offset)));

        case 8:
          hooks = [], nextLocation = void 0;

        case 9:
          if (!true) {
            _context2.next = 62;
            break;
          }

          entering = void 0, _action2 = void 0, leaving = void 0, args = void 0;

          if (!nextLocation) {
            _context2.next = 15;
            break;
          }

          _context2.t0 = nextLocation;
          _context2.next = 20;
          break;

        case 15:
          _context2.t1 = castLocation;
          _context2.next = 18;
          return (0, _effects.take)(channel, '');

        case 18:
          _context2.t2 = _context2.sent;
          _context2.t0 = (0, _context2.t1)(_context2.t2);

        case 20:
          _location = _context2.t0;

          nextLocation = undefined;

          _pathname = (0, _utils.removeOffset)(_location.pathname, offset);
          matched = matcher.match(_pathname);

          if (!matched) {
            _context2.next = 35;
            break;
          }

          actions = matched.action, params = matched.params, route = matched.route, splats = matched.splats;

          args = {
            path: _pathname,
            params: params,
            query: (0, _utils.parseQueryString)(_location.search),
            splats: splats,
            route: route
          };

          _context2.next = 29;
          return (0, _effects.put)((0, _actions2.updatePathInfo)(args));

        case 29:
          _actions = _slicedToArray(actions, 3);
          entering = _actions[0];
          _action2 = _actions[1];
          leaving = _actions[2];
          _context2.next = 41;
          break;

        case 35:
          if (error) {
            _context2.next = 37;
            break;
          }

          return _context2.abrupt('continue', 9);

        case 37:

          // Fallback to error page
          args = {};
          entering = [];
          _action2 = error;
          leaving = [];

        case 41:
          if (!(0, _utils.isReactComponent)(_action2)) {
            _context2.next = 43;
            break;
          }

          throw new Error('Use React Element instead of React Component');

        case 43:
          _arr = [].concat(_toConsumableArray(entering), [_action2]);
          _i = 0;

        case 45:
          if (!(_i < _arr.length)) {
            _context2.next = 60;
            break;
          }

          fn = _arr[_i];
          _ref2 = fn === _action2 ? [fn(args), false] : [fn(), true], _ref3 = _slicedToArray(_ref2, 2), iterator = _ref3[0], asHook = _ref3[1];
          _context2.t3 = castRouterArray;
          _context2.next = 51;
          return (0, _effects.call)(runRouteAction, iterator, hooks, leaving, cancel, channel, asHook);

        case 51:
          _context2.t4 = _context2.sent;
          _ret2 = (0, _context2.t3)(_context2.t4);

          hooks = _ret2.hooks;
          if (_ret2.location) {
            nextLocation = _ret2.location;
          }

          if (!(_ret2.prevented === true)) {
            _context2.next = 57;
            break;
          }

          return _context2.abrupt('break', 60);

        case 57:
          _i++;
          _context2.next = 45;
          break;

        case 60:
          _context2.next = 9;
          break;

        case 62:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function handleLocationChange(_ref4) {
  var history = _ref4.history,
      routes = _ref4.routes,
      offset = _ref4.offset;
  var matcher;
  return regeneratorRuntime.wrap(function handleLocationChange$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.put)((0, _actions2.init)({ offset: offset }));

        case 2:

          // Start routing
          matcher = createMatcher(routes);
          _context3.next = 5;
          return (0, _effects.fork)(theControlTower, { history: history, matcher: matcher, offset: offset });

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function castAction(arg) {
  return arg;
}

function handleHistoryAction(_ref5) {
  var history = _ref5.history;

  var _castAction, type, payload, _offset, historyFunction;

  return regeneratorRuntime.wrap(function handleHistoryAction$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!true) {
            _context4.next = 17;
            break;
          }

          _context4.t0 = castAction;
          _context4.next = 4;
          return (0, _effects.take)(_actions2.HISTORY_ACTIONS);

        case 4:
          _context4.t1 = _context4.sent;
          _castAction = (0, _context4.t0)(_context4.t1);
          type = _castAction.type;
          payload = _castAction.payload;

          if (!(type === _actions2.PUSH || type === _actions2.REPLACE)) {
            _context4.next = 13;
            break;
          }

          _context4.next = 11;
          return (0, _effects.select)(_reducer.getOffset);

        case 11:
          _offset = _context4.sent;

          if (_offset && typeof _offset === 'string') {
            payload[0] = _offset + payload[0];
          }

        case 13:
          historyFunction = history[(0, _utils.toCamelCase)((0, _actions2.unprefix)(type))];

          historyFunction.apply(undefined, _toConsumableArray(payload));
          _context4.next = 0;
          break;

        case 17:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function routerSaga(options) {
  return regeneratorRuntime.wrap(function routerSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (typeof options.offset === 'undefined') {
            options.offset = '';
          }
          _context5.next = 3;
          return (0, _effects.fork)(handleLocationChange, options);

        case 3:
          _context5.next = 5;
          return (0, _effects.fork)(handleHistoryAction, options);

        case 5:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked5, this);
}