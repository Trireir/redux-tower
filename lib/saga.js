'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createMatcher = createMatcher;
exports.runRouteAction = runRouteAction;
exports.theControlTower = theControlTower;
exports.default = routerSaga;

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

      var action = routes[path];
      matcher.addRoute(path, action);
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

// hooks: Stored current leaving hooks
// candidate: Candidate of leaving hooks in current route
function runRouteAction(iterator, hooks, candidate, cancel, channel, asHook) {
  var rules, ret, _iterator$next, effect, done, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, hook, _ret, _ref, main, loc;

  return regeneratorRuntime.wrap(function runRouteAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Setup Domain Specific Saga
          rules = [function (value) {
            return typeof value === 'string' ? (0, _effects.put)((0, _actions2.replace)(value)) : value;
          }, function (value) {
            return (0, _utils.isReactComponent)(value) ? (0, _effects.put)((0, _actions2.changeComponent)(value)) : value;
          }];

          iterator = (0, _domainSpecificSaga2.default)(iterator, rules);

          ret = void 0;

        case 3:
          if (!true) {
            _context.next = 66;
            break;
          }

          _iterator$next = iterator.next(ret), effect = _iterator$next.value, done = _iterator$next.done;

          if (!done) {
            _context.next = 7;
            break;
          }

          return _context.abrupt('break', 66);

        case 7:
          if (!(effect === false)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt('return', {
            prevented: true, // Prevented in entering/leaving hooks
            hooks: hooks, // Keep current leaving hooks
            location: undefined // No location change
          });

        case 9:
          if (!(0, _utils.isPut)(effect, _actions2.CHANGE_COMPONENT)) {
            _context.next = 40;
            break;
          }

          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 13;
          _iterator2 = hooks[Symbol.iterator]();

        case 15:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 25;
            break;
          }

          hook = _step2.value;
          _context.next = 19;
          return (0, _effects.call)(runRouteAction, hook(), [], [], undefined, channel, true);

        case 19:
          _ret = _context.sent;

          if (!(_ret.prevented === true)) {
            _context.next = 22;
            break;
          }

          return _context.abrupt('return', {
            prevented: true, // Prevented in leaving hooks
            hooks: hooks, // Keep current leaving hooks
            location: undefined // No location change
          });

        case 22:
          _iteratorNormalCompletion2 = true;
          _context.next = 15;
          break;

        case 25:
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context['catch'](13);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t0;

        case 31:
          _context.prev = 31;
          _context.prev = 32;

          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }

        case 34:
          _context.prev = 34;

          if (!_didIteratorError2) {
            _context.next = 37;
            break;
          }

          throw _iteratorError2;

        case 37:
          return _context.finish(34);

        case 38:
          return _context.finish(31);

        case 39:

          // Set new leaving hooks
          hooks = candidate;

        case 40:
          if (!(0, _utils.isBlock)(effect)) {
            _context.next = 59;
            break;
          }

          _context.next = 43;
          return (0, _effects.race)({
            main: effect,
            loc: (0, _effects.take)(channel)
          });

        case 43:
          _ref = _context.sent;
          main = _ref.main;
          loc = _ref.loc;

          if (!main) {
            _context.next = 50;
            break;
          }

          ret = main;
          _context.next = 57;
          break;

        case 50:
          if (!loc) {
            _context.next = 57;
            break;
          }

          if (!(typeof cancel === 'function')) {
            _context.next = 54;
            break;
          }

          _context.next = 54;
          return (0, _effects.call)(runRouteAction, cancel(), [], [], undefined, channel, true);

        case 54:
          return _context.abrupt('return', {
            prevented: true, // Prevented
            hooks: [], // Clear leaving hooks
            location: loc // New location
          });

        case 57:
          _context.next = 62;
          break;

        case 59:
          _context.next = 61;
          return effect;

        case 61:
          ret = _context.sent;

        case 62:
          if (!(asHook && (0, _utils.isPrevent)(effect))) {
            _context.next = 64;
            break;
          }

          return _context.abrupt('return', {
            prevented: true, // Prevented in entering hooks
            hooks: hooks, // Keep current leaving hooks
            location: undefined // No location change
          });

        case 64:
          _context.next = 3;
          break;

        case 66:
          return _context.abrupt('return', {
            prevented: false, // Not prevented
            hooks: hooks, // Keep or New
            location: undefined // No location change
          });

        case 67:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[13, 27, 31, 39], [32,, 34, 38]]);
}

// offset: normalized offset
function theControlTower(_ref2) {
  var history = _ref2.history,
      matcher = _ref2.matcher,
      offset = _ref2.offset;

  var _getConfigurationActi, cancel, error, initial, channel, nextPath, hooks, location, entering, action, leaving, args, pathname, matched, actions, params, route, splats, _actions, _arr, _i, fn, _ref3, _ref4, iterator, asHook, ret;

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
          hooks = [], location = void 0;

        case 9:
          if (!true) {
            _context2.next = 53;
            break;
          }

          if (location) {
            _context2.next = 14;
            break;
          }

          _context2.next = 13;
          return (0, _effects.take)(channel);

        case 13:
          location = _context2.sent;

        case 14:
          entering = void 0, action = void 0, leaving = void 0, args = void 0;
          pathname = (0, _utils.removeOffset)(location.pathname, offset);
          matched = matcher.match(pathname);

          if (!matched) {
            _context2.next = 28;
            break;
          }

          actions = matched.action, params = matched.params, route = matched.route, splats = matched.splats;

          args = {
            path: pathname,
            params: params,
            query: (0, _utils.parseQueryString)(location.search),
            splats: splats,
            route: route
          };

          _context2.next = 22;
          return (0, _effects.put)((0, _actions2.updatePathInfo)(args));

        case 22:
          _actions = _slicedToArray(actions, 3);
          entering = _actions[0];
          action = _actions[1];
          leaving = _actions[2];
          _context2.next = 35;
          break;

        case 28:
          if (error) {
            _context2.next = 31;
            break;
          }

          location = undefined; // Clear to prevent infinite loop
          return _context2.abrupt('continue', 9);

        case 31:

          // Fallback to error page
          args = {};
          entering = [];
          action = error;
          leaving = [];

        case 35:

          // Clear for detecting location change while running action
          location = undefined;

          _arr = [].concat(_toConsumableArray(entering), [action]);
          _i = 0;

        case 38:
          if (!(_i < _arr.length)) {
            _context2.next = 51;
            break;
          }

          fn = _arr[_i];
          _ref3 = fn === action ? [fn(args), false] : [fn(), true], _ref4 = _slicedToArray(_ref3, 2), iterator = _ref4[0], asHook = _ref4[1];
          _context2.next = 43;
          return (0, _effects.call)(runRouteAction, iterator, hooks, leaving, cancel, channel, asHook);

        case 43:
          ret = _context2.sent;

          hooks = ret.hooks;
          if (ret.location) {
            location = ret.location;
          }

          if (!(ret.prevented === true)) {
            _context2.next = 48;
            break;
          }

          return _context2.abrupt('break', 51);

        case 48:
          _i++;
          _context2.next = 38;
          break;

        case 51:
          _context2.next = 9;
          break;

        case 53:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function handleLocationChange(_ref5) {
  var history = _ref5.history,
      routes = _ref5.routes,
      offset = _ref5.offset;
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

function handleHistoryAction(_ref6) {
  var history = _ref6.history;

  var _ref7, type, payload, offset;

  return regeneratorRuntime.wrap(function handleHistoryAction$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!true) {
            _context4.next = 14;
            break;
          }

          _context4.next = 3;
          return (0, _effects.take)(_actions2.HISTORY_ACTIONS);

        case 3:
          _ref7 = _context4.sent;
          type = _ref7.type;
          payload = _ref7.payload;

          if (!(type === _actions2.PUSH || type === _actions2.REPLACE)) {
            _context4.next = 11;
            break;
          }

          _context4.next = 9;
          return (0, _effects.select)(_reducer.getOffset);

        case 9:
          offset = _context4.sent;

          if (offset) {
            payload[0] = offset + payload[0];
          }

        case 11:

          history[(0, _utils.toCamelCase)((0, _actions2.unprefix)(type))].apply(history, _toConsumableArray(payload));
          _context4.next = 0;
          break;

        case 14:
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