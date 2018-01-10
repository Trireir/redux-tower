'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigurationActions = exports.INITIAL = exports.ERROR = exports.CANCEL = exports.ROUTES = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.resolve = resolve;
exports.interpolate = interpolate;
exports.resolveRelative = resolveRelative;
exports.flatten = flatten;
exports.default = preprocess;

var _effects = require('redux-saga/effects');

var _actions3 = require('./actions');

var _utils = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ROUTES = exports.ROUTES = _actions3.PREFIX + 'ROUTES';
var CANCEL = exports.CANCEL = _actions3.PREFIX + 'CANCEL';
var ERROR = exports.ERROR = _actions3.PREFIX + 'ERROR';
var INITIAL = exports.INITIAL = _actions3.PREFIX + 'INITIAL';

var getConfigurationActions = exports.getConfigurationActions = function getConfigurationActions(matcher) {
  return {
    cancel: matcher[ROUTES][CANCEL],
    error: matcher[ROUTES][ERROR],
    initial: matcher[ROUTES][INITIAL]
  };
};

function createRouteAction(Component) {
  return (/*#__PURE__*/regeneratorRuntime.mark(function componentRouteAction() {
      return regeneratorRuntime.wrap(function componentRouteAction$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _effects.put)((0, _actions3.changeComponent)(Component));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, componentRouteAction, this);
    })
  );
}

function createLazyRedirectAction(path) {
  return (/*#__PURE__*/regeneratorRuntime.mark(function lazyRedirectAction() {
      return regeneratorRuntime.wrap(function lazyRedirectAction$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.put)((0, _actions3.replace)(path));

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, lazyRedirectAction, this);
    })
  );
}

var MAX_REDIRECTIONS = 10;

// NOTE: Destructive operation
// routes: already flatten
function resolve(routes) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(routes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var path = _step.value;

      var count = 0,
          current = path;
      while (true) {
        if (MAX_REDIRECTIONS < count++) {
          throw new Error('Potential for circular reference in \'' + path + '\'');
        }

        var actions = routes[current];
        if (typeof actions === 'undefined') {
          actions = [[], createLazyRedirectAction(current), []];
        }

        var _actions = actions,
            _actions2 = _slicedToArray(_actions, 3),
            enter = _actions2[0],
            action = _actions2[1],
            leave = _actions2[2];

        if (typeof action !== 'string') {
          routes[path] = actions;
          break;
        }

        current = action;
      }
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
}

function interpolate(routes) {
  var entering = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var leaving = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var r = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(routes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var segment = _step2.value;

      var rval = routes[segment];
      if ((typeof rval === 'undefined' ? 'undefined' : _typeof(rval)) === 'object') {
        // Array or Object
        if (!Array.isArray(rval)) {
          rval = [rval];
        }

        var enter = void 0,
            action = void 0,
            leave = void 0;
        switch (rval.length) {
          case 1:
            var _rval = rval;

            var _rval2 = _slicedToArray(_rval, 1);

            action = _rval2[0];

            break;
          case 2:
            if (_typeof(rval[0]) !== 'object' && _typeof(rval[1]) !== 'object') {
              // Special pattern: route action with leave hook
              r[segment] = [entering, rval[0], [rval[1]].concat(_toConsumableArray(leaving))];
              continue;
            }
            if (_typeof(rval[0]) === 'object') {
              var _rval3 = rval;

              var _rval4 = _slicedToArray(_rval3, 2);

              action = _rval4[0];
              leave = _rval4[1];
            } else {
              var _rval5 = rval;

              var _rval6 = _slicedToArray(_rval5, 2);

              enter = _rval6[0];
              action = _rval6[1];
            }
            break;
          case 3:
            var _rval7 = rval;

            var _rval8 = _slicedToArray(_rval7, 3);

            enter = _rval8[0];
            action = _rval8[1];
            leave = _rval8[2];

            break;
          default:
            throw new Error('You can only use one hook each enter/leave in \'' + segment + '\': length=' + rval.length);
        }

        if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) !== 'object') {
          throw new Error('Hooks can be specified with nested routes in \'' + segment + '\'');
        }

        // Normalize recursively
        r[segment] = interpolate(action, [].concat(_toConsumableArray(entering), [enter]).filter(function (h) {
          return !!h;
        }), [leave].concat(_toConsumableArray(leaving)).filter(function (h) {
          return !!h;
        }));
      } else {
        // Interpolate hooks
        r[segment] = [entering, rval, leaving];
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return r;
}

// FIXME: Poor implementation :(
function resolveRelative(route, base) {
  if (route.indexOf('/') === 0) {
    return route;
  }

  if (route.indexOf('./') === 0) {
    return base.join('') + route.slice(1);
  }

  base = [].concat(_toConsumableArray(base));

  var segments = route.split('/');
  while (0 < segments.length) {
    // Peek first segment
    var segment = segments[0];
    if (segment === '..') {
      // TODO: Throw exception if invalid traversal
      segments.shift();
      base.pop();
    } else {
      break;
    }
  }

  return base.join('') + segments.map(function (s) {
    return '/' + s;
  }).join('');
}

function norm(path) {
  if (path.lastIndexOf('/') === path.length - 1) {
    path = path.slice(0, path.length - 1);
  }
  if (path === '') {
    path = '/';
  }
  return path;
}

// TODO: Rewrite stack to recursive
// routes: already interpolated
function flatten(routes) {
  var r = {};
  var stack = [{
    current: routes,
    name: '',
    backlog: Object.keys(routes).map(function (key) {
      return [key, key];
    })
  }];

  while (0 < stack.length) {
    // Peek current backlog
    var _stack = stack[stack.length - 1],
        current = _stack.current,
        backlog = _stack.backlog;

    while (0 < backlog.length) {
      var _backlog$shift = backlog.shift(),
          _backlog$shift2 = _slicedToArray(_backlog$shift, 2),
          key = _backlog$shift2[0],
          path = _backlog$shift2[1];

      var rval = current[key];
      var action = Array.isArray(rval) ? rval[1] : rval;
      if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object') {
        var _ret = function () {
          var base = stack.map(function (l) {
            return l.name;
          }).join('') + key;
          stack.push({
            current: action,
            name: key,
            backlog: Object.keys(action).map(function (key) {
              return [key, base + key];
            })
          });
          return 'break'; // Digging down
        }();

        if (_ret === 'break') break;
      } else {
        if (typeof action === 'string') {
          // Resolve relative routes
          action = norm(resolveRelative(action, stack.map(function (l) {
            return l.name;
          })));
        }
        if (Array.isArray(rval)) {
          r[norm(path)] = [rval[0], action, rval[2]];
        } else {
          r[norm(path)] = action;
        }
      }
    }

    if (backlog === stack[stack.length - 1].backlog && backlog.length === 0) {
      stack.pop(); // Pop only if not pushed a new one
    }
  }

  return r;
}

// NOTE: Destructive operation
function amend(routes) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = Object.keys(routes)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var segment = _step3.value;

      if ((0, _actions3.isPrefixed)(segment)) {
        routes[segment] = routes[segment][1];
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function preprocess(routes) {
  // 1. Interpolate hooks in nested routes
  routes = interpolate(routes);

  // 2. Flatten nested and resolve relative routes
  routes = flatten(routes);

  // 3. Replace React component with auto-generated route actions (sagas)
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = Object.keys(routes)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var segment = _step4.value;

      var _routes$segment = _slicedToArray(routes[segment], 3),
          enter = _routes$segment[0],
          action = _routes$segment[1],
          leave = _routes$segment[2];

      if ((0, _utils.isReactComponent)(action)) {
        routes[segment] = [enter, createRouteAction(action), leave];
      }
    }

    // 4. Resolve redirect/alias with detecting circular references
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  resolve(routes);

  // 5. Amend configuration routes
  amend(routes);

  return routes;
}