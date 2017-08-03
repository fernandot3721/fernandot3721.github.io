webpackJsonp([5,0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory();
	})(undefined, function () {
	  'use strict';

	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  function forEach(object, callback, thisObj) {
	    if (isObj(object)) {
	      if (thisObj === void 0) {
	        thisObj = object;
	      }
	      if (object instanceof Array || 'length' in object) {
	        var arr = Array.prototype.slice.call(object);
	        arr.forEach(callback, thisObj);
	      } else {
	        for (var name in object) {
	          if (hasOwnProperty.call(object, name)) {
	            callback.call(thisObj, object[name], name);
	          }
	        }
	      }
	    }
	    return object;
	  }

	  function isFunc(any) {
	    return typeof any === 'function';
	  }
	  function isObj(any) {
	    return (typeof any === 'undefined' ? 'undefined' : _typeof(any)) === 'object' && any;
	  }
	  function isStr(any) {
	    return typeof any === "string";
	  }

	  /**
	   * Created by brian on 8/21/16.
	   */
	  function arrAdd(array, item) {
	    if (array.indexOf(item) == -1) {
	      array.push(item);
	      return true;
	    }
	    return false;
	  }

	  function arrRemove(array, item) {
	    var i = array.indexOf(item);
	    if (i >= 0) {
	      array.splice(i, 1);
	      return true;
	    }
	    return false;
	  }

	  /**
	   * Created by brian on 8/21/16.
	   */

	  var EventEmitter = function () {
	    function EventEmitter() {
	      _classCallCheck(this, EventEmitter);
	    }

	    EventEmitter.prototype.on = function on(eventName, handler) {
	      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      addEventListener(this, eventName, handler, once);
	      return this;
	    };

	    EventEmitter.prototype.once = function once(eventName, handler) {
	      return this.on(eventName, handler, true);
	    };

	    EventEmitter.prototype.off = function off(eventName, handler) {
	      removeEventListener(this, eventName, handler);
	      return this;
	    };

	    EventEmitter.prototype.emit = function emit(eventName, args, thisObj) {
	      emitEvent(this, eventName, args, thisObj);
	      return this;
	    };

	    return EventEmitter;
	  }();

	  function addEventListener(obj, evtName, handler, once) {
	    if (typeof evtName == "string" && evtName && isFunc(handler)) {
	      var cbs, hs;
	      if (!obj.hasOwnProperty('__callbacks')) {
	        obj.__callbacks = {};
	      }
	      cbs = obj.__callbacks;
	      if (!(hs = cbs[evtName])) {
	        hs = cbs[evtName] = [];
	      }
	      return arrAdd(hs, once ? warpOnceFunc(handler) : handler);
	    }
	    return false;
	  }
	  function emitEvent(obj, evtName, argArray, thisObj) {
	    var callbacks, handlers;
	    if (!obj.hasOwnProperty('__callbacks') || !(handlers = (callbacks = obj.__callbacks)[evtName])) {
	      return false;
	    }
	    if (!argArray) {
	      argArray = [];
	    } else if (!(argArray instanceof Array)) {
	      argArray = [argArray];
	    }
	    if (thisObj === undefined) {
	      thisObj = obj;
	    }
	    return callbacks[evtName] = handlers.reduce(function (next, call) {
	      if (isFunc(call) && call.apply(thisObj, argArray) !== -1) {
	        next.push(call);
	      }
	      return next;
	    }, []);
	  }
	  function removeEventListener(obj, evtName, handler) {
	    var cbs, hs, i;
	    if (evtName === undefined) {
	      obj.__callbacks = {};
	    } else if ((cbs = obj.__callbacks) && (hs = cbs[evtName]) && hs) {
	      if (handler) {
	        if ((i = hs.indexOf(handler)) > -1) {
	          hs[i] = null;
	        }
	      } else {
	        cbs[evtName] = [];
	      }
	    }
	    return obj;
	  }
	  function warpOnceFunc(func) {
	    return function () {
	      func.apply(this, arguments);
	      return -1;
	    };
	  }

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  var INVALID_KEY = createPrivateMemberName('isInvalid');

	  var DISABLED_KEY$1 = createPrivateMemberName('disabled');
	  function setDisposed(target) {
	    target[DISABLED_KEY$1] = true;
	  }
	  function getDisposed(target) {
	    return target ? target[DISABLED_KEY$1] : false;
	  }
	  function createPrivateMemberName(name) {
	    return isFunc(window.Symbol) ? Symbol(name) : '_' + name;
	  }
	  function isInvalid(obj) {
	    return obj && obj[INVALID_KEY];
	  }
	  function setInvalid(obj, invalid) {
	    if (obj) {
	      obj[INVALID_KEY] = invalid;
	    }
	  }

	  /**
	   * Created by brian on 8/21/16.
	   */
	  var DISABLED_KEY = createPrivateMemberName('disabled');

	  var PureRender = function () {
	    function PureRender() {
	      _classCallCheck(this, PureRender);
	    }

	    PureRender.prototype.update = function update(e) {};

	    PureRender.prototype.render = function render(e) {};

	    PureRender.prototype.dispose = function dispose(e) {};

	    return PureRender;
	  }();
	  /**
	   * @memberOf Flip
	   */


	  var Render = function (_EventEmitter) {
	    _inherits(Render, _EventEmitter);

	    function Render(arg) {
	      _classCallCheck(this, Render);

	      var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	      if (arg && arg.name) {
	        _this.name = arg.name;
	      }
	      _this.invalid();
	      return _this;
	    }

	    Render.prototype.update = function update(e) {};

	    Render.prototype.invalid = function invalid() {
	      if (this.parent) {
	        this.parent.invalid();
	      }
	      setInvalid(this, true);
	    };

	    Render.prototype.render = function render(e) {
	      setInvalid(this, false);
	    };

	    Render.prototype.dispose = function dispose(e) {
	      setDisposed(this);
	    };

	    Render.prototype.removeFromParent = function removeFromParent() {
	      if (this.parent) {
	        return this.parent.removeChild(this);
	      }
	      return false;
	    };

	    _createClass(Render, [{
	      key: 'parent',
	      get: function get() {
	        return this._parent;
	      },
	      set: function set(parent) {
	        if (!parent || !this._parent) {
	          this._parent = parent;
	        } else if (parent != this._parent) {
	          throw Error('explicitly remove render parent before add another');
	        }
	      }
	    }, {
	      key: 'disabled',
	      get: function get() {
	        return this[DISABLED_KEY];
	      },
	      set: function set(v) {
	        if (this.disabled != v) {
	          this[DISABLED_KEY] = v;
	          this.invalid();
	        }
	      }
	    }, {
	      key: 'disposed',
	      get: function get() {
	        return getDisposed(this);
	      }
	    }]);

	    return Render;
	  }(EventEmitter);

	  function isRender(obj) {
	    return obj instanceof PureRender || obj instanceof Render;
	  }

	  /**
	   * Created by brian on 8/28/16.
	   */
	  var _hasOwnProperty = Object.prototype.hasOwnProperty;
	  function hasOwnProperty$1(obj, key) {
	    return _hasOwnProperty.call(obj, key);
	  }
	  function makeOptions(opt, defaults) {
	    var ret = Object.create(null);
	    opt = isObj(opt) ? opt : {};
	    forEach(defaults, function (defaultValue, key) {
	      return ret[key] = hasOwnProperty$1(opt, key) ? opt[key] : defaultValue;
	    });
	    return ret;
	  }
	  function objAssign(target) {
	    if (!target) {
	      throw Error('target is not object');
	    }
	    for (var i = 0; i < arguments.length; i++) {
	      var source = arguments[i];
	      clonePropertiesFrom(target, source);
	    }
	    return target;
	  }
	  function objFind(obj, test) {
	    if (isObj(obj)) {
	      for (var key in obj) {
	        if (_hasOwnProperty.call(obj, key)) {
	          var val = obj[key];
	          if (test.call(obj, val, key)) {
	            return val;
	          }
	        }
	      }
	    }
	  }
	  function clonePropertiesFrom(source, target) {
	    forEach(target, function (val, key) {
	      return source[key] = val;
	    });
	  }

	  /**
	   * Created by brian on 8/28/16.
	   */
	  function capitalizeString(str) {
	    if (!str) {
	      return '';
	    }
	    return str[0].toUpperCase() + str.substring(1);
	  }
	  function stringTemplate(stringTemplate) {
	    var arg = arguments,
	        r;
	    return stringTemplate.replace(/\$\{(\d+)}/g, function ($i, i) {
	      return (r = arg[i]) == undefined ? $i : formatNum(r);
	    });
	  }
	  function formatNum(value) {
	    return isNaN(value) ? value + '' : Number(value).toFixed(5).replace(/\.0+$/, '');
	  }

	  var slice = Array.prototype.slice;
	  /**
	   * @memberOf Flip
	   */
	  function $$(slt, ele) {
	    return slice.apply((ele || document).querySelectorAll(slt));
	  }
	  /**
	   * @memberOf Flip
	   */
	  function $(slt, ele) {
	    return (ele || document).querySelector(slt);
	  }
	  function createElement(tagName, attributes, innerHTML) {
	    var ele = document.createElement(tagName);
	    forEach(attributes, function (val, name) {
	      ele.setAttribute(name, val);
	    });
	    if (isStr(innerHTML)) {
	      ele.innerHTML = innerHTML;
	    }
	    return ele;
	  }

	  /**
	   * Created by brian on 14/10/2016.
	   */
	  var requestAnimationFrame = function requestAnimationFrame(func) {
	    window.requestAnimationFrame(func);
	  };

	  /**
	   * Created by brian on 8/28/16.
	   */

	  /**
	   * Created by brian on 8/28/16.
	   */
	  var EVENT_INIT = 'init';
	  var EVENT_ITERATE = 'iterate';
	  var EVENT_REVERSE = 'reverse';
	  var EVENT_START = 'start';
	  var EVENT_HOLD = 'hold';
	  var EVENT_PAUSE = 'pause';
	  var EVENT_RESUME = 'resume';
	  var EVENT_CANCEL = 'cancel';
	  var EVENT_UPDATE = 'update';
	  var EVENT_END = 'end';
	  var EVENT_RENDER_START = 'renderStart';
	  var EVENT_RENDER_END = 'renderEnd';
	  var EVENT_FRAME_START = 'frameStart';
	  var EVENT_FRAME_END = 'frameEnd';

	  /**
	   * Created by brian on 16/10/2016.
	   */
	  /**
	   * @memberOf Flip
	   */

	  var TreeRender = function (_Render) {
	    _inherits(TreeRender, _Render);

	    function TreeRender(arg) {
	      _classCallCheck(this, TreeRender);

	      var _this2 = _possibleConstructorReturn(this, _Render.call(this, arg));

	      _this2.children = [];
	      _this2._disposableItems = [];
	      _this2.parent = null;
	      return _this2;
	    }

	    TreeRender.prototype.add = function add(child) {
	      return this.addChild(child);
	    };

	    TreeRender.prototype.remove = function remove(child) {
	      return this.removeChild(child);
	    };

	    TreeRender.prototype.addChild = function addChild(child) {
	      if (isRender(child)) {
	        if (getDisposed(child)) {
	          throw Error('disposed child should not be added again');
	        }
	        if (arrAdd(this.children, child)) {
	          child.parent = this;
	          this.invalid();
	          return true;
	        }
	      }
	      return false;
	    };

	    TreeRender.prototype.removeChild = function removeChild(child) {
	      if (child.parent === this) {
	        arrRemove(this.children, child);
	        child.parent = null;
	        arrAdd(this._disposableItems, child);
	        this.invalid();
	        return true;
	      }
	      return false;
	    };

	    TreeRender.prototype.findChild = function findChild(find, recursive) {
	      var children = this.children;
	      var target = children.find(find);
	      if (!target && recursive) {
	        for (var i = 0; i < children.length; i++) {
	          var child = children[i];
	          if (child instanceof TreeRender) {
	            var _target = child.findChild(find, true);
	            if (isRender(_target)) {
	              break;
	            } else {
	              _target = null;
	            }
	          }
	        }
	      }
	      return target;
	    };

	    TreeRender.prototype.dispose = function dispose(e) {
	      _Render.prototype.dispose.call(this, e);
	      this.children.forEach(function (c) {
	        return c.dispose(e);
	      });
	      this.disposeRemovedItems(e);
	    };

	    TreeRender.prototype.disposeRemovedItems = function disposeRemovedItems(e) {
	      if (this._disposableItems.length) {
	        this._disposableItems.forEach(function (c) {
	          return c.dispose(e);
	        });
	        this._disposableItems = [];
	        this.invalid();
	      }
	    };

	    TreeRender.prototype.render = function render(state) {
	      _Render.prototype.render.call(this, state);
	      this.beforeRenderChildren(state);
	      this.renderChildren(state);
	      this.afterRenderChildren(state);
	    };

	    TreeRender.prototype.beforeRenderChildren = function beforeRenderChildren(state) {};

	    TreeRender.prototype.afterRenderChildren = function afterRenderChildren(state) {};

	    TreeRender.prototype.update = function update(e) {
	      _Render.prototype.update.call(this, e);
	      this.updateSelf(e);
	      this.updateChildren(e);
	    };

	    TreeRender.prototype.updateSelf = function updateSelf(e) {};

	    TreeRender.prototype.updateChildren = function updateChildren(e) {
	      forEach(this.children, function (child) {
	        if (isRender(child) && !child.disabled) {
	          child.update(e);
	        }
	      });
	    };

	    TreeRender.prototype.renderChildren = function renderChildren(state) {
	      forEach(this.children, function (renderable) {
	        if (isRender(renderable) && !renderable.disabled) {
	          renderable.render(state);
	        }
	      });
	    };

	    TreeRender.prototype.invalid = function invalid() {
	      _Render.prototype.invalid.call(this);
	      if (this.parent) {
	        this.parent.invalid();
	      }
	    };

	    return TreeRender;
	  }(Render);

	  /**
	   * Created by brian on 8/28/16.
	   */


	  var TICKS_PER_SECOND = 1000;

	  var TimeLine = function (_EventEmitter2) {
	    _inherits(TimeLine, _EventEmitter2);

	    function TimeLine() {
	      _classCallCheck(this, TimeLine);

	      var _this3 = _possibleConstructorReturn(this, _EventEmitter2.call(this));

	      _this3.last = _this3.now = _this3._stopTime = 0;
	      _this3._startTime = _this3._lastStop = Date.now();
	      _this3.ticksPerSecond = TICKS_PER_SECOND;
	      _this3._isStop = true;
	      return _this3;
	    }

	    TimeLine.prototype.stop = function stop() {
	      if (!this._isStop) {
	        this._isStop = true;
	        this._lastStop = Date.now();
	        return true;
	      }
	    };

	    TimeLine.prototype.start = function start() {
	      if (this._isStop) {
	        this._isStop = false;
	        this._stopTime += Date.now() - this._lastStop;
	        return true;
	      }
	    };

	    TimeLine.prototype.tick = function tick() {
	      if (!this._isStop) {
	        this.last = this.now;
	        this.now = Date.now() - this._startTime - this._stopTime;
	        return true;
	      }
	    };

	    _createClass(TimeLine, [{
	      key: 'advancedTimeInterval',
	      get: function get() {
	        return this.now - this.last;
	      }
	    }]);

	    return TimeLine;
	  }(EventEmitter);

	  /**
	   * Created by brian on 8/21/16.
	   */


	  var RenderTask = function (_TreeRender) {
	    _inherits(RenderTask, _TreeRender);

	    function RenderTask(arg) {
	      _classCallCheck(this, RenderTask);

	      var _this4 = _possibleConstructorReturn(this, _TreeRender.call(this));

	      _this4.name = arg.name;
	      _this4.timeLine = new TimeLine();
	      _this4.clocks = [];
	      return _this4;
	    }

	    RenderTask.prototype.init = function init() {
	      this.timeLine.start();
	    };

	    RenderTask.prototype.addClock = function addClock(clock) {
	      return arrAdd(this.clocks, clock);
	    };

	    RenderTask.prototype.removeClock = function removeClock(clock) {
	      return arrRemove(this.clocks, clock);
	    };

	    RenderTask.prototype.render = function render(state) {
	      this.emit(EVENT_RENDER_START, [state]);
	      _TreeRender.prototype.render.call(this, state);
	      this.emit(EVENT_RENDER_END, [state]);
	    };

	    RenderTask.prototype.update = function update(e) {
	      this.timeLine.tick();
	      if (this.clocks.length) {
	        this.clocks.slice().forEach(function (c) {
	          return c.update(e);
	        });
	      }
	      this.disposeRemovedItems(e);
	      forEach(this.children, function recursive(renderable) {
	        if (isRender(renderable) && !renderable.disabled) {
	          if (!renderable.disabled) {
	            renderable.update(e);
	            forEach(renderable.children, recursive);
	          }
	        }
	      });
	      this.emit(EVENT_UPDATE, [e]);
	    };

	    RenderTask.prototype.invalid = function invalid() {
	      _TreeRender.prototype.invalid.call(this);
	      if (this.global) {
	        this.global.invalid();
	      }
	    };

	    return RenderTask;
	  }(TreeRender);

	  /**
	   * Created by brian on 14/10/2016.
	   */


	  var RenderApplication = function () {
	    function RenderApplication() {
	      _classCallCheck(this, RenderApplication);
	    }

	    RenderApplication.prototype.renderGlobalInitialized = function renderGlobalInitialized(global) {};

	    RenderApplication.prototype.setupRenderState = function setupRenderState(state) {};

	    RenderApplication.prototype.applyRenderState = function applyRenderState(state) {};

	    RenderApplication.prototype.removeFromGlobal = function removeFromGlobal(global) {};

	    return RenderApplication;
	  }();

	  var RENDER_STATE_PHRASE_UPDATE = 'update'; /**
	                                                     * Created by brian on 8/28/16.
	                                                     */

	  var RENDER_STATE_PHRASE_IDLE = 'idle';
	  var RENDER_STATE_PHRASE_RENDER = 'render';
	  var RENDER_STATE_PHRASE_APPLY = 'apply';

	  var RenderState = function () {
	    _createClass(RenderState, [{
	      key: 'timeLine',
	      get: function get() {
	        var task = this.task;
	        return task ? task.timeLine : null;
	      }
	    }]);

	    function RenderState(_ref) {
	      var task = _ref.task,
	          global = _ref.global;

	      _classCallCheck(this, RenderState);

	      this.task = task;
	      this.global = global;
	      this.phrase = RENDER_STATE_PHRASE_IDLE;
	    }

	    RenderState.prototype.willDisposeClock = function willDisposeClock(clock) {
	      this.task.removeClock(clock);
	    };

	    RenderState.prototype.willDispose = function willDispose(any) {};

	    RenderState.prototype.dispose = function dispose() {};

	    return RenderState;
	  }();

	  /**
	   * Created by brian on 14/10/2016.
	   */
	  /**
	   * @memberOf Flip
	   */


	  var RenderGlobal = function (_EventEmitter3) {
	    _inherits(RenderGlobal, _EventEmitter3);

	    function RenderGlobal() {
	      _classCallCheck(this, RenderGlobal);

	      var _this5 = _possibleConstructorReturn(this, _EventEmitter3.call(this));

	      _this5._tasks = {};
	      _this5.defaultTaskName = 'default';
	      _this5.applications = _this5.getRenderApplications();
	      return _this5;
	    }

	    RenderGlobal.prototype.init = function init() {
	      var _this6 = this;

	      var loop = function loop() {
	        renderGlobal(_this6);
	        requestAnimationFrame(loop);
	      };
	      requestAnimationFrame(loop);
	      this.applications.forEach(function (a) {
	        return a.renderGlobalInitialized(_this6);
	      });
	      this.initiated = true;
	      this.init = function () {
	        console.warn('Don not all init() more than once');
	        return _this6;
	      };
	      return this;
	    };

	    RenderGlobal.prototype.getRenderApplications = function getRenderApplications() {
	      return [];
	    };

	    RenderGlobal.prototype.add = function add(renderModel) {
	      if (isObj(renderModel) && renderModel.global) {
	        throw Error('item not an object or belongs to other global', renderModel.global);
	      }
	      if (renderModel instanceof RenderTask) {
	        this._tasks[renderModel.name] = renderModel;
	        renderModel.global = this;
	        renderModel.init();
	        this.invalid();
	        return true;
	      } else if (renderModel instanceof Render) {
	        return this.defaultTask.add(renderModel);
	      } else if (renderModel instanceof RenderApplication) {
	        if (arrAdd(this.applications, renderModel)) {
	          renderModel.global = this;
	          if (this.initiated) {
	            renderModel.renderGlobalInitialized(this);
	          }
	          this.invalid();
	          return true;
	        }
	      }
	      return false;
	    };

	    RenderGlobal.prototype.remove = function remove(renderModel) {
	      if (!isObj(renderModel) || renderModel.global != this) {
	        throw Error('only remove added item');
	      }
	      if (renderModel instanceof RenderApplication) {
	        if (arrRemove(this.applications, renderModel)) {
	          renderModel.global = null;
	          renderModel.removeFromGlobal(this);
	          this.invalid();
	          return true;
	        }
	      }
	    };

	    RenderGlobal.prototype.update = function update(e) {
	      e.phrase = RENDER_STATE_PHRASE_UPDATE;
	      this.applications.forEach(function (app) {
	        return app.setupRenderState(e);
	      });
	      forEach(this._tasks, function (task) {
	        if (!task.disabled) {
	          e.task = task;
	          task.update(e);
	        }
	      });
	      e.task = null;
	      e.phrase = RENDER_STATE_PHRASE_IDLE;
	    };

	    RenderGlobal.prototype.render = function render(e) {
	      e.phrase = RENDER_STATE_PHRASE_RENDER;
	      forEach(this._tasks, function (task) {
	        if (!task.disabled) {
	          e.task = task;
	          task.render(e);
	        }
	      });
	      e.task = null;
	      e.phrase = RENDER_STATE_PHRASE_IDLE;
	    };

	    RenderGlobal.prototype.invalid = function invalid() {
	      setInvalid(this, true);
	    };

	    RenderGlobal.prototype.createRenderState = function createRenderState() {
	      return new RenderState({ global: this });
	    };

	    RenderGlobal.prototype.applyRenderState = function applyRenderState(state) {
	      state.phrase = RENDER_STATE_PHRASE_APPLY;
	      this.applications.forEach(function (app) {
	        return app.applyRenderState(state);
	      });
	      state.phrase = RENDER_STATE_PHRASE_IDLE;
	    };

	    _createClass(RenderGlobal, [{
	      key: 'defaultTask',
	      get: function get() {
	        var taskName = this.defaultTaskName;
	        var task = this._tasks[taskName];
	        if (!task) {
	          this.add(task = new RenderTask({ name: taskName }));
	        }
	        return task;
	      }
	    }]);

	    return RenderGlobal;
	  }(EventEmitter);

	  function renderGlobal(model) {
	    var state = model.createRenderState();
	    model.emit(EVENT_FRAME_START, [state]);
	    model.update(state);
	    if (isInvalid(model)) {
	      model.emit(EVENT_RENDER_START, [state]);
	      model.render(state);
	      model.applyRenderState(state);
	      model.emit(EVENT_RENDER_END, [state]);
	      setInvalid(model, false);
	    }
	    model.emit(EVENT_FRAME_END, [state]);
	    state.dispose();
	  }

	  /**
	   * Created by brian on 18/11/2016.
	   */
	  function updateStyleSheetWithDiffResult(sheet, diff, ids) {
	    //replace
	    var nextIds = ids.slice();
	    forEach(diff.replace, function (style, id) {
	      var index = nextIds.indexOf(id);
	      if (index !== -1) {
	        sheet.deleteRule(index);
	        sheet.insertRule(style, index);
	      } else {
	        throw Error('replace id not found');
	      }
	    });
	    //add
	    forEach(diff.add, function (style, id) {
	      sheet.insertRule(style, nextIds.length);
	      if (!arrAdd(nextIds, id)) {
	        throw Error('add id fail');
	      }
	    });
	    //remove
	    forEach(diff.remove, function (id) {
	      var index = nextIds.indexOf(id);
	      if (arrRemove(nextIds, id)) {
	        sheet.deleteRule(index);
	      } else {
	        throw Error('remove id fail');
	      }
	    });
	    return nextIds;
	  }
	  function diffCSSResultMap(pre, next) {
	    var addMap = {};
	    var replaceMap = {};
	    var removeKeys = Object.getOwnPropertyNames(pre);
	    forEach(next, function (text, key) {
	      if (pre.hasOwnProperty(key)) {
	        if (pre[key] != text) {
	          replaceMap[key] = text;
	        }
	      } else {
	        addMap[key] = text;
	      }
	      arrRemove(removeKeys, key);
	    });
	    return {
	      add: addMap,
	      replace: replaceMap,
	      remove: removeKeys
	    };
	  }

	  /**
	   * Created by brian on 14/10/2016.
	   */
	  /**
	   * @memberOf Flip
	   */

	  var CSSRenderApplication = function (_RenderApplication) {
	    _inherits(CSSRenderApplication, _RenderApplication);

	    function CSSRenderApplication() {
	      _classCallCheck(this, CSSRenderApplication);

	      var _this7 = _possibleConstructorReturn(this, _RenderApplication.call(this));

	      _this7._persistElement = createElement('style', { 'data-flip': 'persist' });
	      _this7._frameElement = createElement('style', { 'data-flip': 'frame' });
	      _this7._lastCSSResult = {};
	      _this7._lastCSSIds = [];
	      _this7._persistIndies = [];
	      return _this7;
	    }

	    CSSRenderApplication.prototype.applyRenderState = function applyRenderState(state) {
	      var _this8 = this;

	      var diff = diffCSSResultMap(this._lastCSSResult, state.cssResults);
	      this._lastCSSIds = updateStyleSheetWithDiffResult(this._frameElement.sheet, diff, this._lastCSSIds);
	      this._lastCSSResult = objAssign({}, state.cssResults);
	      state.persistStyleTexts.forEach(function (text) {
	        return _this8.applyCSSText(text);
	      });
	    };

	    CSSRenderApplication.prototype.applyCSSText = function applyCSSText(cssText) {
	      var styleSheet = this._persistElement.sheet;
	      var index = -1;
	      var self = this;
	      if (isValidString(cssText)) {
	        var reusableIndies = this._persistIndies;
	        if (reusableIndies.length) {
	          index = reusableIndies.pop();
	          styleSheet.deleteRule(index);
	        } else {
	          index = styleSheet.cssRules.length;
	        }
	        index = reusableIndies.length ? reusableIndies.pop() : styleSheet.cssRules.length;
	        styleSheet.insertRule(cssText, index);
	      }
	      return function cancel() {
	        if (index > -1) {
	          styleSheet.deleteRule(index);
	          styleSheet.insertRule('*{}', index);
	          self._persistIndies.push(index);
	        }
	        self = styleSheet = null;
	      };
	    };

	    CSSRenderApplication.prototype.setupRenderState = function setupRenderState(state) {
	      state.cssResults = {};
	      state.persistStyleTexts = [];
	    };

	    CSSRenderApplication.prototype.renderGlobalInitialized = function renderGlobalInitialized(global) {
	      if (!this.elementAppended) {
	        var head = document.head;
	        head.appendChild(this._persistElement);
	        head.appendChild(this._frameElement);
	        this.elementAppended = true;
	      }
	    };

	    return CSSRenderApplication;
	  }(RenderApplication);

	  function isValidString(str) {
	    return str && typeof str === "string";
	  }

	  /**
	   * Created by brian on 16/11/2016.
	   */
	  /**
	   * @memberOf Flip
	   * @type {RenderGlobal}
	   */
	  var instance = new RenderGlobal();
	  var instanceCSSRenderApplication = new CSSRenderApplication();
	  instance.add(instanceCSSRenderApplication);

	  /**
	   * Created by brian on 8/28/16.
	   */
	  /**
	   * from jQuery.easing
	   * @memberof Flip
	   * @readonly
	   * @public
	   * @enum {EasingFunction}
	   * @property {EasingFunction} linear
	   * @property {EasingFunction} zeroStep
	   * @property {EasingFunction} halfStep
	   * @property {EasingFunction} oneStep
	   * @property {EasingFunction} random
	   * @property {EasingFunction} randomLimit
	   * @property {EasingFunction} backOut
	   * @property {EasingFunction} backIn
	   * @property {EasingFunction} backInOut
	   * @property {EasingFunction} cubicOut
	   * @property {EasingFunction} cubicIn
	   * @property {EasingFunction} cubicInOut
	   * @property {EasingFunction} expoOut
	   * @property {EasingFunction} expoIn
	   * @property {EasingFunction} expoInOut
	   * @property {EasingFunction} circOut
	   * @property {EasingFunction} circIn
	   * @property {EasingFunction} circInOut
	   * @property {EasingFunction} sineOut
	   * @property {EasingFunction} sineIn
	   * @property {EasingFunction} sineInOut
	   * @property {EasingFunction} bounceOut
	   * @property {EasingFunction} bounceIn
	   * @property {EasingFunction} bounceInOut
	   * @property {EasingFunction} elasticOut
	   * @property {EasingFunction} elasticIn
	   * @property {EasingFunction} elasticInOut
	   * @property {EasingFunction} quintOut
	   * @property {EasingFunction} quintIn
	   * @property {EasingFunction} quintInOut
	   * @property {EasingFunction} quartOut
	   * @property {EasingFunction} quartIn
	   * @property {EasingFunction} quartInOut
	   * @property {EasingFunction} quadOut
	   * @property {EasingFunction} quadIn
	   * @property {EasingFunction} quadInOut
	   */
	  var EASE = {
	    linear: function linear(t) {
	      return t;
	    },
	    zeroStep: function zeroStep(t) {
	      return t <= 0 ? 0 : 1;
	    },
	    halfStep: function halfStep(t) {
	      return t < .5 ? 0 : 1;
	    },
	    oneStep: function oneStep(t) {
	      return t >= 1 ? 1 : 0;
	    },
	    random: function random() {
	      return Math.random();
	    },
	    randomLimit: function randomLimit(t) {
	      return Math.random() * t;
	    }
	  };
	  var pow = Math.pow;
	  var PI = Math.PI;
	  var IN_OUT_FUNCS = {
	    back: function back(t) {
	      return t * t * (3 * t - 2);
	    },
	    elastic: function elastic(t) {
	      return t === 0 || t === 1 ? t : -pow(2, 8 * (t - 1)) * Math.sin(((t - 1) * 80 - 7.5) * PI / 15);
	    },
	    sine: function sine(t) {
	      return 1 - Math.cos(t * PI / 2);
	    },
	    circ: function circ(t) {
	      return 1 - Math.sqrt(1 - t * t);
	    },
	    cubic: function cubic(t) {
	      return t * t * t;
	    },
	    expo: function expo(t) {
	      return t == 0 ? 0 : pow(2, 10 * (t - 1));
	    },
	    quad: function quad(t) {
	      return t * t;
	    },
	    quart: function quart(t) {
	      return pow(t, 4);
	    },
	    quint: function quint(t) {
	      return pow(t, 5);
	    },
	    bounce: function bounce(t) {
	      var pow2,
	          bounce = 4;
	      while (t < ((pow2 = pow(2, --bounce)) - 1) / 11) {}
	      return 1 / pow(4, 3 - bounce) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2);
	    }
	  };
	  forEach(IN_OUT_FUNCS, function (func, name) {
	    var easeIn = func;
	    EASE[name + 'In'] = easeIn;
	    EASE[name + 'Out'] = function (t) {
	      return 1 - easeIn(1 - t);
	    };
	    EASE[name + 'InOut'] = function (t) {
	      return t < 0.5 ? easeIn(t * 2) / 2 : 1 - easeIn(t * -2 + 2) / 2;
	    };
	  });

	  /**
	   * Created by brian on 8/28/16.
	   */
	  /**
	   * @memberOf Flip
	   * @type {number}
	   */
	  var CLOCK_STATUS_IDLE = 0;
	  var CLOCK_STATUS_PAUSED = 1;
	  var CLOCK_STATUS_ACTIVE = 2;
	  var CLOCK_STATUS_DELAYING = 3;
	  var CLOCK_STATUS_HOLDING = 4;
	  var CLOCK_STATUS_ENDED = 5;
	  var CLOCK_STATUS_UNKNOWN = 6;
	  var CLOCK_STATUS_STARTED = 7;
	  var CLOCK_STATUS_CANCELED = 8;

	  var Clock = function (_EventEmitter4) {
	    _inherits(Clock, _EventEmitter4);

	    function Clock(arg) {
	      _classCallCheck(this, Clock);

	      var _this9 = _possibleConstructorReturn(this, _EventEmitter4.call(this));

	      var options = makeOptions(arg, DEFAULT_CLOCK_CONSTRUCTOR);
	      clonePropertiesFrom(_this9, options);
	      _this9.reset();
	      return _this9;
	    }

	    Clock.prototype.start = function start() {
	      if (this._status == CLOCK_STATUS_IDLE) {
	        this._status = CLOCK_STATUS_STARTED;
	        return true;
	      }
	      return false;
	    };

	    Clock.prototype.restart = function restart() {
	      return this.reset().start();
	    };

	    Clock.prototype.reset = function reset() {
	      this._status = CLOCK_STATUS_IDLE;
	      this.d = 1;
	      this.i = this.iteration;
	      this.current = this._endTime = this._initTime = this._activeTime = this._startTime = this._holdTime = this._pausedTime = 0;
	      return this;
	    };

	    Clock.prototype.pause = function pause() {
	      if (this._status !== CLOCK_STATUS_PAUSED) {
	        this._lastStatus = this._status;
	        this._status = CLOCK_STATUS_PAUSED;
	        this._pausedTime = 0;
	        this.triggerEventWithDelegate(EVENT_PAUSE);
	        return true;
	      }
	      return false;
	    };

	    Clock.prototype.resume = function resume() {
	      if (this._status == CLOCK_STATUS_PAUSED) {
	        this._status = this._lastStatus;
	        this._lastStatus = CLOCK_STATUS_PAUSED;
	        this.triggerEventWithDelegate(EVENT_RESUME);
	        return true;
	      }
	      return false;
	    };

	    Clock.prototype.cancel = function cancel() {
	      if (this._status !== CLOCK_STATUS_CANCELED) {
	        this._status = CLOCK_STATUS_CANCELED;
	        this.triggerEventWithDelegate(EVENT_CANCEL);
	        return true;
	      }
	      return false;
	    };

	    Clock.prototype.dispose = function dispose() {
	      this.off();
	    };

	    Clock.prototype.update = function update(state) {
	      var status = this._status;
	      if (status == CLOCK_STATUS_CANCELED || status == CLOCK_STATUS_ENDED) {
	        return state.willDisposeClock(this);
	      } else {
	        return _updateClock(this, state);
	      }
	    };

	    Clock.prototype.triggerEventWithDelegate = function triggerEventWithDelegate(event, e) {
	      this.emit(event, [e]);
	      if (this.delegate) {
	        var func = this.delegate['onClock' + capitalizeString(event)];
	        if (isFunc(func)) {
	          func.apply(this.delegate, [this, e]);
	        }
	      }
	    };

	    _createClass(Clock, [{
	      key: 'started',
	      get: function get() {
	        return this._startTime !== -1;
	      }
	    }, {
	      key: 'paused',
	      get: function get() {
	        return this._status == CLOCK_STATUS_PAUSED;
	      }
	    }, {
	      key: 'reversing',
	      get: function get() {
	        return this.d == 0;
	      }
	    }]);

	    return Clock;
	  }(EventEmitter);

	  function _updateClock(clock, state) {
	    var timeLine = state.timeLine,
	        now = timeLine.now,
	        ot = clock._t;
	    switch (clock._status) {
	      case CLOCK_STATUS_STARTED:
	        clock._initTime = now;
	        clock._status = CLOCK_STATUS_DELAYING;
	        clock.current = 0;
	        clock.triggerEventWithDelegate(EVENT_INIT, state);
	        _updateClock(clock, state);
	        return true;
	      case CLOCK_STATUS_DELAYING:
	        if (now >= clock._initTime + clock._pausedTime + clock.delay * timeLine.ticksPerSecond) {
	          clock._status = CLOCK_STATUS_ACTIVE;
	          clock._activeTime = clock._startTime = now;
	          clock.current = 0;
	          clock.triggerEventWithDelegate(EVENT_START, state);
	          if (!clock.paused) {
	            _updateClock(clock, state);
	          }
	          return true;
	        }
	        return false;
	      case CLOCK_STATUS_PAUSED:
	        if (clock._lastStatus == CLOCK_STATUS_HOLDING) {
	          clock._holdTime += timeLine.advancedTimeInterval;
	        } else {
	          clock._pausedTime += timeLine.advancedTimeInterval;
	        }
	        return false;
	      case CLOCK_STATUS_ACTIVE:
	        var dur = (now - clock._activeTime - clock._pausedTime) / timeLine.ticksPerSecond;
	        var t = clock.d ? dur / clock.duration : 1 - dur / clock.duration;
	        if (ot === t) {
	          return false;
	        }
	        clock.current = clock.ease(clock._t = clamp(0, 1, t));
	        clock.triggerEventWithDelegate(EVENT_UPDATE, state);
	        if (!clock.silent) {
	          state.task.invalid();
	        }
	        if (t > 1 || t < 0) {
	          clock._status = CLOCK_STATUS_UNKNOWN;
	          _updateClock(clock, state);
	        }
	        return true;
	      case CLOCK_STATUS_UNKNOWN:
	        if (ot >= 1) {
	          if (clock.reverse) {
	            clock.d = 0;
	            reactiveClock(clock, now);
	            clock.triggerEventWithDelegate(EVENT_REVERSE, state);
	          } else {
	            return iterateClock(clock, now, state);
	          }
	        } else if (clock.reverse) {
	          clock.d = 1;
	          return iterateClock(clock, now, state);
	        } else {
	          throw Error('impossible state t=0,autoReverse=false');
	        }
	        return false;
	      case CLOCK_STATUS_HOLDING:
	        if (now >= clock._holdTime + clock.hold * timeLine.ticksPerSecond) {
	          clock._status = CLOCK_STATUS_ENDED;
	          clock._endTime = now;
	          state.willDisposeClock(clock);
	          clock.triggerEventWithDelegate(EVENT_END, state);
	          return true;
	        }
	        return false;
	      default:
	        return false;
	    }
	  }
	  function iterateClock(clock, now, state) {
	    if (clock.i > 1 || clock.infinite) {
	      clock.i--;
	      clock.current = 0;
	      reactiveClock(clock, now);
	      clock.triggerEventWithDelegate(EVENT_ITERATE, state);
	    } else {
	      clock.i = 0;
	      clock._holdTime = now;
	      clock._status = CLOCK_STATUS_HOLDING;
	      clock.triggerEventWithDelegate(EVENT_HOLD, state);
	      return _updateClock(clock, state) || true;
	    }
	  }
	  function reactiveClock(clock, now) {
	    clock._status = CLOCK_STATUS_ACTIVE;
	    clock._activeTime = now;
	  }
	  var DEFAULT_CLOCK_CONSTRUCTOR = Object.freeze({
	    duration: 1,
	    ease: EASE.linear,
	    infinite: false,
	    iteration: 1,
	    silent: true,
	    reverse: false,
	    delay: 0,
	    hold: 0,
	    delegate: 0
	  });
	  function clamp(min, max, val) {
	    if (val < min) {
	      return min;
	    } else if (val > max) {
	      return max;
	    }
	    return val;
	  }

	  /**
	   * Created by 柏子 on 2015/1/29.
	   */
	  var syncEnqueue = false;
	  function enqueue(callback) {
	    syncEnqueue ? callback() : setTimeout(callback, 0);
	  }
	  function Thenable(opt) {
	    if (!(this instanceof Thenable)) {
	      return new Thenable(opt);
	    }
	    this.then = opt.then;
	    this.get = opt.get;
	  }
	  function waitAnimation(something) {
	    if (something instanceof Animation) {
	      return something.promise;
	    } else if (something instanceof Array) {
	      var animations = [];
	      if (something.every(function (obj) {
	        if (obj instanceof Animation) {
	          animations.push(obj.promise);
	          return true;
	        }
	      })) {
	        return promiseAll(animations);
	      }
	    }
	    return something;
	  }
	  function resolvePromise(future) {
	    if (likePromise(future)) {
	      return future;
	    }
	    return new Thenable({
	      then: function resolved(callback) {
	        try {
	          return resolvePromise(waitAnimation(callback(future)));
	        } catch (ex) {
	          return rejectPromise(ex);
	        }
	      },
	      get: function get(proName) {
	        return proName ? future[proName] : future;
	      }
	    });
	  }
	  function rejectPromise(reason) {
	    if (likePromise(reason)) {
	      return reason;
	    }
	    return new Thenable({
	      then: function rejected(callback, errorback) {
	        try {
	          return resolvePromise(errorback(reason));
	        } catch (ex) {
	          return rejectPromise(ex);
	        }
	      },
	      get: function get(pro) {
	        return pro ? reason[pro] : reason;
	      }
	    });
	  }

	  /**
	   * @memberOf Flip
	   * @param {function} resolver
	   * @returns {Thenable}
	   * @constructor
	   */
	  function Promise(resolver) {
	    if (!(this instanceof Promise)) {
	      return new Promise(resolver);
	    }
	    var resolvedPromise = void 0,
	        pending = [],
	        ahead = [],
	        resolved = void 0;
	    if (typeof resolver === "function") {
	      resolver(resolve, reject);
	    } else {
	      throw Error('Promise resolver undefined is not a function');
	    }
	    function resolve(future) {
	      try {
	        receive(future);
	      } catch (ex) {
	        receive(undefined, ex);
	      }
	    }

	    function reject(reason) {
	      receive(undefined, reason || new Error(''));
	    }

	    function receive(future, reason) {
	      if (!resolved) {
	        resolvedPromise = reason == undefined ? resolvePromise(future) : rejectPromise(reason);
	        resolved = true;
	        for (var i = 0, len = pending.length; i < len; i++) {
	          enqueue(function (args, con) {
	            return function () {
	              var ret = resolvedPromise.then.apply(resolvedPromise, args);
	              if (con) {
	                ret.then.apply(ret, con);
	              }
	            };
	          }(pending[i], ahead[i]));
	        }
	        pending = ahead = undefined;
	      }
	    }

	    function next(resolve, reject) {
	      ahead.push([resolve, reject]);
	    }

	    return new Thenable({
	      then: function then(thenable, errorBack) {
	        var handler = [ensureThenable(thenable, function (v) {
	          return v;
	        }), ensureThenable(errorBack, function (e) {
	          throw e;
	        })];
	        if (resolvedPromise) {
	          return warpPromiseValue(resolvedPromise.then.apply(resolvedPromise, handler));
	        } else {
	          pending.push(handler);
	          return new Promise(function (resolve, reject) {
	            next(resolve, reject);
	          });
	        }
	      },
	      get: function get(proname) {
	        return resolvedPromise ? resolvedPromise.get(proname) : undefined;
	      }
	    });
	  }
	  function ensureThenable(obj, def) {
	    var t = void 0;
	    if ((t = typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object") {
	      return function () {
	        return obj;
	      };
	    } else if (t === "function") {
	      return obj;
	    }
	    return def;
	  }
	  function likePromise(obj) {
	    return obj instanceof Thenable || isObj(obj) && isFunc(obj.then) && !(obj instanceof Animation);
	  }
	  function promiseRace(promises) {
	    return new Promise(function (_res, _rej) {
	      var hasResult = void 0;
	      promises.forEach(function (promise) {
	        promise.then(resolve, reject);
	      });
	      function resolve(e) {
	        if (!hasResult) {
	          _res(e);
	          hasResult = true;
	        }
	      }

	      function reject(e) {
	        if (!hasResult) {
	          _rej(e);
	          hasResult = true;
	        }
	      }
	    });
	  }
	  function promiseAll(promises) {
	    return new Promise(function (resolve, reject) {
	      var fail = void 0,
	          num = void 0,
	          r = new Array(num = promises.length);
	      if (!promises.length) {
	        return resolve(r);
	      }
	      promises.forEach(function (promise, i) {
	        promise.then(function (pre) {
	          check(pre, i);
	        }, function (err) {
	          check(err, i, true);
	        });
	      });
	      function check(value, i, error) {
	        r[i] = value;
	        if (error) {
	          fail = true;
	        }
	        if (num == 1) {
	          fail ? reject(r) : resolve(r);
	        } else {
	          num--;
	        }
	      }
	    });
	  }
	  /**
	   * @memberOf Flip.Promise
	   * @param {Array<Flip.Promise>}
	   * @returns {Flip.Promise}
	   */
	  Promise.race = promiseRace;
	  /**
	   * continue when all promises finished
	   * @memberof Flip.Promise
	   * @param {Array<Flip.Promise>}
	   * @returns Flip.Promise
	   */
	  Promise.all = promiseAll;
	  /**
	   * @memberof Flip.Promise
	   * @returns {{resolve:function,reject:function,promise:Flip.Promise}}
	   */
	  Promise.defer = function () {
	    var defer = {};
	    defer.promise = new Promise(function (resolver, rejector) {
	      defer.resolve = resolver;
	      defer.reject = rejector;
	    });
	    return defer;
	  };
	  Promise.resolve = function (any) {
	    return any && isFunc(any.then) ? digestThenable(any) : warpPromiseValue(any);
	  };
	  Promise.reject = function (reason) {
	    return Promise(function (resolve, reject) {
	      reject(reason);
	    });
	  };
	  Promise.digest = digestThenable;
	  Promise.option = function (opt) {
	    if (opt) {
	      syncEnqueue = !!opt.sync;
	    }
	  };

	  function digestThenable(thenable) {
	    return Promise(function (resolve, reject) {
	      thenable.then(resolve, reject);
	    });
	  }

	  function warpPromiseValue(any) {
	    return Promise(function (resolve) {
	      resolve(any);
	    });
	  }

	  var RenderUtil = function () {
	    function RenderUtil() {
	      _classCallCheck(this, RenderUtil);
	    }

	    RenderUtil.prototype.renderWithAnimation = function renderWithAnimation(animation, e) {};

	    RenderUtil.prototype.updateWithAnimation = function updateWithAnimation(animation, e) {};

	    return RenderUtil;
	  }(); /**
	        * Created by brian on 17/10/2016.
	        */

	  var ANIMATION_FILL_MODE_REMOVE = 'remove';
	  var ANIMATION_FILL_MODE_KEEP = 'keep';

	  /**
	   * @alias Flip.Animation
	   */

	  var Animation = function (_Render2) {
	    _inherits(Animation, _Render2);

	    function Animation(options) {
	      _classCallCheck(this, Animation);

	      var _this10 = _possibleConstructorReturn(this, _Render2.call(this));

	      var clock = _this10._clock = new Clock(makeOptions(options, DEFAULT_CLOCK_CONSTRUCTOR));
	      clock.delegate = _this10;
	      _this10.fillMode = options.fillMode || ANIMATION_FILL_MODE_REMOVE;
	      _this10._paramCallbacks = {};
	      _this10.params = {};
	      _this10.renderUtils = [];
	      _this10.init();
	      _this10.configOptions(options);
	      return _this10;
	    }

	    Animation.prototype.configOptions = function configOptions(options) {
	      var _this11 = this;

	      this.setVariables(options.variables);
	      this.setDelegateHandlers(options);
	      forEach(options.once, function (func, evt) {
	        return _this11.once(evt, func, true);
	      });
	      forEach(options.on, function (func, evt) {
	        return _this11.on(evt, func);
	      });
	    };

	    Animation.prototype.init = function init() {
	      this._ended = this._canceled = false;
	      return this.invalid();
	    };

	    Animation.prototype.start = function start() {
	      return this.clock.start();
	    };

	    Animation.prototype.pause = function pause() {
	      return this.clock.pause();
	    };

	    Animation.prototype.resume = function resume() {
	      return this.clock.resume();
	    };

	    Animation.prototype.cancel = function cancel() {
	      if (!this.canceled) {
	        this._canceled = true;
	        this.removeFromParent();
	        this.emit(EVENT_CANCEL);
	        if (this._deferred) {
	          this._deferred.reject(this);
	        }
	        return true;
	      }
	      return false;
	    };

	    Animation.prototype.onClockUpdate = function onClockUpdate(clock, e) {
	      this.params = this.updateVariable(clock.current);
	      this.invalid();
	      this.emit(EVENT_UPDATE, [e, this]);
	    };

	    Animation.prototype.onClockEnd = function onClockEnd(clock, e) {
	      if (this.fillMode == ANIMATION_FILL_MODE_REMOVE) {
	        this.removeFromParent(true);
	      }
	      if (this._deferred) {
	        this._deferred.resolve(this);
	      }
	      this.emit(EVENT_END, [e, this]);
	    };

	    Animation.prototype.updateVariable = function updateVariable(percent) {
	      var _this12 = this;

	      var ret = {};
	      if (isNaN(percent)) {
	        percent = this.percent;
	      }
	      forEach(this._paramCallbacks, function (func, key) {
	        return ret[key] = func.call(_this12, percent);
	      });
	      return ret;
	    };

	    Animation.prototype.setDelegateHandlers = function setDelegateHandlers(map) {
	      var _this13 = this;

	      forEach(map, function (func, key) {
	        return ANIMATION_HANDLER_NAMES.indexOf(key) > -1 && _this13.setDelegateHandler(key, func);
	      });
	      return this;
	    };

	    Animation.prototype.setDelegateHandler = function setDelegateHandler(name, handler) {
	      var delegateMethodName = /^on/.test(name) ? name : 'on' + capitalizeString(name);
	      if (ANIMATION_HANDLER_NAMES.indexOf(name) > -1) {
	        var evtName = name.replace(/^on/, '').toLowerCase();
	        this.on(evtName, handler);
	      } else if (IS_DEV_ENV) {
	        console.warn('Animation delegate name:' + delegateMethodName + ' is not added');
	      }
	      return false;
	    };

	    Animation.prototype.update = function update(e) {
	      var _this14 = this;

	      _Render2.prototype.update.call(this, e);
	      this.clock.update(e);
	      this.renderUtils.forEach(function (c) {
	        return c.updateWithAnimation(_this14, e);
	      });
	    };

	    Animation.prototype.addRenderUtil = function addRenderUtil(util) {
	      if (util instanceof RenderUtil) {
	        if (arrAdd(this.renderUtils, util)) {
	          this.invalid();
	          return true;
	        }
	      }
	    };

	    Animation.prototype.render = function render(e) {
	      var _this15 = this;

	      _Render2.prototype.render.call(this, e);
	      forEach(this.renderUtils, function (util) {
	        return util.renderWithAnimation(_this15, e);
	      });
	    };

	    Animation.prototype.dispose = function dispose(e) {
	      _Render2.prototype.dispose.call(this, e);
	      this.off();
	      this.clock.dispose();
	    };

	    Animation.prototype.setVariables = function setVariables(map) {
	      var _this16 = this;

	      forEach(map, function (val, key) {
	        return _this16.setVariable(key, val);
	      });
	      return this;
	    };

	    Animation.prototype.setVariable = function setVariable(key, value) {
	      var range = void 0;
	      if (!isNaN(value)) {
	        range = function range() {
	          return +value;
	        };
	      } else if (value instanceof Array) {
	        var min = +value[0],
	            dis = +value[1] - min;
	        range = function range(p) {
	          return min + dis * p;
	        };
	      } else if (isFunc(value)) {
	        range = value;
	      } else {
	        throw Error('value should be number or function');
	      }
	      this._paramCallbacks[key] = range;
	      return this;
	    };

	    Animation.prototype.isClock = function isClock(status) {
	      return this.clock._status == status;
	    };

	    _createClass(Animation, [{
	      key: 'promise',
	      get: function get() {
	        if (!this._deferred) {
	          this._deferred = Promise.defer();
	        }
	        return this._deferred.promise;
	      }
	    }]);

	    return Animation;
	  }(Render);

	  Object.defineProperties(Animation.prototype, {
	    clock: {
	      get: function get() {
	        return this._clock;
	      }
	    },
	    percent: {
	      get: function get() {
	        return this._clock.current || 0;
	      }
	    },
	    canceled: {
	      get: function get() {
	        return this._canceled;
	      }
	    },
	    ended: {
	      get: function get() {
	        return this.clock._status == CLOCK_STATUS_ENDED;
	      }
	    }
	  });
	  var ANIMATION_HANDLER_NAMES = ['onUpdate', 'onEnd'];
	  [['Init', EVENT_INIT], ['Iterate', EVENT_ITERATE], ['Reverse', EVENT_REVERSE], ['Start', EVENT_START], ['Hold', EVENT_HOLD], ['Pause', EVENT_PAUSE], ['Resume', EVENT_RESUME]].forEach(function (_ref2) {
	    var _ref3 = _slicedToArray(_ref2, 2),
	        methodName = _ref3[0],
	        evtName = _ref3[1];

	    var delegateMethodName = 'on' + methodName;
	    Animation.prototype['onClock' + methodName] = function triggerEvent(clock, e) {
	      this.emit(evtName, [e, this]);
	    };
	    ANIMATION_HANDLER_NAMES.push(delegateMethodName);
	  });

	  /**
	   * Created by brian on 16/10/2016.
	   */
	  var defaultPrefixes = void 0;
	  var cssPrivateKeyPrefix = '$$';
	  var cssPropertyKeys = void 0;
	  var cssPrivateKeys = [];

	  var CSSProxy = function () {
	    function CSSProxy(source) {
	      _classCallCheck(this, CSSProxy);

	      this.$merge(source);
	      this.$invalid = true;
	    }

	    CSSProxy.prototype.$withPrefix = function $withPrefix(key, value, prefixes) {
	      var _this17 = this;

	      (prefixes || defaultPrefixes).forEach(function (prefix) {
	        return _this17[normalizeCSSKey(prefix + key)] = value;
	      });
	      return this;
	    };

	    CSSProxy.prototype.$merge = function $merge(obj) {
	      var _this18 = this;

	      if (isObj(obj) && obj !== this) {
	        forEach(obj, function (value, key) {
	          return _this18[key] = value;
	        });
	      }
	      return this;
	    };

	    CSSProxy.prototype.$styleText = function $styleText(selector, separator) {
	      return combineStyleText(selector, this.$toCachedCssString(separator));
	    };

	    CSSProxy.prototype.$toCachedCssString = function $toCachedCssString(reset) {
	      if (this.$invalid) {
	        this.$cachedCssString = this.$toSafeCssString();
	        this.$invalid = !!reset;
	      }
	      return this.$cachedCssString;
	    };

	    CSSProxy.prototype.$toSafeCssString = function $toSafeCssString(separator) {
	      var rules = [];
	      forEach(this, function (val, key) {
	        var i = cssPrivateKeys.indexOf(key);
	        if (i > -1 && val !== void 0) {
	          rules.push(cssPropertyKeys[i] + ':' + formatNum(val));
	        }
	      });
	      return rules.join(';' + (separator || ''));
	    };

	    CSSProxy.prototype.toString = function toString() {
	      return this.$toSafeCssString();
	    };

	    return CSSProxy;
	  }();

	  function combineStyleText(selector, body) {
	    return selector + '{' + body + '}';
	  }
	  function normalizeCSSKey(cssKey) {
	    return cssKey.replace(/^-/, '').replace(/-([a-z])/g, function (str, char) {
	      return char.toUpperCase();
	    });
	  }
	  (function () {
	    if (isFunc(window.CSS2Properties)) {
	      cssPropertyKeys = Object.getOwnPropertyNames(CSS2Properties.prototype).filter(function (key) {
	        return key.indexOf('-') == -1;
	      });
	    } else {
	      cssPropertyKeys = Object.getOwnPropertyNames(document.documentElement.style);
	    }
	    cssPropertyKeys = cssPropertyKeys.map(function (key) {
	      var privateKey = cssPrivateKeyPrefix + key,
	          capitalizedKey = capitalizeString(key),
	          camelKey = key[0].toLowerCase() + key.substring(1),
	          lowerCaseKey = toLowerCssKey(key);
	      cssPrivateKeys.push(privateKey);
	      registerProperty(CSSProxy.prototype, [key, lowerCaseKey, capitalizedKey, camelKey], {
	        get: getter,
	        set: setter
	      });
	      function getter() {
	        return this[privateKey];
	      }

	      function setter(val) {
	        var v = castInvalidValue(val);
	        if (v != this[privateKey]) {
	          this.$invalid = true;
	          this[privateKey] = v;
	        }
	      }

	      return lowerCaseKey;
	    });
	    defaultPrefixes = ['-moz-', '-ms-', '-webkit-', '-o-', ''].filter(function (prefix) {
	      var key = prefix.replace(/^-/, '');
	      return cssPropertyKeys.some(function (proKey) {
	        return proKey.indexOf(key) == 0 || proKey.indexOf(prefix) == 0;
	      });
	    });
	    CSSProxy.prototype.$template = stringTemplate;
	    function castInvalidValue(val) {
	      var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
	      return type == 'string' || type == 'number' ? val : void 0;
	    }

	    function registerProperty(target, keys, define) {
	      keys.forEach(function (key) {
	        Object.defineProperty(target, key, define);
	      });
	    }

	    function toLowerCssKey(key) {
	      var prefix = /^(webkit|moz|o|ms)[A-Z]/.test(key) ? '-' : '';
	      return prefix + key.replace(/[A-Z]/g, function (str) {
	        return '-' + str.toLowerCase();
	      });
	    }
	  })();

	  /**
	   * Created by brian on 14/10/2016.
	   */
	  /**
	   * @memberOf Flip
	   */

	  var Mat3 = function () {
	    function Mat3(arrayOrX1, y1, dx, x2, y2, dy) {
	      _classCallCheck(this, Mat3);

	      var eles;
	      if (arrayOrX1 == undefined) {
	        eles = [1, 0, 0, 0, 1, 0, 0, 0, 1];
	      } else if (y1 == undefined) {
	        eles = arrayOrX1;
	      } else {
	        eles = [arrayOrX1, y1, 0, x2, y2, dx, dy, 1];
	      }
	      this.elements = new Float32Array(eles);
	    }

	    Mat3.prototype.clone = function clone() {
	      return new Mat3(this.elements);
	    };

	    Mat3.prototype.translate = function translate(x, y, z) {
	      return multiplyMat(this, [1, 0, 0, 0, 1, 0, x || 0, y || 0, defaultIfNaN(z, 1)]);
	    };

	    Mat3.prototype.flip = function flip(angle, horizontal, ratio) {
	      var sinA = sin(angle),
	          cosA = cos(angle);
	      ratio = ratio || .6;
	      return multiplyMat(this, horizontal ? [1, 0, 0, -sinA * ratio, cosA, 0, 0, 0, 1] : [cosA, sinA * ratio, 0, 0, 1, 0, 0, 0, 1]);
	    };

	    Mat3.prototype.rotate = function rotate(angle) {
	      return this.rotateZ(angle);
	    };

	    Mat3.prototype.rotateX = function rotateX(angle) {
	      var sina = sin(angle),
	          cosa = cos(angle);
	      return multiplyMat(this, [1, 0, 0, 0, cosa, sina, 0, -sina, cosa]);
	    };

	    Mat3.prototype.rotateY = function rotateY(angle) {
	      var sina = sin(angle),
	          cosa = cos(angle);
	      return multiplyMat(this, [cosa, 0, -sina, 0, 1, 0, sina, 0, cosa]);
	    };

	    Mat3.prototype.rotateZ = function rotateZ(angle) {
	      var sina = sin(angle),
	          cosa = cos(angle);
	      return multiplyMat(this, [cosa, sina, 0, -sina, cosa, 0, 0, 0, 1]);
	    };

	    Mat3.prototype.transform = function transform(m11, m12, m21, m22, dx, dy) {
	      return multiplyMat(this, [m11, m21, 0, m12, m22, 0, dx || 0, dy || 0, 1]);
	    };

	    Mat3.prototype.skew = function skew(angle) {
	      return multiplyMat(this, [1, tan(angle), 0, tan(angle || 0), 1, 0, 0, 0, 1]);
	    };

	    Mat3.prototype.scale = function scale(x, y) {
	      return multiplyMat(this, [defaultIfNaN(x, 1), 0, 0, 0, defaultIfNaN(y, 1), 0, 0, 0, 1]);
	    };

	    Mat3.prototype.print = function print() {
	      var e = this.elements,
	          ret = [];
	      for (var i = 0; i < 3; i++) {
	        for (var j = 0; j < 3; j++) {
	          ret.push(e[j + i * 3].toFixed(2));
	        }ret.push('\n');
	      }
	      return ret.join(' ');
	    };

	    Mat3.prototype.setElement = function setElement(col, row, value) {
	      this.elements[col * 3 + row] = value;
	      return this;
	    };

	    Mat3.prototype.obliqueProject = function obliqueProject(rV, rH) {
	      rH = rH || 0;
	      rV = rV || 0;
	      var s = 1 / tan(rV),
	          sSin = sin(rH) * s,
	          sCos = cos(rH) * s;
	      return multiplyMat(this, [1, 0, 0, 0, 1, 0, sCos, sSin, 0], 1);
	    };

	    Mat3.prototype.applyContext2D = function applyContext2D(ctx) {
	      var eles = this.elements;
	      ctx.transform(eles[0], eles[1], eles[2], eles[3], eles[4], eles[5]);
	      return this;
	    };

	    Mat3.prototype.toString = function toString() {
	      return 'matrix(' + map2DArray(this.elements).join(',') + ')';
	    };

	    Mat3.prototype.axonProject = function axonProject(rotationX, rotationY) {
	      rotationX = rotationX || 0;
	      rotationY = rotationY || 0;
	      var cosX = cos(rotationX),
	          sinX = sin(rotationX),
	          cosY = cos(rotationY),
	          sinY = sin(rotationY);
	      return multiplyMat(this, [cosY, sinX * sinY, 0, 0, cosX, 0, sinY, -cosY * sinX, 0], 1);
	    };

	    Mat3.prototype.concat = function concat(matOrArray) {
	      var other = matOrArray instanceof Mat3 ? matOrArray.elements : matOrArray;
	      return multiplyMat(this, other);
	    };

	    return Mat3;
	  }();

	  function multiplyMat(mat, other, reverse) {
	    var a = other,
	        b = mat.elements,
	        out = b;
	    if (reverse) {
	      b = other;
	      a = out = mat.elements;
	    } else {
	      a = other;
	      b = out = mat.elements;
	    }
	    var a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a10 = a[3],
	        a11 = a[4],
	        a12 = a[5],
	        a20 = a[6],
	        a21 = a[7],
	        a22 = a[8],
	        b00 = b[0],
	        b01 = b[1],
	        b02 = b[2],
	        b10 = b[3],
	        b11 = b[4],
	        b12 = b[5],
	        b20 = b[6],
	        b21 = b[7],
	        b22 = b[8];

	    out[0] = a00 * b00 + a01 * b10 + a02 * b20;
	    out[1] = a00 * b01 + a01 * b11 + a02 * b21;
	    out[2] = a00 * b02 + a01 * b12 + a02 * b22;

	    out[3] = a10 * b00 + a11 * b10 + a12 * b20;
	    out[4] = a10 * b01 + a11 * b11 + a12 * b21;
	    out[5] = a10 * b02 + a11 * b12 + a12 * b22;

	    out[6] = a20 * b00 + a21 * b10 + a22 * b20;
	    out[7] = a20 * b01 + a21 * b11 + a22 * b21;
	    out[8] = a20 * b02 + a21 * b12 + a22 * b22;
	    return mat;
	  }
	  var sin = Math.sin;
	  var cos = Math.cos;
	  var tan = Math.tan;
	  var MAP_SEQ = [0, 1, 3, 4, 6, 7];
	  function map2DArray(eles) {
	    return MAP_SEQ.map(function (i) {
	      return getFloat(eles[i]);
	    });
	  }
	  function getFloat(d) {
	    return (+d).toFixed(5);
	  }
	  function defaultIfNaN(v, def) {
	    var ret = +v;
	    return isNaN(ret) ? def : ret;
	  }

	  /**
	   * Created by brian on 14/10/2016.
	   */
	  /**
	   * @memberOf Flip
	   */

	  var CSSRenderUtil = function (_RenderUtil) {
	    _inherits(CSSRenderUtil, _RenderUtil);

	    function CSSRenderUtil(_ref4) {
	      var selector = _ref4.selector,
	          id = _ref4.id;

	      _classCallCheck(this, CSSRenderUtil);

	      var _this19 = _possibleConstructorReturn(this, _RenderUtil.call(this));

	      _this19.selector = selector || '';
	      _this19.id = id || generateID();
	      _this19._cssCallbacks = [];
	      _this19._transformCallbacks = [];
	      _this19._lastCSSResult = Object.create(null);
	      return _this19;
	    }

	    CSSRenderUtil.prototype.renderWithAnimation = function renderWithAnimation(animation, renderState) {
	      var CSSResult = this._lastCSSResult = this.mapCSSResult(this.renderAnimationWithCSSRenderState(animation, renderState));
	      objAssign(renderState.cssResults, CSSResult);
	    };

	    CSSRenderUtil.prototype.mapCSSResult = function mapCSSResult(results) {
	      var ret = Object.create(null);
	      var id = this.id;
	      results.forEach(function (val, index) {
	        return ret[id + ':' + index] = val;
	      });
	      return ret;
	    };

	    CSSRenderUtil.prototype.updateWithAnimation = function updateWithAnimation(animation, e) {
	      if (this._lastCSSResult) {
	        objAssign(e.cssResults, this._lastCSSResult);
	      }
	    };

	    CSSRenderUtil.prototype.renderAnimationWithCSSRenderState = function renderAnimationWithCSSRenderState(animation, renderState) {
	      if (isObj(renderState.cssResults)) {
	        return this.renderCSSResults(animation.params, animation);
	      } else {
	        throw Error('CSSResults property is missing,forget to set CSSRender application?');
	      }
	    };

	    CSSRenderUtil.prototype.renderCSSResults = function renderCSSResults(params, thisObj) {
	      var baseSel = this.selector;
	      var ret = [];
	      forEach(this._cssCallbacks, function (pair) {
	        var cssProxy = new CSSProxy();
	        var maybeResult = pair.callback.call(thisObj, cssProxy, params);
	        if (maybeResult !== cssProxy && isObj(maybeResult)) {
	          cssProxy.$merge(maybeResult);
	        }
	        addCSSText(baseSel, pair.selector, cssProxy, ret);
	      });
	      forEach(this._transformCallbacks, function (pair) {
	        var mat = new Mat3();
	        var maybeMat = pair.callback.call(thisObj, mat, params);
	        if (maybeMat instanceof Mat3) {
	          mat = maybeMat;
	        }
	        var cssProxy = new CSSProxy();
	        cssProxy.$withPrefix('transform', mat.toString());
	        addCSSText(baseSel, pair.selector, cssProxy, ret);
	      });
	      return ret;
	    };

	    CSSRenderUtil.prototype.transform = function transform(selector, func) {
	      var callback = void 0;
	      if (arguments.length == 1) {
	        func = selector;
	        selector = '';
	      }
	      if (func instanceof Mat3) {
	        callback = function callback() {
	          return func;
	        };
	      } else if (isFunc(func)) {
	        callback = func;
	      } else {
	        throw Error('transform callback type error');
	      }
	      if (callback) {
	        this._transformCallbacks.push({ selector: selector, callback: callback });
	      }
	      return this;
	    };

	    CSSRenderUtil.prototype.css = function css(selector, func) {
	      var callback = void 0;
	      if (arguments.length == 1) {
	        func = selector;
	        selector = '';
	      }
	      if (isObj(func)) {
	        callback = function callback(proxy) {
	          return proxy.$merge(func);
	        };
	      } else if (isFunc(func)) {
	        callback = func;
	      } else {
	        throw Error('css callback type error');
	      }
	      if (callback) {
	        this._cssCallbacks.push({ selector: selector, callback: callback });
	      }
	      return this;
	    };

	    return CSSRenderUtil;
	  }(RenderUtil);

	  CSSRenderUtil.prototype.type = 'CSSRenderUtil';
	  var seed = 1;
	  function generateID() {
	    return 'CSSUtil' + seed++;
	  }
	  function addCSSText(baseSel, childSel, cssProxy, target) {
	    var selector = childSel ? baseSel + ' ' + childSel.replace(/&/g, baseSel) : baseSel;
	    var CSSText = cssProxy.$styleText(selector);
	    if (CSSText && selector) {
	      if (target.indexOf(CSSText) == -1) {
	        target.push(CSSText);
	        return true;
	      }
	    }
	  }

	  /**
	   * Created by brian on 16/11/2016.
	   */
	  /**
	   * @memberOf Flip
	   * @param {AnimateOptions}options
	   * @returns {Animation}
	   */
	  function animate(options) {
	    var animation = new Animation(options);
	    if (!options.manualStart) {
	      animation.start();
	    }
	    var renderTask = options.renderTask || instance.defaultTask;
	    renderTask.addChild(animation);
	    if ('css' in options || 'transform' in options) {
	      var cssRenderUtils = new CSSRenderUtil({ selector: options.selector });
	      if (isFunc(options.css)) {
	        cssRenderUtils.css(options.css);
	      } else {
	        forEach(options.css, function (cb, selector) {
	          return cssRenderUtils.css(selector, cb);
	        });
	      }
	      if (isFunc(options.transform)) {
	        cssRenderUtils.transform(options.transform);
	      } else {
	        forEach(options.transform, function (cb, selector) {
	          return cssRenderUtils.transform(selector, cb);
	        });
	      }
	      animation.addRenderUtil(cssRenderUtils);
	    }

	    return animation;
	  }

	  /**
	   * Created by brian on 14/10/2016.
	   */

	  /**
	   * Created by brian on 17/11/2016.
	   */

	  /**
	   * Created by brian on 8/21/16.
	   */
	  var readyFuncs = [];

	  function Flip(arg) {
	    if (isFunc(arg)) {
	      if (readyFuncs) {
	        readyFuncs.push(arg);
	      } else {
	        arg(Flip);
	      }
	    } else if (isObj(arg)) {
	      animate(arg);
	    }
	  }

	  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === "object") {
	    if (document.readyState !== 'loading') {
	      setTimeout(ready, 0);
	    }
	    document.addEventListener('DOMContentLoaded', ready);
	    if (( false ? 'undefined' : _typeof(exports)) === "object") {
	      exports = Flip;
	    }
	    window.Flip = Flip;
	  }

	  function ready() {
	    var funcs = readyFuncs;
	    instance.init();
	    readyFuncs = null;
	    funcs.forEach(function (callback) {
	      return callback(Flip);
	    });
	  }
	  Object.defineProperties(Flip, {
	    ready: {
	      get: function get() {
	        return readyFuncs == null;
	      }
	    }
	  });

	  var lib = Object.freeze({
	    instance: instance,
	    animate: animate,
	    Flip: Flip,
	    EASE: EASE,
	    Mat3: Mat3,
	    $: $,
	    $$: $$,
	    forEach: forEach,
	    Promise: Promise,
	    PureRender: PureRender,
	    Render: Render,
	    isRender: isRender,
	    RenderTask: RenderTask,
	    RenderGlobal: RenderGlobal,
	    RENDER_STATE_PHRASE_UPDATE: RENDER_STATE_PHRASE_UPDATE,
	    RENDER_STATE_PHRASE_IDLE: RENDER_STATE_PHRASE_IDLE,
	    RENDER_STATE_PHRASE_RENDER: RENDER_STATE_PHRASE_RENDER,
	    RENDER_STATE_PHRASE_APPLY: RENDER_STATE_PHRASE_APPLY,
	    RenderState: RenderState,
	    TimeLine: TimeLine,
	    CLOCK_STATUS_IDLE: CLOCK_STATUS_IDLE,
	    CLOCK_STATUS_PAUSED: CLOCK_STATUS_PAUSED,
	    CLOCK_STATUS_ACTIVE: CLOCK_STATUS_ACTIVE,
	    CLOCK_STATUS_DELAYING: CLOCK_STATUS_DELAYING,
	    CLOCK_STATUS_HOLDING: CLOCK_STATUS_HOLDING,
	    CLOCK_STATUS_ENDED: CLOCK_STATUS_ENDED,
	    CLOCK_STATUS_UNKNOWN: CLOCK_STATUS_UNKNOWN,
	    CLOCK_STATUS_STARTED: CLOCK_STATUS_STARTED,
	    CLOCK_STATUS_CANCELED: CLOCK_STATUS_CANCELED,
	    Clock: Clock,
	    DEFAULT_CLOCK_CONSTRUCTOR: DEFAULT_CLOCK_CONSTRUCTOR,
	    TreeRender: TreeRender,
	    ANIMATION_FILL_MODE_REMOVE: ANIMATION_FILL_MODE_REMOVE,
	    ANIMATION_FILL_MODE_KEEP: ANIMATION_FILL_MODE_KEEP,
	    Animation: Animation,
	    RenderUtil: RenderUtil,
	    CSSRenderApplication: CSSRenderApplication,
	    CSSProxy: CSSProxy,
	    combineStyleText: combineStyleText,
	    CSSRenderUtil: CSSRenderUtil
	  });

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  /**
	   * @alias Flip.GL
	   * @type WEBGL_CONST
	   */
	  var WebGL_CONST = {};

	  (function () {
	    copyConst(WebGLRenderingContext);
	    copyConst(WebGLRenderingContext.prototype);
	    function copyConst(source) {
	      for (var name in source) {
	        if (/^[A-Z_\d]+$/.test(name)) {
	          WebGL_CONST[name] = source[name];
	        }
	      }
	    }

	    WebGL_CONST.HALF_FLOAT_OES = 36193;
	  })();

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  var EPSILON = 0.000001;
	  /**
	   * Matrix is mutable which means any operation will replace the whole element array
	   * @param {Float32Array|Matrix4|Array|null} arrayOrMat4
	   * @property {Float32Array} elements
	   * @returns {Matrix4}
	   * @constructor
	   */
	  function Matrix4(arrayOrMat4) {
	    if (!(this instanceof Matrix4)) {
	      return new Matrix4(arrayOrMat4);
	    }
	    var elements = void 0;
	    if (arrayOrMat4 instanceof Array) {
	      elements = new Float32Array(arrayOrMat4);
	    } else if (arrayOrMat4 instanceof Matrix4) {
	      elements = new Float32Array(arrayOrMat4.elements);
	    } else if (arrayOrMat4 && arrayOrMat4.buffer instanceof ArrayBuffer) {
	      elements = new Float32Array(arrayOrMat4);
	    } else {
	      elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	    }
	    this.elements = elements;
	  }
	  Matrix4.prototype = {
	    clone: function clone() {
	      return new Matrix4(this);
	    },
	    translate: function translate(x, y, z) {
	      this.elements = translateMatrix4(new Float32Array(16), this.elements, [x, y, z]);
	      return this;
	    },
	    scale: function scale(x, y, z) {
	      this.elements = scaleMatrix4(new Float32Array(16), this.elements, [x, y, z]);
	      return this;
	    },
	    rotate: function rotate(rad, axis) {
	      this.elements = rotateMatrix4(new Float32Array(16), this.elements, rad, axis);
	      return this;
	    },
	    concat: function concat(matrix) {
	      this.elements = concatMatrix4(new Float32Array(16), this.elements, matrix.elements);
	      return this;
	    },
	    perspective: function perspective(fovy, aspect, near, far) {
	      this.elements = concatMatrix4(new Float32Array(16), this.elements, matrix4Perspective(new Float32Array(16), fovy, aspect, near, far));
	      return this;
	    },
	    lookAt: function lookAt(eye, center, up) {
	      this.elements = concatMatrix4(new Float32Array(16), this.elements, matrix4LookAt(new Float32Array(16), eye, center, up));
	      return this;
	    },
	    toString: function toString(fix) {
	      var a = this.elements,
	          str = '';
	      fix = fix || 3;
	      for (var i = 0, index; i < 4; i++) {
	        str += a[index = i * 4].toFixed(fix) + '\t' + a[index + 1].toFixed(fix) + '\t' + a[index + 2].toFixed(fix) + '\t' + a[index + 3].toFixed(fix) + '\n';
	      }
	      return str;
	    },
	    concatVec4: function concatVec4(x, y, z, w) {
	      return vec4ConcatMat4([], [+x, +y, +z, isNaN(w) ? 1 : +w], this.elements);
	    }
	  };
	  Matrix4.fromFrustum = function (left, right, bottom, top, near, far) {
	    var elements = new Float32Array(16);
	    matrix4Frustum(elements, left, right, bottom, top, near, far);
	    return new Matrix4(elements);
	  };
	  Matrix4.fromPerspective = function (fovy, aspect, near, far) {
	    var elements = new Float32Array(16);
	    matrix4Perspective(elements, fovy, aspect, near, far);
	    return new Matrix4(elements);
	  };
	  Matrix4.fromLookAt = function (eye, center, up) {
	    var elements = new Float32Array(16);
	    matrix4LookAt(elements, eye, center, up);
	    return new Matrix4(elements);
	  };
	  Matrix4.fromScale = function (x, y, z) {
	    var mat = new Matrix4(),
	        elements = mat.elements;
	    scaleMatrix4(elements, elements, [x, y, z]);
	    return mat;
	  };
	  Matrix4.fromTranslate = function (x, y, z) {
	    var mat = new Matrix4(),
	        elements = mat.elements;
	    translateMatrix4(elements, elements, [x, y, z]);
	    return mat;
	  };
	  Matrix4.fromConcat = function (a, b) {
	    var mat = new Matrix4(),
	        elements = mat.elements;
	    concatMatrix4(elements, a.elements, b.elements);
	    return mat;
	  };
	  Matrix4.fromRotate = function (rad, axis) {
	    var mat = new Matrix4(),
	        elements = mat.elements;
	    rotateMatrix4(elements, elements, rad, axis);
	    return mat;
	  };
	  function matrix4LookAt(out, eye, center, up) {
	    var x0 = void 0,
	        x1 = void 0,
	        x2 = void 0,
	        y0 = void 0,
	        y1 = void 0,
	        y2 = void 0,
	        z0 = void 0,
	        z1 = void 0,
	        z2 = void 0,
	        len = void 0,
	        eyex = eye[0],
	        eyey = eye[1],
	        eyez = eye[2],
	        upx = up[0],
	        upy = up[1],
	        upz = up[2],
	        centerx = center[0],
	        centery = center[1],
	        centerz = center[2];

	    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
	      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1].forEach(function (number, i) {
	        out[i] = number;
	      });
	      return out;
	    }

	    z0 = eyex - centerx;
	    z1 = eyey - centery;
	    z2 = eyez - centerz;

	    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	    z0 *= len;
	    z1 *= len;
	    z2 *= len;

	    x0 = upy * z2 - upz * z1;
	    x1 = upz * z0 - upx * z2;
	    x2 = upx * z1 - upy * z0;
	    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	    if (!len) {
	      x0 = 0;
	      x1 = 0;
	      x2 = 0;
	    } else {
	      len = 1 / len;
	      x0 *= len;
	      x1 *= len;
	      x2 *= len;
	    }

	    y0 = z1 * x2 - z2 * x1;
	    y1 = z2 * x0 - z0 * x2;
	    y2 = z0 * x1 - z1 * x0;

	    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	    if (!len) {
	      y0 = 0;
	      y1 = 0;
	      y2 = 0;
	    } else {
	      len = 1 / len;
	      y0 *= len;
	      y1 *= len;
	      y2 *= len;
	    }

	    out[0] = x0;
	    out[1] = y0;
	    out[2] = z0;
	    out[3] = 0;
	    out[4] = x1;
	    out[5] = y1;
	    out[6] = z1;
	    out[7] = 0;
	    out[8] = x2;
	    out[9] = y2;
	    out[10] = z2;
	    out[11] = 0;
	    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	    out[15] = 1;

	    return out;
	  }
	  function matrix4Frustum(out, left, right, bottom, top, near, far) {
	    var rl = 1 / (right - left),
	        tb = 1 / (top - bottom),
	        nf = 1 / (near - far);
	    out[0] = near * 2 * rl;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = near * 2 * tb;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = (right + left) * rl;
	    out[9] = (top + bottom) * tb;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = far * near * 2 * nf;
	    out[15] = 0;
	    return out;
	  }
	  function matrix4Perspective(out, fovy, aspect, near, far) {
	    var f = 1.0 / Math.tan(fovy / 2),
	        nf = 1 / (near - far);
	    out[0] = f / aspect;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = f;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 2 * far * near * nf;
	    out[15] = 0;
	    return out;
	  }

	  function rotateMatrix4(out, a, rad, axis) {
	    var x = axis[0],
	        y = axis[1],
	        z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s = void 0,
	        c = void 0,
	        t = void 0,
	        a00 = void 0,
	        a01 = void 0,
	        a02 = void 0,
	        a03 = void 0,
	        a10 = void 0,
	        a11 = void 0,
	        a12 = void 0,
	        a13 = void 0,
	        a20 = void 0,
	        a21 = void 0,
	        a22 = void 0,
	        a23 = void 0,
	        b00 = void 0,
	        b01 = void 0,
	        b02 = void 0,
	        b10 = void 0,
	        b11 = void 0,
	        b12 = void 0,
	        b20 = void 0,
	        b21 = void 0,
	        b22 = void 0;

	    if (Math.abs(len) < EPSILON) {
	      return null;
	    }

	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;

	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;

	    a00 = a[0];
	    a01 = a[1];
	    a02 = a[2];
	    a03 = a[3];
	    a10 = a[4];
	    a11 = a[5];
	    a12 = a[6];
	    a13 = a[7];
	    a20 = a[8];
	    a21 = a[9];
	    a22 = a[10];
	    a23 = a[11];

	    // Construct the elements of the rotation matrix
	    b00 = x * x * t + c;
	    b01 = y * x * t + z * s;
	    b02 = z * x * t - y * s;
	    b10 = x * y * t - z * s;
	    b11 = y * y * t + c;
	    b12 = z * y * t + x * s;
	    b20 = x * z * t + y * s;
	    b21 = y * z * t - x * s;
	    b22 = z * z * t + c;

	    // Perform rotation-specific matrix multiplication
	    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

	    if (a !== out) {
	      // If the source and destination differ, copy the unchanged last row
	      out[12] = a[12];
	      out[13] = a[13];
	      out[14] = a[14];
	      out[15] = a[15];
	    }
	    return out;
	  }
	  function scaleMatrix4(out, a, v) {
	    var x = v[0],
	        y = v[1],
	        z = v[2];

	    out[0] = a[0] * x;
	    out[1] = a[1] * x;
	    out[2] = a[2] * x;
	    out[3] = a[3] * x;
	    out[4] = a[4] * y;
	    out[5] = a[5] * y;
	    out[6] = a[6] * y;
	    out[7] = a[7] * y;
	    out[8] = a[8] * z;
	    out[9] = a[9] * z;
	    out[10] = a[10] * z;
	    out[11] = a[11] * z;
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	  }
	  function translateMatrix4(out, a, v) {
	    var x = v[0],
	        y = v[1],
	        z = v[2],
	        a00 = void 0,
	        a01 = void 0,
	        a02 = void 0,
	        a03 = void 0,
	        a10 = void 0,
	        a11 = void 0,
	        a12 = void 0,
	        a13 = void 0,
	        a20 = void 0,
	        a21 = void 0,
	        a22 = void 0,
	        a23 = void 0;

	    if (a === out) {
	      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	    } else {
	      a00 = a[0];
	      a01 = a[1];
	      a02 = a[2];
	      a03 = a[3];
	      a10 = a[4];
	      a11 = a[5];
	      a12 = a[6];
	      a13 = a[7];
	      a20 = a[8];
	      a21 = a[9];
	      a22 = a[10];
	      a23 = a[11];

	      out[0] = a00;
	      out[1] = a01;
	      out[2] = a02;
	      out[3] = a03;
	      out[4] = a10;
	      out[5] = a11;
	      out[6] = a12;
	      out[7] = a13;
	      out[8] = a20;
	      out[9] = a21;
	      out[10] = a22;
	      out[11] = a23;

	      out[12] = a00 * x + a10 * y + a20 * z + a[12];
	      out[13] = a01 * x + a11 * y + a21 * z + a[13];
	      out[14] = a02 * x + a12 * y + a22 * z + a[14];
	      out[15] = a03 * x + a13 * y + a23 * z + a[15];
	    }

	    return out;
	  }
	  function concatMatrix4(out, a, b) {
	    var a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11],
	        a30 = a[12],
	        a31 = a[13],
	        a32 = a[14],
	        a33 = a[15];

	    // Cache only the current line of the second matrix
	    var b0 = b[0],
	        b1 = b[1],
	        b2 = b[2],
	        b3 = b[3];
	    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

	    b0 = b[4];
	    b1 = b[5];
	    b2 = b[6];
	    b3 = b[7];
	    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

	    b0 = b[8];
	    b1 = b[9];
	    b2 = b[10];
	    b3 = b[11];
	    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

	    b0 = b[12];
	    b1 = b[13];
	    b2 = b[14];
	    b3 = b[15];
	    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	    return out;
	  }
	  function vec4ConcatMat4(out, a, m) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	    return out;
	  }

	  /**
	   * Created by brian on 02/12/2016.
	   */

	  var GLVec = function () {
	    function GLVec(vec) {
	      _classCallCheck(this, GLVec);

	      if (vec instanceof GLVec) {
	        this.elements = new Float32Array(vec.elements);
	      } else {
	        this.elements = new Float32Array(vec);
	      }
	    }

	    GLVec.prototype.clone = function clone() {
	      return new GLVec(this.elements);
	    };

	    GLVec.prototype.vecDot = function vecDot(vecOrNumber) {
	      var v = _vecDot(this, vecOrNumber);
	      this.elements = new Float32Array(v.elements);
	      return v;
	    };

	    GLVec.prototype.vecLength = function vecLength() {
	      return _vecLength(this);
	    };

	    GLVec.prototype.vecAdd = function vecAdd(vec) {
	      var v = _vecAdd(this, vec);
	      this.elements = new Float32Array(v.elements);
	      return v;
	    };

	    GLVec.prototype.vecNormalize = function vecNormalize() {
	      var v = _vecNormalize(this);
	      this.elements = new Float32Array(v.elements);
	      return v;
	    };

	    /**
	     * set selected components returns a new GLVec instance
	     *  vec.set({x:3,z:1});
	     *  vec.set(3,null,1);
	     * @param componentsOrx
	     */


	    GLVec.prototype.set = function set(componentsOrx) {
	      var vec = this.clone();
	      if (isObj(componentsOrx)) {
	        forEach(componentsOrx, function (val, key) {
	          vec[key] = val;
	        });
	      } else {
	        for (var i = 0, len = this.length; i < len; i++) {
	          var num = arguments[i];
	          if (!isNaN(num)) {
	            vec.elements[i] = num;
	          }
	        }
	      }
	      return vec;
	    };

	    _createClass(GLVec, [{
	      key: 'length',
	      get: function get() {
	        return this.elements.length;
	      }
	    }]);

	    return GLVec;
	  }();

	  GLVec.vecDot = _vecDot;

	  GLVec.vecMix = vecMix;

	  GLVec.vecAdd = _vecAdd;

	  GLVec.vecLength = _vecLength;

	  GLVec.vecNormalize = _vecNormalize;

	  function vecMix(vec1, p1, vec2, p2) {
	    var length = vec1.length;
	    if (length !== vec2.length) {
	      throw Error('dot vec of different dimensions');
	    }
	    var ret = [];
	    for (var i = 0; i < length; i++) {
	      ret[i] = p1 * vec1[i] + p2 * vec2[i];
	    }
	    return new GLVec(ret);
	  }
	  function _vecDot(vec1, vec2) {
	    if (typeof vec2 === "number") {
	      return vecScale(vec1, vec2);
	    }
	    var length = vec1.length;
	    if (length !== vec2.length) {
	      throw Error('dot vec of different dimensions');
	    }
	    var ret = [];
	    for (var i = 0; i < length; i++) {
	      ret[i] = vec1[i] * vec2[i];
	    }
	    return new GLVec(ret);
	  }
	  function vecScale(vec, scale) {
	    var ret = [];
	    for (var i = 0; i < vec.length; i++) {
	      ret[i] = vec[i] * scale;
	    }
	    return new GLVec(ret);
	  }
	  function _vecAdd(vec1, vec2) {
	    var length = vec1.length;
	    if (length !== vec2.length) {
	      throw Error('add vec of different dimensions');
	    }
	    var ret = [];
	    for (var i = 0; i < length; i++) {
	      ret[i] = vec2[i] + vec1[i];
	    }
	    return new GLVec(ret);
	  }
	  function _vecLength(vec) {
	    var sum = 0;
	    for (var i = 0, len = vec.length; i < len; i++) {
	      var num = vec[i];
	      sum += num * num;
	    }
	    return Math.sqrt(sum);
	  }
	  function _vecNormalize(vec) {
	    var vLen = _vecLength(vec);
	    if (vLen == 0) {
	      return new GLVec(vec.length);
	    }
	    var ret = [];
	    for (var i = 0; i < vec.length; i++) {
	      ret[i] = vec[i] / vLen;
	    }
	    return new GLVec(ret);
	  }
	  /*
	   like a gl vec, vec component can be accessed by index or name
	   var vec=new GLVec([1,2,3,4]);
	   vec.x    // 1
	   vec[1]  //2
	   vec.b  //3
	   vec.w == vec.a == vec[3] == 4
	   */
	  ['0,0', 'x,0', 'r,0', '1,1', 'y,1', 'g,1', '2,2', 'z,2', 'b,2', '3,3', 'w,3', 'a,3'].forEach(function (def) {
	    var components = def.split(','),
	        index = +components[1],
	        name = components[0];
	    Object.defineProperty(GLVec.prototype, name, {
	      get: function get() {
	        return this.elements[index];
	      },
	      set: function set(val) {
	        this.elements[index] = +val;
	      }
	    });
	  });

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  var mapSeed = {};
	  function nextUid(type) {
	    if (!mapSeed.hasOwnProperty(type)) {
	      mapSeed[type] = 1;
	    }
	    return mapSeed[type]++;
	  }

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  /**
	   * @alias Flip.GL.Binder
	   */

	  var GLBinder = function () {
	    function GLBinder(arg) {
	      _classCallCheck(this, GLBinder);

	      if (!isObj(arg)) {
	        arg = {};
	      }
	      this.name = arg.name || nextUid(this.constructor.name);
	      if (isFunc(arg.bind)) {
	        this.bind = arg.bind;
	      }

	      if (isObj(arg.controller) && isFunc(arg.controller.invalid)) {
	        this.controllers = [arg.controller];
	      } else {
	        this.controllers = [];
	      }
	    }

	    GLBinder.prototype.addController = function addController(ctrl) {
	      arrAdd(this.controllers, ctrl);
	    };

	    GLBinder.prototype.removeController = function removeController(ctrl) {
	      arrRemove(this.controllers, ctrl);
	    };

	    GLBinder.prototype.bind = function bind(gl, state) {};

	    GLBinder.prototype.invalid = function invalid() {
	      this.controllers.forEach(function (c) {
	        return c.invalid();
	      });
	    };

	    GLBinder.prototype.dispose = function dispose(state) {
	      setDisposed(this);
	    };

	    GLBinder.prototype.update = function update() {};

	    _createClass(GLBinder, [{
	      key: 'disposed',
	      get: function get() {
	        return getDisposed(this);
	      }
	    }, {
	      key: 'canDispose',
	      get: function get() {
	        return this.controllers.length == 0;
	      }
	    }]);

	    return GLBinder;
	  }();

	  GLBinder.prototype.constructor = GLBinder;

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  var GLHANDLE_KEY = createPrivateMemberName('glHandle');
	  var BUFFERED_KEY = createPrivateMemberName('buffered');
	  var DATA_KEY = createPrivateMemberName('data');

	  var GLResource = function (_GLBinder) {
	    _inherits(GLResource, _GLBinder);

	    function GLResource() {
	      _classCallCheck(this, GLResource);

	      return _possibleConstructorReturn(this, _GLBinder.apply(this, arguments));
	    }

	    GLResource.prototype.bind = function bind(gl, state) {
	      this.checkGLHandle(gl);
	      this.bindResource(gl, state);
	      this.checkBufferData(gl, state);
	    };

	    GLResource.prototype.update = function update(state) {};

	    GLResource.prototype.checkBufferData = function checkBufferData(gl, state) {
	      if (!this[BUFFERED_KEY]) {
	        this.bufferData(gl, state);
	        this[BUFFERED_KEY] = true;
	      }
	    };

	    GLResource.prototype.checkGLHandle = function checkGLHandle(gl) {
	      var _this21 = this;

	      if (!this.glHandle) {
	        var handle = this[GLHANDLE_KEY] = this.createGLHandle(gl);
	        this.disposeGLHandle = function () {
	          _this21.deleteGLHandle(gl, handle);
	          _this21[GLHANDLE_KEY] = null;
	        };
	      }
	    };

	    GLResource.prototype.createGLHandle = function createGLHandle(gl) {};

	    GLResource.prototype.disposeGLHandle = function disposeGLHandle() {
	      this.resetResource();
	    };

	    GLResource.prototype.deleteGLHandle = function deleteGLHandle(gl, handle) {};

	    GLResource.prototype.bindResource = function bindResource(gl, state) {};

	    GLResource.prototype.bufferData = function bufferData(gl) {};

	    GLResource.prototype.dispose = function dispose(state) {
	      this.disposeGLHandle();
	      _GLBinder.prototype.dispose.call(this, state);
	    };

	    GLResource.prototype.convertValidData = function convertValidData(data) {};

	    GLResource.prototype.resetResource = function resetResource() {
	      this[BUFFERED_KEY] = false;
	      this.invalid();
	    };

	    _createClass(GLResource, [{
	      key: 'glHandle',
	      get: function get() {
	        return this[GLHANDLE_KEY];
	      }
	    }, {
	      key: 'dataInvalid',
	      get: function get() {
	        return !this[BUFFERED_KEY];
	      }
	    }, {
	      key: 'data',
	      set: function set(d) {
	        if (d != this[DATA_KEY]) {
	          this[DATA_KEY] = this.convertValidData(d);
	          this.resetResource();
	        }
	      },
	      get: function get() {
	        return this[DATA_KEY];
	      }
	    }]);

	    return GLResource;
	  }(GLBinder);

	  GLResource.prototype.constructor = GLResource;

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  /**
	   * @alias Flip.GL.Buffer
	   */

	  var GLBuffer = function (_GLResource) {
	    _inherits(GLBuffer, _GLResource);

	    function GLBuffer(arg) {
	      _classCallCheck(this, GLBuffer);

	      var _this22 = _possibleConstructorReturn(this, _GLResource.call(this, arg));

	      if (!isObj(arg)) {
	        arg = {};
	      }
	      _this22._type = arg.type == WebGL_CONST.ELEMENT_ARRAY_BUFFER ? WebGL_CONST.ELEMENT_ARRAY_BUFFER : WebGL_CONST.ARRAY_BUFFER;
	      _this22.data = arg.data;
	      _this22.usage = arg.usage || WebGL_CONST.STATIC_DRAW;
	      return _this22;
	    }

	    GLBuffer.prototype.createGLHandle = function createGLHandle(gl) {
	      return gl.createBuffer();
	    };

	    GLBuffer.prototype.deleteGLHandle = function deleteGLHandle(gl, handler) {
	      gl.deleteBuffer(handler);
	    };

	    GLBuffer.prototype.convertValidData = function convertValidData(arr) {
	      if (arr) {
	        var type = this._type;
	        if (arr instanceof Array) {
	          if (type == WebGL_CONST.ARRAY_BUFFER) {
	            return new Float32Array(arr);
	          } else if (type == WebGL_CONST.ELEMENT_ARRAY_BUFFER) {
	            return new Uint16Array(arr);
	          }
	        } else if (isTypedArray(arr)) {
	          if (type == WebGL_CONST.ARRAY_BUFFER) {
	            return arr;
	          } else if (type == WebGL_CONST.ELEMENT_ARRAY_BUFFER && arr instanceof Uint16Array) {
	            return arr;
	          }
	        }
	      }
	      throw Error('invalid data type for GLBuffer');
	    };

	    GLBuffer.prototype.bufferData = function bufferData(gl) {
	      gl.bufferData(this._type, this.data, this.usage);
	    };

	    GLBuffer.prototype.bindResource = function bindResource(gl, e) {
	      gl.bindBuffer(this._type, this.glHandle);
	    };

	    _createClass(GLBuffer, [{
	      key: 'length',
	      get: function get() {
	        return this._data ? this._data.length : 0;
	      }
	    }]);

	    return GLBuffer;
	  }(GLResource);

	  function isTypedArray(arr) {
	    return arr && arr.buffer instanceof ArrayBuffer;
	  }
	  GLBuffer.prototype.constructor = GLBuffer;

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  var GET_HALF_FLOAT_LINEAR = void 0;
	  var GET_FLOAT_LINEAR = void 0;
	  /**
	   * @alias Flip.GL.Texture
	   */

	  var GLTexture = function (_GLResource2) {
	    _inherits(GLTexture, _GLResource2);

	    function GLTexture(arg) {
	      _classCallCheck(this, GLTexture);

	      var _this23 = _possibleConstructorReturn(this, _GLResource2.call(this));

	      if (!isObj(arg)) {
	        arg = {};
	      }
	      _this23._type = arg.type || WebGL_CONST.TEXTURE_2D;
	      _this23.dataFormat = arg.dataFormat || WebGL_CONST.UNSIGNED_BYTE;
	      return _this23;
	    }

	    GLTexture.prototype.createGLHandle = function createGLHandle(gl) {
	      if (this.dataFormat == WebGL_CONST.FLOAT && !gl.getExtension('OES_texture_float')) {
	        throw Error('float texture is not support');
	      } else if (this.dataFormat == WebGL_CONST.HALF_FLOAT_OES && !gl.getExtension('OES_texture_half_float')) {
	        throw Error('half float texture is not support');
	      }
	      return gl.createTexture();
	    };

	    GLTexture.prototype.deleteGLHandle = function deleteGLHandle(gl, handle) {
	      gl.deleteTexture(handle);
	    };

	    GLTexture.prototype.bindResource = function bindResource(gl, e) {
	      gl.bindTexture(this._type, this.glHandle);
	    };

	    GLTexture.prototype.activeIndex = function activeIndex(gl, index) {
	      gl.activeTexture(gl.TEXTURE0 + index);
	      this.bind(gl);
	    };

	    GLTexture.prototype.useTexParam = function useTexParam(gl, param) {
	      var targetTexture = this._type;
	      var dataFormat = this.dataFormat;
	      var method = dataFormat == WebGL_CONST.UNSIGNED_BYTE ? 'texParameteri' : 'texParameterf';
	      ['TEXTURE_MAG_FILTER', 'TEXTURE_MIN_FILTER'].forEach(function (key) {
	        if (param[key] == WebGL_CONST.LINEAR) {
	          var errorMessage = void 0;
	          if (dataFormat === WebGL_CONST.HALF_FLOAT_OES && !GET_HALF_FLOAT_LINEAR) {
	            var ext = gl.getExtension('OES_texture_half_float_linear');
	            GET_HALF_FLOAT_LINEAR = true;
	            if (!ext) {
	              errorMessage = 'half float texture linear filter is not support';
	            }
	          } else if (dataFormat === WebGL_CONST.FLOAT && !GET_FLOAT_LINEAR) {
	            var _ext = gl.getExtension("OES_texture_float_linear");
	            if (!_ext) {
	              errorMessage = 'float texture linear filter is not support';
	            }
	            GET_FLOAT_LINEAR = true;
	          }
	          if (errorMessage) {
	            console.warn(errorMessage);
	          }
	        }
	        setParam(key);
	      });
	      ['TEXTURE_WRAP_S', 'TEXTURE_WRAP_T'].forEach(setParam);
	      function setParam(key) {
	        if (key in param) {
	          gl[method](targetTexture, gl[key], param[key]);
	        }
	      }
	    };

	    return GLTexture;
	  }(GLResource);

	  GLTexture.prototype.constructor = GLTexture;

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  /**
	   * @alias Flip.GL.Mesh
	   */

	  var GLMesh = function (_Render3) {
	    _inherits(GLMesh, _Render3);

	    function GLMesh(arg) {
	      _classCallCheck(this, GLMesh);

	      var _this24 = _possibleConstructorReturn(this, _Render3.call(this));

	      _this24.binder = {};
	      _this24.addBinder(arg.binder);
	      _this24.primitive = isNaN(arg.primitive) ? WebGL_CONST.TRIANGLES : arg.primitive;
	      if (isFunc(arg.beforeDraw)) {
	        _this24.beforeDraw = arg.beforeDraw;
	      }
	      if (isFunc(arg.afterDraw)) {
	        _this24.afterDraw = arg.afterDraw;
	      }
	      _this24.setDrawRange(arg.drawCount, arg.startIndex);
	      _this24.invalid();
	      return _this24;
	    }

	    GLMesh.prototype.addBinder = function addBinder(binderOrFunc, name) {
	      var _this25 = this;

	      var binder = void 0;
	      if (isFunc(binderOrFunc)) {
	        binder = new GLBinder({ bind: binderOrFunc, controller: this, name: name });
	      } else if (binderOrFunc instanceof GLBinder) {
	        binder = binderOrFunc;
	      } else if (arguments.length == 1 && isObj(binderOrFunc)) {
	        var ret = false;
	        forEach(binderOrFunc, function (binder, name) {
	          return _this25.addBinder(binder, name) && (ret = true);
	        });
	        return ret;
	      } else if (arguments.length == 2) {
	        this.binder[name] = binderOrFunc;
	        return true;
	      } else {
	        return false;
	      }
	      if (getDisposed(binder)) {
	        throw Error('binder disposed should not be added again');
	      }
	      name = binder.name;
	      if (this.binder[name]) {
	        throw Error('binder named:' + name + ' has been added');
	      }
	      this.binder[name] = binder;
	      binder.addController(this);
	      return true;
	    };

	    GLMesh.prototype.removeBinder = function removeBinder(binderOrFunc) {
	      var binder = void 0;
	      if (isFunc(binderOrFunc)) {
	        binder = objFind(this.binder, function (c) {
	          return c.bind == binderOrFunc;
	        });
	      } else if (isStr(binderOrFunc)) {
	        binder = this.binder[binderOrFunc];
	      } else if (binderOrFunc instanceof GLBinder) {
	        binder = binderOrFunc;
	      }
	      if (binder instanceof GLBinder && this.binder[binder.name] == binder) {
	        delete this.binder[binder.name];
	        binder.removeController(this);
	        return true;
	      }
	      return false;
	    };

	    GLMesh.prototype.render = function render(state) {
	      _Render3.prototype.render.call(this, state);
	      var gl = state.gl;
	      this.bind(gl, state);
	      this.beforeDraw(gl, state);
	      this.draw(gl, state);
	      this.afterDraw(gl, state);
	    };

	    GLMesh.prototype.beforeDraw = function beforeDraw(gl, state) {};

	    GLMesh.prototype.draw = function draw(gl, state) {
	      var indexBuffer = this.indexBuffer;
	      if (this.drawCount) {
	        if (indexBuffer) {
	          indexBuffer.bind(gl);
	          gl.drawElements(this.primitive, this.drawCount, gl.UNSIGNED_SHORT, this.startIndex);
	        } else {
	          gl.drawArrays(this.primitive, this.startIndex, this.drawCount);
	        }
	      }
	    };

	    GLMesh.prototype.afterDraw = function afterDraw(gl, state) {};

	    GLMesh.prototype.bind = function bind(gl, state) {
	      forEach(this.binder, function (binder, name) {
	        if (binder instanceof GLBinder) {
	          binder.bind(gl, state);
	        } else {
	          console.warn('binder:' + name + ' expect GLBinder', binder);
	        }
	      });
	    };

	    GLMesh.prototype.update = function update(state) {
	      _Render3.prototype.update.call(this, state);
	      this.updateBinder(state);
	    };

	    GLMesh.prototype.updateBinder = function updateBinder(state) {
	      forEach(this.binder, function (b) {
	        return b instanceof GLBinder && b.update(state);
	      });
	    };

	    GLMesh.prototype.disposeBinder = function disposeBinder(state) {
	      var _this26 = this;

	      forEach(this.binder, function (b) {
	        _this26.removeBinder(b);
	        if (b.canDispose) {
	          b.dispose(state);
	        }
	      });
	    };

	    GLMesh.prototype.dispose = function dispose(state) {
	      this.disposeBinder(state);
	      _Render3.prototype.dispose.call(this, state);
	    };

	    GLMesh.prototype.setDrawRange = function setDrawRange(count, start) {
	      this.startIndex = start || 0;
	      this.drawCount = count;
	    };

	    GLMesh.prototype.setDrawIndexBuffer = function setDrawIndexBuffer(buffer, count, start) {
	      var indexBuffer = this.indexBuffer;
	      if (indexBuffer && indexBuffer.removeController(this) && indexBuffer.canDispose) {
	        indexBuffer.deleteGLHandle();
	      }
	      this.indexBuffer = buffer;
	      this.drawCount = isNaN(count) ? count : buffer.length;
	      this.startIndex = start || 0;
	      buffer.addController(this);
	    };

	    return GLMesh;
	  }(Render);

	  GLMesh.prototype.constructor = GLMesh;

	  /**
	   * Created by brian on 05/12/2016.
	   */
	  /**
	   * @memberOf Flip.GL
	   */

	  var GLRenderBuffer = function (_GLResource3) {
	    _inherits(GLRenderBuffer, _GLResource3);

	    function GLRenderBuffer() {
	      _classCallCheck(this, GLRenderBuffer);

	      return _possibleConstructorReturn(this, _GLResource3.apply(this, arguments));
	    }

	    GLRenderBuffer.prototype.createGLHandle = function createGLHandle(gl) {
	      return gl.createRenderbuffer();
	    };

	    GLRenderBuffer.prototype.deleteGLHandle = function deleteGLHandle(gl, handle) {
	      gl.deleteRenderbuffer(handle);
	    };

	    GLRenderBuffer.prototype.bindResource = function bindResource(gl, state) {
	      gl.bindRenderbuffer(gl.RENDERBUFFER, this.glHandle);
	    };

	    return GLRenderBuffer;
	  }(GLResource);

	  GLRenderBuffer.prototype.constructor = GLRenderBuffer;

	  /**
	   * Created by brian on 05/12/2016.
	   */
	  var PRO_TEXTURE = createPrivateMemberName('texture');
	  var PRO_TEXTURE_INDEX = createPrivateMemberName('textureIndex');
	  /**
	   * @alias Flip.GL.FrameBuffer
	   */

	  var GLFrameBuffer = function (_GLResource4) {
	    _inherits(GLFrameBuffer, _GLResource4);

	    function GLFrameBuffer(arg) {
	      _classCallCheck(this, GLFrameBuffer);

	      var _this28 = _possibleConstructorReturn(this, _GLResource4.call(this, arg));

	      _this28._w = arg.width || 0;
	      _this28._h = arg.height || 0;
	      _this28._depthBuffer = arg.useDepthBuffer ? new GLRenderBuffer() : null;
	      _this28.texture = arg.texture || new GLTexture({
	        type: WebGL_CONST.TEXTURE_2D,
	        dataFormat: arg.dataFormat || WebGL_CONST.UNSIGNED_BYTE
	      });
	      _this28.shouldCheckComplete = true;
	      _this28.shouldClearTexture = true;
	      _this28[PRO_TEXTURE_INDEX] = -1;
	      _this28.textureParam = makeOptions(arg.textureParam, {
	        TEXTURE_MAG_FILTER: WebGL_CONST.LINEAR,
	        TEXTURE_MIN_FILTER: WebGL_CONST.LINEAR,
	        TEXTURE_WRAP_S: WebGL_CONST.CLAMP_TO_EDGE,
	        TEXTURE_WRAP_T: WebGL_CONST.CLAMP_TO_EDGE
	      });
	      return _this28;
	    }

	    GLFrameBuffer.prototype.createGLHandle = function createGLHandle(gl) {
	      return gl.createFramebuffer();
	    };

	    GLFrameBuffer.prototype.deleteGLHandle = function deleteGLHandle(gl) {};

	    GLFrameBuffer.prototype.createSampler2D = function createSampler2D(name, keepBinding) {
	      return new GLFrameBufferSampler2D({ name: name, framebuffer: this, keepFramebufferBinding: keepBinding });
	    };

	    GLFrameBuffer.prototype.bindResource = function bindResource(gl, state) {
	      if (this[PRO_TEXTURE_INDEX] === -1) {
	        this[PRO_TEXTURE_INDEX] = state.task.getFramebufferTextureIndex(this.name);
	      }
	      this.checkBufferData(gl, state);
	      if (!this.dataInvalid) {
	        gl.bindFramebuffer(gl.FRAMEBUFFER, this.glHandle);
	      }
	    };

	    GLFrameBuffer.prototype.unbind = function unbind(gl) {
	      var binding = gl.getParameter(gl.FRAMEBUFFER_BINDING);
	      if (binding === this.glHandle) {
	        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	      } else if (binding) {
	        throw Error('the framebuffer to unbind is not binding');
	      }
	    };

	    GLFrameBuffer.prototype.bufferData = function bufferData(gl) {
	      var w = this._w || gl.drawingBufferWidth;
	      var h = this._h || gl.drawingBufferHeight;
	      var texture = this.texture;
	      this.bindTexture(gl, texture);
	      texture.useTexParam(gl, this.textureParam);
	      var dataFormat = texture.dataFormat;
	      if (this.shouldClearTexture) {
	        var format = WebGL_CONST.RGBA;
	        gl.texImage2D(gl.TEXTURE_2D, 0, format, w, h, 0, format, dataFormat, null);
	      }
	      var depthBuffer = this._depthBuffer;
	      if (depthBuffer) {
	        this.bindDepthBuffer(gl, depthBuffer, w, h);
	      }
	      if (this.shouldCheckComplete && gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
	        var moreReason = '';
	        if (dataFormat === WebGL_CONST.FLOAT || dataFormat === WebGL_CONST.HALF_FLOAT_OES) {
	          moreReason = ' Not support render to ' + (dataFormat === WebGL_CONST.HALF_FLOAT_OES ? 'half ' : '') + ' float texture';
	        }
	        throw Error('FrameBuffer failed' + moreReason);
	      }
	    };

	    GLFrameBuffer.prototype.bindDepthBuffer = function bindDepthBuffer(gl, depthBuffer, width, height) {
	      if (depthBuffer instanceof GLRenderBuffer) {
	        depthBuffer.bind(gl);
	        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
	        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer.glHandle);
	      } else {
	        throw Error('invalid depth buffer');
	      }
	    };

	    GLFrameBuffer.prototype.readTexture = function readTexture(gl, texture) {
	      var width = this._w || gl.drawingBufferWidth;
	      var height = this._h || gl.drawingBufferHeight;
	      var size = width * height * 4;
	      var data = void 0;
	      if (!texture) {
	        texture = this.texture;
	      }
	      var format = texture.dataFormat;
	      if (format === WebGL_CONST.UNSIGNED_BYTE) {
	        data = new Uint8Array(size);
	      } else if (format === WebGL_CONST.HALF_FLOAT_OES) {
	        data = new Int16Array(size);
	      } else if (format === WebGL_CONST.FLOAT) {
	        data = new Float32Array(size);
	      }
	      this.checkGLHandle(gl);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, this.glHandle);
	      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture.glHandle, 0);
	      gl.readPixels(0, 0, width, height, WebGL_CONST.RGBA, format, data);
	      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	      return { format: format, data: data, width: width, height: height };
	    };

	    GLFrameBuffer.prototype.bindTexture = function bindTexture(gl, texture) {
	      if (texture instanceof GLTexture) {
	        texture.activeIndex(gl, this[PRO_TEXTURE_INDEX]);
	        gl.bindFramebuffer(gl.FRAMEBUFFER, this.glHandle);
	        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture.glHandle, 0);
	      } else {
	        throw Error('invalid texture');
	      }
	    };

	    _createClass(GLFrameBuffer, [{
	      key: 'size',
	      get: function get() {
	        return [this.width, this.height];
	      },
	      set: function set(s) {
	        this.width = s[0];
	        this.height = s[1];
	      }
	    }, {
	      key: 'width',
	      get: function get() {
	        return this._w;
	      },
	      set: function set(v) {
	        v = parseInt(v);
	        if (this._w !== v) {
	          this._w = v;
	          this.resetResource();
	        }
	      }
	    }, {
	      key: 'height',
	      get: function get() {
	        return this._h;
	      },
	      set: function set(v) {
	        v = parseInt(v);
	        if (this._h !== v) {
	          this._h = v;
	          this.resetResource();
	        }
	      }
	    }, {
	      key: 'texture',
	      set: function set(tex) {
	        if (this.texture != tex) {
	          if (this.texture) {
	            this.texture.removeController(this);
	          }
	          this[PRO_TEXTURE] = tex;
	          if (tex instanceof GLTexture) {
	            tex.addController(this);
	          }
	          this.resetResource();
	        }
	      },
	      get: function get() {
	        return this[PRO_TEXTURE];
	      }
	    }]);

	    return GLFrameBuffer;
	  }(GLResource);

	  GLFrameBuffer.prototype.constructor = GLFrameBuffer;

	  var GLFrameBufferSampler2D = function (_GLResource5) {
	    _inherits(GLFrameBufferSampler2D, _GLResource5);

	    function GLFrameBufferSampler2D(arg) {
	      _classCallCheck(this, GLFrameBufferSampler2D);

	      var _this29 = _possibleConstructorReturn(this, _GLResource5.call(this, arg));

	      _this29.framebuffer = arg.framebuffer;
	      _this29.keepFramebufferBinding = arg.keepFramebufferBinding;
	      return _this29;
	    }

	    GLFrameBufferSampler2D.prototype.checkGLHandle = function checkGLHandle(gl) {
	      if (!this.framebuffer.texture.glHandle) {
	        throw Error('frame buffer texture not initiated');
	      }
	    };

	    GLFrameBufferSampler2D.prototype.bind = function bind(gl, state) {
	      if (!this.keepFramebufferBinding) {
	        var framebuffer = this.framebuffer;
	        if (framebuffer) {
	          this.framebuffer.unbind(gl);
	        }
	      }
	      state.scene.bindSamplerTexture(gl, this.name, this.framebuffer.texture);
	    };

	    return GLFrameBufferSampler2D;
	  }(GLResource);

	  GLFrameBufferSampler2D.prototype.constructor = GLFrameBufferSampler2D;

	  /**
	   * Created by brian on 29/01/2017.
	   */
	  /**
	   * @alias Flip.GL.ComputeMesh
	   */

	  var GLComputeMesh = function (_GLMesh) {
	    _inherits(GLComputeMesh, _GLMesh);

	    function GLComputeMesh(arg) {
	      _classCallCheck(this, GLComputeMesh);

	      var _this30 = _possibleConstructorReturn(this, _GLMesh.call(this, arg));

	      var fb = arg && arg.framebuffer;
	      if (fb instanceof GLFrameBuffer) {
	        _this30.framebuffer = fb;
	      } else {
	        _this30.framebuffer = new GLFrameBuffer(objAssign({ name: 'computeTarget' }, fb));
	      }
	      _this30.outputTexture = arg && arg.outputTexture ? arg.outputTexture : new GLTexture({ dataFormat: fb ? _this30.framebuffer.texture.dataFormat : 0 });
	      _this30.computeOnce = false;
	      if (isFunc(arg.getDrawingResult)) {
	        _this30.getDrawingResult = arg.getDrawingResult;
	      }
	      _this30.outputTexture.addController(_this30);
	      _this30.framebuffer.addController(_this30);
	      return _this30;
	    }

	    GLComputeMesh.prototype.dispose = function dispose(state) {
	      _GLMesh.prototype.dispose.call(this, state);
	      this.framebuffer.dispose(state);
	      this.outputTexture.dispose(state);
	    };

	    GLComputeMesh.prototype.getDrawingResult = function getDrawingResult(gl, state) {};

	    GLComputeMesh.prototype.draw = function draw(gl, state) {
	      var fb = this.framebuffer;
	      var vo = void 0,
	          cw = void 0,
	          ch = void 0,
	          canvas = gl.canvas;
	      if (fb._w && fb._h) {
	        vo = gl.getParameter(gl.VIEWPORT);
	        cw = canvas.width;
	        ch = canvas.height;
	        gl.viewport(0, 0, canvas.width = fb._w, canvas.height = fb._h);
	      }
	      fb.bind(gl, state);
	      _GLMesh.prototype.draw.call(this, gl, state);
	      this.getDrawingResult(gl, state);
	      fb.unbind(gl);
	      if (vo) {
	        canvas.width = cw;
	        canvas.height = ch;
	        gl.viewport(vo[0], vo[1], vo[2], vo[3]);
	      }
	      var t1 = fb.texture;
	      fb.texture = this.outputTexture;
	      fb.shouldCheckComplete = false;
	      this.outputTexture = t1;
	      this.computeOnce = true;
	    };

	    return GLComputeMesh;
	  }(GLMesh);

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  /**
	   * @alias Flip.GL.Render
	   */


	  var GLRender = function (_TreeRender2) {
	    _inherits(GLRender, _TreeRender2);

	    function GLRender(arg) {
	      _classCallCheck(this, GLRender);

	      var _this31 = _possibleConstructorReturn(this, _TreeRender2.call(this, arg));

	      _this31.binder = {};
	      if (isObj(arg) && isObj(arg.binder)) {
	        _this31.addBinder(arg.binder);
	      }
	      return _this31;
	    }

	    GLRender.prototype.add = function add(child) {
	      if (child instanceof GLRender || child instanceof GLMesh) {
	        return this.addChild(child);
	      } else if (child instanceof GLBinder) {
	        return this.addBinder(child);
	      }
	    };

	    GLRender.prototype.remove = function remove(child) {
	      return this.removeChild(child);
	    };

	    GLRender.prototype.updateSelf = function updateSelf(state) {
	      _TreeRender2.prototype.updateSelf.call(this, state);
	      this.updateBinder(state);
	    };

	    GLRender.prototype.beforeRenderChildren = function beforeRenderChildren(state) {
	      this.bind(state.gl, state);
	    };

	    GLRender.prototype.dispose = function dispose(state) {
	      this.disposeBinder(state);
	      _TreeRender2.prototype.dispose.call(this, state);
	    };

	    return GLRender;
	  }(TreeRender);

	  ['addBinder', 'removeBinder', 'bind', 'disposeBinder', 'updateBinder'].forEach(function (key) {
	    GLRender.prototype[key] = GLMesh.prototype[key];
	  });

	  /**
	   * Created by brian on 17/10/2016.
	   */
	  function dictionarySet(target, key, value) {
	    var arr = target[key];
	    if (!arr) {
	      target[key] = [value];
	    } else if (arr.indexOf(value) == -1) {
	      arr.push(value);
	    } else {
	      return false;
	    }
	    return true;
	  }

	  /**
	   * Created by brian on 04/12/2016.
	   */
	  function createGLProgram(gl, vSource, fSource, define) {
	    var program = gl.createProgram(),
	        shader = gl.createShader(gl.FRAGMENT_SHADER),
	        marco = '',
	        error = void 0;
	    forEach(define, function (val, key) {
	      marco += '#define ' + key + ' ' + val + '\n';
	    });
	    gl.shaderSource(shader, marco + fSource);
	    gl.compileShader(shader);
	    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	    if (!compiled) {
	      error = gl.getShaderInfoLog(shader);
	      throw Error('fragment shader fail:\n' + prettyPrintError(error, marco + fSource));
	    }
	    gl.attachShader(program, shader);
	    gl.deleteShader(shader);
	    shader = gl.createShader(gl.VERTEX_SHADER);
	    gl.shaderSource(shader, marco + vSource);
	    gl.compileShader(shader);
	    compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	    if (!compiled) {
	      error = gl.getShaderInfoLog(shader);
	      throw Error('vertex shader fail:\n' + prettyPrintError(error, marco + vSource));
	    }
	    gl.attachShader(program, shader);
	    gl.linkProgram(program);
	    gl.deleteShader(shader);
	    error = gl.getProgramInfoLog(program);
	    if (error) {
	      throw Error('program link fail:' + error);
	    }
	    return program;
	  }
	  function prettyPrintError(message, source) {
	    var exp = /\d+:(\d+):(.*?)(\n|$)/g;
	    var match = void 0;
	    var dictionary = {};
	    while (match = exp.exec(message)) {
	      var line = match[1];
	      var reason = match[2];
	      dictionarySet(dictionary, line, '*** ERROR:' + reason + ' ***');
	    }
	    var lines = source.split('\n');
	    var errorLines = [];
	    forEach(dictionary, function (reasons, line) {
	      var index = line - 1;
	      errorLines.push(lines[index] + '\nline:' + index + ':' + reasons.join('\n') + '\n');
	    });
	    return errorLines.join('\n');
	  }
	  function getGLEntries(gl, program, def) {
	    var attributes = {},
	        uniforms = {};
	    forEach(def.attributes, function (define, name) {
	      var loc = gl.getAttribLocation(program, name);
	      if (loc == -1 && !define.conditional) {
	        console.warn('Fail to get attribute ' + name);
	      } else {
	        attributes[name] = new GLAttributeEntry(define.type, loc, name);
	      }
	    });
	    forEach(def.uniforms, function (define, name) {
	      if (!uniforms.hasOwnProperty(name)) {
	        var loc = gl.getUniformLocation(program, name);
	        if (loc == -1 && !define.conditional) {
	          console.warn('Fail to get uniform ' + name);
	        } else {
	          uniforms[name] = new GLUniformEntry(define.type, loc, name);
	        }
	      }
	    });
	    return { uniforms: uniforms, attributes: attributes };
	  }
	  function getGLProgramInfo(source) {
	    var uniforms = {};
	    var attributes = {};
	    var exp = /(\buniform\b|\battribute\b|#if|#endif)/g;
	    var defineExp = /(uniform|attribute)\s+(highp|mediump|lowp)?\s*\b([biu]?vec[234]|bool|u?int|float|sampler2D|samplerCube|mat[234])\b\s+\b(\w+)\b/;
	    var whitespace = /([\s\t\r\n]+|\/\*.*?\*\/|\/\/.*?\n)/g;
	    var match = void 0;
	    var conditional = false;
	    while (match = exp.exec(source)) {
	      var pair = match[0];
	      var startIndex = match.index;
	      if (pair == 'uniform' || pair == 'attribute') {
	        var statement = source.substring(startIndex, source.indexOf(';', startIndex)).replace(whitespace, ' ');
	        var _define = statement.match(defineExp);
	        if (_define) {
	          var target = _define[1] == 'uniform' ? uniforms : attributes;
	          var name = _define[4];
	          target[name] = { name: name, type: _define[3], conditional: conditional };
	        }
	      } else if (pair == '#endif') {
	        conditional = false;
	      } else if (pair == '#if') {
	        conditional = true;
	      }
	    }
	    return { uniforms: uniforms, attributes: attributes };
	  }

	  var GLUniformEntry = function () {
	    function GLUniformEntry(type, location, name) {
	      _classCallCheck(this, GLUniformEntry);

	      this.loc = location;
	      this.name = name;
	      this.type = type;
	      this.setGLValue = GLUniformSetters[type];
	      this._lastValue = 0;
	    }

	    GLUniformEntry.prototype.use = function use(gl, value, force) {
	      var type = this.type;
	      if (this.maybeInvalid(value, type) || force) {
	        this.setGLValue(gl, value, this.loc);
	        if (/(mat|vec)(2|3|4)/.test(type)) {
	          this._lastValue = new Float32Array(this._lastRef = value.elements);
	        } else {
	          this._lastRef = null;
	          this._lastValue = value;
	        }
	      }
	    };

	    GLUniformEntry.prototype.maybeInvalid = function maybeInvalid(val, type) {
	      var last = this._lastValue;
	      if (last) {
	        if (/(mat|vec)(2|3|4)/.test(type)) {
	          if (isObj(val) && val.elements) {
	            var next = val.elements;
	            var currentElements = last;
	            if (next != this._lastRef) {
	              return true;
	            }
	            for (var i = 0, len = currentElements.length; i < len; i++) {
	              if (currentElements[i] !== next[i]) {
	                return true;
	              }
	            }
	            return false;
	          }
	        } else if (/float|int/.test(type)) {
	          return val !== last;
	        }
	      }
	      return true;
	    };

	    GLUniformEntry.prototype.setGLValue = function setGLValue(gl, value, loc) {};

	    return GLUniformEntry;
	  }();

	  var GLUniformSetters = GLUniformEntry.setter = {
	    ivec4: function ivec4(gl, vec, loc) {
	      gl.uniform4fv(loc, vec);
	    },
	    ivec3: function ivec3(gl, vec, loc) {
	      gl.uniform3iv(loc, vec);
	    },
	    ivec2: function ivec2(gl, vec, loc) {
	      gl.uniform2iv(loc, vec);
	    },
	    vec4: function vec4(gl, vec, loc) {
	      gl.uniform4fv(loc, vec.elements);
	    },
	    vec3: function vec3(gl, vec, loc) {
	      gl.uniform3fv(loc, vec.elements);
	    },
	    vec2: function vec2(gl, vec, loc) {
	      gl.uniform2fv(loc, vec.elements);
	    },
	    mat4: function mat4(gl, mat, loc) {
	      gl.uniformMatrix4fv(loc, false, mat.elements);
	    },
	    mat3: function mat3(gl, mat, loc) {
	      gl.uniformMatrix3fv(loc, false, mat.elements);
	    },
	    mat2: function mat2(gl, mat, loc) {
	      gl.uniformMatrix2fv(loc, false, mat.elements);
	    },
	    float: function float(gl, f, loc) {
	      gl.uniform1f(loc, f);
	    },
	    sampler2D: function sampler2D(gl, index, loc) {
	      gl.uniform1i(loc, index);
	    },
	    samplerCube: function samplerCube(gl, index, loc) {
	      gl.uniform1i(loc, index);
	    },
	    int: function int(gl, i, loc) {
	      gl.uniform1i(loc, i);
	    },
	    bool: function bool(gl, i, loc) {
	      gl.uniform1i(loc, i ? 1 : 0);
	    }
	  };

	  var GLAttributeEntry = function GLAttributeEntry(type, loc, name) {
	    _classCallCheck(this, GLAttributeEntry);

	    var t = 1;
	    if (/vec([234])/.test(type)) {
	      t = +RegExp.$1;
	    }
	    this.size = t;
	    this.loc = loc;
	    this.name = name;
	    var format = WebGL_CONST.FLOAT;
	    if (/^(biu)/.test(type)) {
	      var s = RegExp.$1;
	      if (s == 'b') {
	        format = WebGL_CONST.BOOL;
	      } else if (s == 'i') {
	        format = WebGL_CONST.INT;
	      } else if (s == 'u') {
	        format = WebGL_CONST.UNSIGNED_INT;
	      }
	    }
	    this.textureFormat = format;
	  };

	  /**
	   * Created by brian on 04/12/2016.
	   */
	  /**
	   * @alias Flip.GL.Attribute
	   */


	  var GLAttribute = function (_GLResource6) {
	    _inherits(GLAttribute, _GLResource6);

	    function GLAttribute(arg) {
	      _classCallCheck(this, GLAttribute);

	      var _this32 = _possibleConstructorReturn(this, _GLResource6.call(this, arg));

	      _this32.offset = arg.offset;
	      _this32.stride = arg.stride;
	      _this32.data = arg.data;
	      return _this32;
	    }

	    GLAttribute.prototype.bindResource = function bindResource(gl, e) {
	      var buffer = this.data;
	      buffer.bind(gl, e);
	      if (buffer.dataInvalid) {
	        buffer.bufferData(gl, e);
	      }
	      var entry = e.glParam[this.name];
	      gl.enableVertexAttribArray(entry.loc);
	      gl.vertexAttribPointer(entry.loc, entry.size, entry.textureFormat, false, this.stride || 0, this.offset || 0);
	    };

	    GLAttribute.prototype.dispose = function dispose(state) {
	      if (this.data.canDispose) {
	        this.data.dispose(state);
	      }
	      _GLResource6.prototype.dispose.call(this, state);
	    };

	    GLAttribute.prototype.createGLHandle = function createGLHandle(gl) {
	      this.data.createGLHandle(gl);
	    };

	    GLAttribute.prototype.bufferData = function bufferData(gl) {
	      this.data.bufferData(gl);
	    };

	    GLAttribute.prototype.convertValidData = function convertValidData(data) {
	      var ret = void 0;
	      if (data instanceof GLBuffer) {
	        ret = data;
	      } else if (isTypedArray(data) || data instanceof Array) {
	        ret = new GLBuffer({ data: data, type: WebGL_CONST.ARRAY_BUFFER });
	      } else {
	        throw Error('invalid attribute data');
	      }
	      var buffer = this.data;
	      if (buffer instanceof GLBuffer) {
	        buffer.removeController(this);
	      }
	      ret.addController(this);
	      return ret;
	    };

	    return GLAttribute;
	  }(GLResource);

	  /**
	   * Created by brian on 04/12/2016.
	   */


	  var PRO_DYNAMIC = createPrivateMemberName('dynamic');
	  var PRO_VALUE = createPrivateMemberName('value');
	  /**
	   * @alias Flip.GL.Uniform
	   */

	  var GLUniform = function (_GLBinder2) {
	    _inherits(GLUniform, _GLBinder2);

	    function GLUniform(opt) {
	      _classCallCheck(this, GLUniform);

	      if (!opt) {
	        opt = {};
	      }

	      var _this33 = _possibleConstructorReturn(this, _GLBinder2.call(this, opt));

	      _this33.type = opt.type;
	      _this33.value = opt.value;
	      return _this33;
	    }

	    GLUniform.prototype.getValue = function getValue() {
	      throw Error('no value provided for:' + this.name);
	    };

	    GLUniform.prototype.bind = function bind(gl, state) {
	      bindUniform(gl, state, this);
	      setInvalid(this, false);
	    };

	    GLUniform.prototype.update = function update(state) {
	      _GLBinder2.prototype.update.call(this, state);
	      if (isInvalid(this)) {
	        state.task.invalid();
	      }
	    };

	    _createClass(GLUniform, [{
	      key: 'dynamic',
	      get: function get() {
	        return this[PRO_DYNAMIC];
	      }
	    }, {
	      key: 'value',
	      set: function set(v) {
	        var dynamic = isFunc(v);
	        if (dynamic) {
	          this.getValue = v;
	        } else {
	          this[PRO_VALUE] = convertUniformValue(v, this.type);
	        }
	        this[PRO_DYNAMIC] = dynamic;
	        setInvalid(this, true);
	      },
	      get: function get() {
	        return this[PRO_DYNAMIC] ? convertUniformValue(this.getValue(), this.type) : this[PRO_VALUE];
	      }
	    }]);

	    return GLUniform;
	  }(GLBinder);

	  GLUniform.prototype.constructor = GLUniform;

	  function convertUniformValue(value, type) {
	    if (/vec(2|3|4)/.test(type)) {
	      var num = +RegExp.$1;
	      if (value instanceof GLVec) {
	        return value.clone();
	      } else if (value instanceof Array) {
	        return new GLVec(value.slice(0, num));
	      } else if (value instanceof Float32Array) {
	        return new GLVec(value.subarray(0, num));
	      }
	      throw Error('cannot convert to vec' + num);
	    } else if (/mat(2|3|4)/.test(type)) {
	      return convertMat(value, +RegExp.$1);
	    } else if (type == 'int') {
	      return parseInt(value);
	    } else if (type == 'float') {
	      return +value;
	    }
	    return value;
	  }
	  function convertMat(mat, dimension) {
	    var elements = void 0;
	    var elementCount = dimension * dimension;
	    if (mat instanceof Array) {
	      elements = new Float32Array(mat);
	    } else if (mat.elements) {
	      if (!(mat.elements instanceof Float32Array)) {
	        elements = new Float32Array(mat.elements);
	      } else {
	        elements = mat.elements;
	      }
	    }
	    if (elements instanceof Float32Array) {
	      if (elementCount != elements.length) {
	        elements = elements.subarray(0, elementCount);
	      }
	    } else {
	      throw Error('cannot convert to mat' + dimension);
	    }
	    return { elements: elements, dimension: dimension };
	  }
	  function bindUniform(gl, state, uniform) {
	    var entry = state.glParam[uniform.name];
	    if (!entry) {
	      throw Error('no gl entry named:' + uniform.name);
	    }
	    entry.use(gl, uniform.value);
	  }

	  /**
	   * Created by brian on 04/12/2016.
	   */
	  var TEXTURE_PRO = createPrivateMemberName('texture');
	  /**
	   * @alias Flip.GL.Sampler2D
	   */

	  var GLSampler2D = function (_GLResource7) {
	    _inherits(GLSampler2D, _GLResource7);

	    function GLSampler2D(arg) {
	      _classCallCheck(this, GLSampler2D);

	      var _this34 = _possibleConstructorReturn(this, _GLResource7.call(this, arg));

	      _this34.flipY = arg.flipY !== false;
	      _this34.textureFormat = WebGL_CONST.RGB;
	      _this34.data = arg.data || arg.source;
	      _this34.texture = arg.texture instanceof GLTexture ? arg.texture : new GLTexture({
	        dataFormat: arg.dataFormat || WebGL_CONST.UNSIGNED_BYTE,
	        type: WebGL_CONST.TEXTURE_2D
	      });
	      _this34.textureParam = makeOptions(arg.textureParam, {
	        TEXTURE_MAG_FILTER: WebGL_CONST.LINEAR,
	        TEXTURE_MIN_FILTER: WebGL_CONST.LINEAR,
	        TEXTURE_WRAP_S: arg.textureRepeat ? WebGL_CONST.REPEAT : WebGL_CONST.CLAMP_TO_EDGE,
	        TEXTURE_WRAP_T: arg.textureRepeat ? WebGL_CONST.REPEAT : WebGL_CONST.CLAMP_TO_EDGE
	      });
	      _this34.dynamicSource = arg.dynamicSource;
	      return _this34;
	    }

	    GLSampler2D.prototype.checkGLHandle = function checkGLHandle(gl) {
	      this.texture.checkGLHandle(gl);
	    };

	    GLSampler2D.prototype.update = function update(state) {
	      if (this.dynamicSource) {
	        this.resetResource();
	      }
	    };

	    GLSampler2D.prototype.bindResource = function bindResource(gl, state) {
	      state.scene.bindSamplerTexture(gl, this.name, this.texture);
	    };

	    GLSampler2D.prototype.bufferData = function bufferData(gl) {
	      var source = this.data;
	      var tex = this.texture;
	      if (source) {
	        var format = this.textureFormat;
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
	        if (isCanvasLike(source) || isImageLike(source) || source instanceof HTMLVideoElement) {
	          gl.texImage2D(gl.TEXTURE_2D, 0, format, format, tex.dataFormat, source);
	        } else {
	          gl.texImage2D(gl.TEXTURE_2D, 0, format, source.width, source.height, 0, format, tex.dataFormat, source.data);
	        }
	        tex.useTexParam(gl, this.textureParam);
	      } else {
	        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, null);
	      }
	    };

	    GLSampler2D.prototype.dispose = function dispose(state) {
	      _GLResource7.prototype.dispose.call(this, state);
	      this.texture.removeController(this);
	      if (this.texture.canDispose) {
	        this.texture.dispose(state);
	      }
	    };

	    GLSampler2D.prototype.convertValidData = function convertValidData(source) {
	      var format = void 0;
	      if (isImageLike(source)) {
	        if (!source.complete) {
	          throw Error('image should be loaded before use');
	        }
	        format = WebGL_CONST.RGBA;
	      } else if (isCanvasLike(source)) {
	        format = WebGL_CONST.RGBA;
	      } else if (source instanceof HTMLVideoElement) {
	        format = WebGL_CONST.RGB;
	      } else if (isObjectSource(source)) {
	        format = source.format || WebGL_CONST.RGBA;
	        if (source.dataFormat && source.dataFormat != this.texture.dataFormat) {
	          throw Error('source data format:' + source.dataFormat + ' is not same as texture data format:' + this.texture.dataFormat);
	        }
	      } else if (!source) {
	        format = 0;
	      } else {
	        throw Error('invalid sampler2d source');
	      }
	      this.textureFormat = format;
	      return source;
	    };

	    _createClass(GLSampler2D, [{
	      key: 'texture',
	      set: function set(tex) {
	        if (this.texture != tex) {
	          if (this.texture) {
	            this.texture.removeController(this);
	          }
	          this[TEXTURE_PRO] = tex;
	          if (tex instanceof GLTexture) {
	            tex.addController(this);
	          }
	          this.resetResource();
	        }
	      },
	      get: function get() {
	        return this[TEXTURE_PRO];
	      }
	    }, {
	      key: 'source',
	      set: function set(v) {
	        this.data = v;
	      },
	      get: function get() {
	        return this.data;
	      }
	    }]);

	    return GLSampler2D;
	  }(GLResource);

	  GLSampler2D.prototype.constructor = GLSampler2D;
	  function isSampler2DSource(obj) {
	    return isImageLike(obj) || isCanvasLike(obj) || obj instanceof HTMLVideoElement || isObjectSource(obj);
	  }
	  function isObjectSource(source) {
	    return isObj(source) && isObj(source.data) && +source.width && +source.height && source.data.buffer instanceof ArrayBuffer;
	  }
	  function isImageLike(source) {
	    return source instanceof HTMLImageElement || source instanceof Image;
	  }
	  function isCanvasLike(source) {
	    return source instanceof HTMLCanvasElement || source instanceof ImageData;
	  }

	  /**
	   * Created by brian on 04/12/2016.
	   */
	  /**
	   * @alias Flip.GL.Scene
	   */

	  var GLScene = function (_GLRender) {
	    _inherits(GLScene, _GLRender);

	    function GLScene(arg) {
	      _classCallCheck(this, GLScene);

	      var _this35 = _possibleConstructorReturn(this, _GLRender.call(this, arg));

	      _this35.program = null;
	      _this35.fragShader = arg.fragShader;
	      _this35.vertexShader = arg.vertexShader;
	      _this35.define = objAssign({}, arg.define);
	      _this35.glParam = {};
	      _this35._samplerIndices = [];
	      _this35.programInfo = getGLProgramInfo(_this35.vertexShader + '\n' + _this35.fragShader);
	      return _this35;
	    }

	    GLScene.prototype.buildBinder = function buildBinder(binder) {
	      return _buildBinder(this.programInfo, binder);
	    };

	    GLScene.prototype.recursiveBuildBinder = function recursiveBuildBinder() {
	      var pInfo = this.programInfo;
	      buildRenderBinder(this);
	      this.findChild(function (r) {
	        return buildRenderBinder(r);
	      }, true);
	      function buildRenderBinder(render) {
	        render.binder = objAssign(render.binder, _buildBinder(pInfo, render.binder));
	      }

	      return this;
	    };

	    GLScene.prototype.update = function update(e) {
	      var _this36 = this;

	      if (!this.program) {
	        var gl = e.gl;
	        var program = this.program = createGLProgram(gl, this.vertexShader, this.fragShader, this.define);
	        var entries = getGLEntries(gl, program, this.programInfo);
	        this.glParam = objAssign({}, entries.uniforms, entries.attributes);
	        forEach(entries.uniforms, function (info, name) {
	          return (/sampler/.test(info.type) && _this36._samplerIndices.push(name)
	          );
	        });
	      }
	      this.updateGLRenderState(e);
	      _GLRender.prototype.update.call(this, e);
	    };

	    GLScene.prototype.render = function render(e) {
	      var program = this.program;
	      if (program) {
	        e.gl.useProgram(program);
	      }
	      this.updateGLRenderState(e);
	      _GLRender.prototype.render.call(this, e);
	    };

	    GLScene.prototype.bindSamplerTexture = function bindSamplerTexture(gl, samplerName, texture) {
	      var textureIndex = this._samplerIndices.indexOf(samplerName);
	      if (textureIndex > -1) {
	        var entry = this.glParam[samplerName];
	        texture.activeIndex(gl, textureIndex);
	        entry.use(gl, textureIndex);
	        return true;
	      }
	      return false;
	    };

	    GLScene.prototype.updateSelf = function updateSelf(e) {
	      this.updateGLRenderState(e);
	      _GLRender.prototype.updateSelf.call(this, e);
	    };

	    GLScene.prototype.updateGLRenderState = function updateGLRenderState(state) {
	      state.scene = this;
	      state.glParam = this.glParam;
	    };

	    return GLScene;
	  }(GLRender);

	  function _buildBinder(info, binder) {
	    var ret = {};
	    forEach(binder, function (value, name) {
	      var converted = void 0;
	      if (value instanceof GLBinder) {
	        converted = value;
	      } else {
	        var def = info.uniforms[name];
	        if (def) {
	          var type = def.type;
	          if (type == 'sampler2D') {
	            if (isSampler2DSource(value) || !value) {
	              converted = new GLSampler2D({ name: name, data: value });
	            } else if (isFunc(value)) {
	              converted = new GLBinder({ bind: value, name: name });
	            } else if (isObj(value)) {
	              converted = new GLSampler2D(objAssign({ name: name }, value));
	            }
	          } else if (type == 'samplerCube') {
	            throw Error('not support');
	          } else {
	            converted = new GLUniform({ name: name, type: type, value: value });
	          }
	        } else if (info.attributes.hasOwnProperty(name)) {
	          converted = new GLAttribute({ name: name, data: value });
	        } else if (isFunc(value)) {
	          converted = new GLBinder({ bind: value, name: name });
	        }
	      }
	      if (converted instanceof GLBinder) {
	        ret[name] = converted;
	      }
	    });

	    return ret;
	  }

	  /**
	   * Created by brian on 05/12/2016.
	   */
	  /**
	   * @alias Flip.GL.Task
	   */

	  var GLRenderTask = function (_RenderTask) {
	    _inherits(GLRenderTask, _RenderTask);

	    function GLRenderTask(arg) {
	      _classCallCheck(this, GLRenderTask);

	      var _this37 = _possibleConstructorReturn(this, _RenderTask.call(this, arg));

	      _this37.canvas = arg.canvas;
	      _this37._textureIndices = [];
	      _this37._maxTextureIndex = 0;
	      _this37.clear = arg.clear;
	      return _this37;
	    }

	    GLRenderTask.prototype.init = function init(glOptions) {
	      _RenderTask.prototype.init.call(this);
	      var gl = this.gl = this.canvas.getContext('webgl', glOptions) || this.canvas.getContext('experimental-webgl', glOptions);
	      this._maxTextureIndex = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
	      if (!gl) {
	        console.error('webgl not support');
	      }
	      this.supportWebGL = !!gl;
	    };

	    GLRenderTask.prototype.render = function render(state) {
	      this.updateRenderState(state);
	      if (this.clear) {
	        state.gl.clear(this.clear);
	      }
	      _RenderTask.prototype.render.call(this, state);
	    };

	    GLRenderTask.prototype.updateRenderState = function updateRenderState(state) {
	      state.gl = this.gl;
	      state.supportWebGL = this.supportWebGL;
	    };

	    GLRenderTask.prototype.update = function update(state) {
	      this.updateRenderState(state);
	      _RenderTask.prototype.update.call(this, state);
	    };

	    GLRenderTask.prototype.getFramebufferTextureIndex = function getFramebufferTextureIndex(name) {
	      var index = this._textureIndices.indexOf(name);
	      if (index == -1) {
	        this._textureIndices.push(name);
	        index = this._textureIndices.length - 1;
	      }
	      return this._maxTextureIndex - 1 - index;
	    };

	    return GLRenderTask;
	  }(RenderTask);

	  /**
	   * Created by brian on 25/01/2017.
	   */
	  /**
	   * @alias Flip.GL.Stage
	   */


	  var GLStage = function (_GLRender2) {
	    _inherits(GLStage, _GLRender2);

	    function GLStage(arg) {
	      _classCallCheck(this, GLStage);

	      var _this38 = _possibleConstructorReturn(this, _GLRender2.call(this, arg));

	      _this38.sceneMap = {};
	      var scenes = _this38.createScenes(arg || {});
	      scenes.forEach(function (scene) {
	        scene.recursiveBuildBinder();
	        _this38.add(scene);
	        _this38.sceneMap[scene.name] = scene;
	      });
	      return _this38;
	    }

	    GLStage.prototype.getScene = function getScene(name) {
	      return this.sceneMap[name];
	    };

	    GLStage.prototype.createScenes = function createScenes(config) {
	      return [];
	    };

	    GLStage.prototype.setVecUniform = function setVecUniform(render, name, value) {
	      if (isStr(render)) {
	        render = this.getScene(render);
	      }
	      var uniform = render.binder[name];
	      if (typeof value === "number") {
	        uniform.value = value;
	      } else if (isObj(value)) {
	        var vec = uniform.value;
	        uniform.value = value instanceof Array ? vec.set(value[0], value[1], value[2], value[3]) : vec.set(value);
	      }
	      return this.invalid();
	    };

	    return GLStage;
	  }(GLRender);

	  /**
	   * Created by brian on 10/02/2017.
	   */


	  var floatView = new Float32Array(1);
	  var int32View = new Int32Array(floatView.buffer);
	  /**
	   *
	   * @memberOf Flip.GL
	   * @param binary
	   * @returns {number}
	   */
	  function decodeHalfFloat(binary) {
	    var exponent = (binary & 0x7C00) >> 10;
	    var fraction = binary & 0x03FF;
	    return (binary >> 15 ? -1 : 1) * (exponent ? exponent === 0x1F ? fraction ? NaN : Infinity : Math.pow(2, exponent - 15) * (1 + fraction / 0x400) : 6.103515625e-5 * (fraction / 0x400));
	  }
	  /**
	   * @memberOf Flip.GL
	   * @param number
	   * @returns {number}
	   */
	  function encodeHalfFloat(number) {
	    floatView[0] = number;
	    var fbits = int32View[0];
	    var sign = fbits >> 16 & 0x8000; // sign only
	    var val = (fbits & 0x7fffffff) + 0x1000; // rounded value

	    if (val >= 0x47800000) {
	      // might be or become NaN/Inf
	      if ((fbits & 0x7fffffff) >= 0x47800000) {
	        // is or must become NaN/Inf
	        if (val < 0x7f800000) {
	          // was value but too large
	          return sign | 0x7c00; // make it +/-Inf
	        }
	        return sign | 0x7c00 | // remains +/-Inf or NaN
	        (fbits & 0x007fffff) >> 13; // keep NaN (and Inf) bits
	      }
	      return sign | 0x7bff; // unrounded not quite Inf
	    }
	    if (val >= 0x38800000) {
	      // remains normalized value
	      return sign | val - 0x38000000 >> 13; // exp - 127 + 15
	    }
	    if (val < 0x33000000) {
	      // too small for subnormal
	      return sign; // becomes +/-0
	    }
	    val = (fbits & 0x7fffffff) >> 23; // tmp exp for subnormal calc
	    return sign | (fbits & 0x7fffff | 0x800000) + ( // add subnormal bit
	    0x800000 >>> val - 102) // round depending on cut off
	    >> 126 - val; // div by 2^(1-(exp-127+15)) and >> 13 | exp=0
	  }

	  /**
	   * @alias Flip.GL.Camera
	   */

	  var GLCamera = function (_GLBinder3) {
	    _inherits(GLCamera, _GLBinder3);

	    function GLCamera(opt) {
	      _classCallCheck(this, GLCamera);

	      var _this39 = _possibleConstructorReturn(this, _GLBinder3.call(this, opt));

	      _this39.viewMatrixUniformName = opt.viewMatrixUniformName;
	      _this39.projectionMatrixUniformName = opt.projectionMatrixUniformName;
	      _this39.viewProjectionMatrixUniformName = opt.viewProjectionMatrixUniformName;
	      _this39.lookAt = opt.lookAt || [0, 0, 0];
	      _this39.position = opt.position || [0, 0, 2];
	      _this39.up = opt.up || [0, 1, 0];
	      _this39.perspective = opt.perspective || [Math.PI / 6, 1, 1, 3];
	      return _this39;
	    }

	    GLCamera.prototype.bind = function bind(gl, state) {
	      var vpEntry = state.glParam[this.viewProjectionMatrixUniformName];
	      if (vpEntry) {
	        vpEntry.use(gl, this.viewProjectionMatrix);
	      } else {
	        var vEntry = state.glParam[this.viewMatrixUniformName],
	            pEntry = state.glParam[this.projectionMatrixUniformName];
	        if (vEntry && pEntry) {
	          vEntry.use(gl, this.viewMatrix);
	          pEntry.use(gl, this.projectionMatrix);
	        }
	      }
	    };

	    GLCamera.prototype.setPerspective = function setPerspective(fovy, aspect, near, far) {
	      this.fovy = fovy;
	      this.aspect = aspect;
	      this.zNear = near;
	      this.zFar = far;
	      this.resetMatrix();
	      return this;
	    };

	    GLCamera.prototype.resetMatrix = function resetMatrix() {
	      this._projectionMatrix = null;
	      this._viewMatrix = null;
	      this._vpMatrix = null;
	      this.invalid();
	    };

	    _createClass(GLCamera, [{
	      key: 'viewMatrix',
	      get: function get() {
	        var mat = this._viewMatrix;
	        if (!mat) {
	          mat = Matrix4.fromLookAt(this.position, this.lookAt, this.up);
	          this._viewMatrix = mat;
	          this._vpMatrix = null;
	        }
	        return mat;
	      }
	    }, {
	      key: 'projectionMatrix',
	      get: function get() {
	        var mat = this._projectionMatrix;
	        if (!mat) {
	          mat = Matrix4.fromPerspective(this.fovy, this.aspect, this.zNear, this.zFar);
	          this._projectionMatrix = mat;
	          this._vpMatrix = null;
	        }
	        return mat;
	      }
	    }, {
	      key: 'viewProjectionMatrix',
	      get: function get() {
	        var mat = this._vpMatrix;
	        if (!mat) {
	          mat = this._vpMatrix = this.projectionMatrix.concat(this.viewMatrix);
	        }
	        return mat;
	      }
	    }, {
	      key: 'position',
	      set: function set(vec) {
	        this.posX = vec[0];
	        this.posY = vec[1];
	        this.posZ = vec[2];
	      },
	      get: function get() {
	        return [this.posX, this.posY, this.posZ];
	      }
	    }, {
	      key: 'lookAt',
	      set: function set(vec) {
	        this.targetX = vec[0];
	        this.targetY = vec[1];
	        this.targetZ = vec[2];
	      },
	      get: function get() {
	        return [this._targetX, this._targetY, this._targetZ];
	      }
	    }, {
	      key: 'up',
	      get: function get() {
	        return [this._upX, this._upY, this._upZ];
	      },
	      set: function set(vec) {
	        this.upX = vec[0];
	        this.upY = vec[1];
	        this.upZ = vec[2];
	      }
	    }, {
	      key: 'perspective',
	      set: function set(val) {
	        if (val instanceof Array) {
	          this.setPerspective.apply(this, val);
	        } else if (isObj(val)) {
	          this.setPerspective(val.fovy, val.aspect, val.zNear || val.near, val.zFar || val.far);
	        }
	      },
	      get: function get() {
	        return [this._fovy, this._aspect, this._zNear, this._zFar];
	      }
	    }, {
	      key: 'lookDirection',
	      get: function get() {
	        return [this._targetX - this.posX, this._targetY - this.posY, this._targetZ - this.posZ];
	      }
	    }]);

	    return GLCamera;
	  }(GLBinder);

	  var numberProperties = ['zNear', 'zFar', 'fovy', 'aspect', 'targetX', 'targetY', 'targetZ', 'posX', 'posY', 'posZ', 'upX', 'upY', 'upZ'];
	  numberProperties.forEach(function (name) {
	    defNumberProperty(GLCamera.prototype, name);
	  });
	  function defNumberProperty(obj, name) {
	    var privateName = '_' + name;
	    Object.defineProperty(obj, name, {
	      get: function get() {
	        return this[privateName];
	      },
	      set: function set(val) {
	        if (isNaN(val)) {
	          throw Error('property ' + name + ' value should be number');
	        }
	        if (val != this[privateName]) {
	          this[privateName] = +val;
	          this.resetMatrix();
	          this.invalid();
	        }
	      }
	    });
	  }

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  var GL = objAssign({
	    Scene: GLScene,
	    Task: GLRenderTask,
	    Mesh: GLMesh,
	    Sampler2D: GLSampler2D,
	    Attribute: GLAttribute,
	    FrameBuffer: GLFrameBuffer,
	    Uniform: GLUniform,
	    Texture: GLTexture,
	    Render: GLRender,
	    Buffer: GLBuffer,
	    Binder: GLBinder,
	    Vec: GLVec,
	    Stage: GLStage,
	    ComputeMesh: GLComputeMesh,
	    Camera: GLCamera,
	    decodeHalfFloat: decodeHalfFloat, encodeHalfFloat: encodeHalfFloat,
	    Matrix4: Matrix4
	  }, WebGL_CONST);

	  /**
	   * Created by brian on 02/12/2016.
	   */
	  Flip.GL = GL;
	  objAssign(Flip, lib);
	});
	//# sourceMappingURL=bundle-gl.js.map

/***/ })
]);
