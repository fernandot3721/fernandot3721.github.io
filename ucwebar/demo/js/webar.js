webpackJsonp([2, 0], [
    /* 0 */
    /***/ (function (module, exports, __webpack_require__) {

        'use strict';
        var _YUVFilter = __webpack_require__(4);

        var filter = new _YUVFilter.YUVFilter();
        var canvas = Flip.$('#gl-cvs');

        function calFPS(global) {

            var now = Date.now();
            var samples = [];
            global.on('frameStart', function () {
                samples.push(Date.now() - now);
                if (samples.length > 30) {
                    samples.shift();
                }
                var sum = 0;
                samples.forEach(function (a) {
                    return sum += a;
                });
                var avg = sum / samples.length;
                Flip.$('.fps').textContent = 'render time:' + parseInt(avg) + ' ms    FPS:' + parseInt(1000 / avg);
                now = Date.now();
            });
        }

        function setupRender() {
            // requestAnimationFrame(loop);
            var task = new Flip.GL.Task({
                canvas: canvas,
                name: 'gl-task'
            });
            task.add(filter);
            Flip.instance.add(task);
            calFPS(Flip.instance);
        }

        function renderFrame(frames) {
            if (frames.length === 3) {
                filter.setSource(frames[0], frames[1], frames[2]);
                var _frames$ = frames[0],
                    width = _frames$.width,
                    height = _frames$.height;

                if (canvas.width !== width) {
                    canvas.width = width;
                    canvas.height = height;
                    var gl = canvas.getContext('webgl');
                    gl.viewport(0, 0, width, height);
                }
            }
        }

        init(setupRender, renderFrame);

        /***/
    }),
    /* 1 */
    /***/ (function (module, exports) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }

        var DEF_VERTEX_SHADER = function DEF_VERTEX_SHADER(name) {
            return '\nprecision mediump float;\n\nattribute vec2 aQuad;\nvarying vec2 ' + name + ';\nuniform bool uFlipXCoord;\nuniform mat3 uFilterRegionTransform;\n\nvoid main(){\n   vec2 texIndex = aQuad /2. +.5;\n   if(uFlipXCoord)\n    texIndex.x = 1. - texIndex.x;\n   ' + name + ' = texIndex;\n   vec3 pos = uFilterRegionTransform * vec3(aQuad,1.0);\n   gl_Position = vec4(pos.xy,0.0,1.0);\n}\n';
        };
        /**
         * Created by brian on 06/03/2017.
         */

        var DEF_FRAGMENT_SHADER = function DEF_FRAGMENT_SHADER(texcoordName, program) {
            return '\nprecision mediump float;\n\nvarying vec2 ' + texcoordName + ';\n\n' + program + '\n';
        };
        var COPY_PROGRAM = '\nuniform sampler2D uSampler;\n\nvoid main(){\n  gl_FragColor = texture2D(uSampler,vTexIndex);\n}\n';

        var GLFilter = exports.GLFilter = function (_Flip$GL$Scene) {
            _inherits(GLFilter, _Flip$GL$Scene);

            function GLFilter(arg) {
                _classCallCheck(this, GLFilter);

                var texcoordName = arg.texCoordName || 'vTexIndex';
                var program = arg.program || COPY_PROGRAM;

                var _this = _possibleConstructorReturn(this, _Flip$GL$Scene.call(this, {
                    vertexShader: DEF_VERTEX_SHADER(texcoordName),
                    fragShader: DEF_FRAGMENT_SHADER(texcoordName, program),
                    define: arg.define,
                    name: arg.name
                }));

                _this.addBinder(_this.buildBinder(arg.binder));
                var binders = {
                    aQuad: [-1, -1, 1, -1, -1, 1, 1, 1],
                    uFlipXCoord: false,
                    uFilterRegionTransform: new Flip.Mat3()
                };
                if (program === COPY_PROGRAM) {
                    binders.uSampler = null;
                }
                _this.addBinder(_this.buildBinder(binders));

                var fb = void 0;
                if (arg.framebuffer instanceof Flip.GL.FrameBuffer) {
                    fb = arg.framebuffer;
                } else {
                    fb = new Flip.GL.FrameBuffer(arg.framebuffer || {name: 'filter-fbo'});
                }
                _this.fbo = fb;
                _this.createMeshes(arg).forEach(function (mesh) {
                    if (!(mesh instanceof Flip.GL.Mesh)) {
                        mesh = new Flip.GL.Mesh(_extends(mesh, {
                            drawCount: GLFilter.drawCount,
                            primitive: GLFilter.primitive
                        }));
                    }
                    _this.add(mesh);
                });
                return _this;
            }

            GLFilter.prototype.transformFilterRegion = function transformFilterRegion(mat3) {
                if (!(mat3 instanceof Flip.Mat3)) {
                    throw Error('expect to be instance of Flip.Mat3');
                }
                this.binder['uFilterRegionTransform'].value = mat3.clone();
                this.invalid();
            };

            GLFilter.prototype.createMeshes = function createMeshes() {
                return [{}];
            };

            GLFilter.prototype.setSource = function setSource(source, name, dynamic) {
                var sampler = this.binder[name];
                sampler.data = source;
                sampler.dynamicSource = dynamic;
                this.invalid();
            };

            GLFilter.prototype.getTargetFBOOwner = function getTargetFBOOwner() {
                return this;
            };

            GLFilter.prototype.setTarget = function setTarget(target, samplerName) {
                var fbo = this.fbo;
                if (this.target) {
                    this.target.removeBinder(this._targetBinder);
                }
                if (!samplerName) {
                    samplerName = 'uSampler';
                }
                var sampler = this._targetBinder = fbo.createSampler2D(samplerName, false);
                sampler.name = samplerName;
                this.target = target;
                var owner = this.getTargetFBOOwner();
                if (target) {
                    owner.addBinder(fbo);
                    target.removeBinder(samplerName);
                    target.addBinder(sampler);
                } else {
                    owner.removeBinder(fbo);
                }
            };

            GLFilter.prototype.dispose = function dispose(e) {
                _Flip$GL$Scene.prototype.dispose.call(this, e);
                this.fbo.dispose(e);
            };

            _createClass(GLFilter, [{
                key: 'sourceBinder',
                get: function get () {
                    return this.binder['uSampler'];
                }
            }, {
                key: 'source',
                set: function set (v) {
                    var binder = this.sourceBinder;
                    binder.source = v;
                    var isVideo = v instanceof HTMLVideoElement;
                    binder.dynamicSource = isVideo;
                    this.binder['uFlipXCoord'].value = isVideo;
                    if (isVideo) {
                        this.size = [v.videoWidth, v.videoHeight];
                    } else if (v) {
                        this.size = [v.width, v.height];
                    }
                }
            }, {
                key: 'size',
                get: function get () {
                    return this._size;
                },
                set: function set (size) {
                    this._size = [size[0], size[1]];
                }
            }]);

            return GLFilter;
        }(Flip.GL.Scene);

        GLFilter.primitive = Flip.GL.TRIANGLE_STRIP;
        GLFilter.drawCount = 4;

        /***/
    }),
    /* 2 */,
    /* 3 */,
    /* 4 */
    /***/ (function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.YUVFilter = undefined;

        var _GLFilter2 = __webpack_require__(1);

        function _defaults(obj, defaults) {
            var keys = Object.getOwnPropertyNames(defaults);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = Object.getOwnPropertyDescriptor(defaults, key);
                if (value && value.configurable && obj[key] === undefined) {
                    Object.defineProperty(obj, key, value);
                }
            }
            return obj;
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
        }

        /**
         * Created by brian on 19/06/2017.
         */


        var YUVFilter = exports.YUVFilter = function (_GLFilter) {
            _inherits(YUVFilter, _GLFilter);

            function YUVFilter() {
                _classCallCheck(this, YUVFilter);

                var _this = _possibleConstructorReturn(this, _GLFilter.call(this, {program: program}));

                _this.addBinder(_this.buildBinder({
                    uYTex: null,
                    uUTex: null,
                    uVTex: null
                }));
                //this.transformFilterRegion(new Flip.Mat3().rotate(Math.PI / 2))
                return _this;
            }

            YUVFilter.prototype.setSource = function setSource(y, u, v) {
                this.binder['uYTex'].source = createSource(y, Flip.GL.LUMINANCE);
                this.binder['uUTex'].source = createSource(u, Flip.GL.LUMINANCE);
                this.binder['uVTex'].source = createSource(v, Flip.GL.LUMINANCE);
            };

            return YUVFilter;
        }(_GLFilter2.GLFilter);

        function createSource(frameData, format) {
            var data = frameData.data;
            if (data instanceof ArrayBuffer) {
                data = new Uint8Array(data);
            }
            return {data: data, width: frameData.width, height: frameData.height, format: format};
        }

        // var program = '\nuniform sampler2D uYTex;\nuniform sampler2D uUTex;\nuniform sampler2D uVTex;\n\nconst mat3 mYUV2RGB=mat3(1.,1.,1.  ,0.,-.337633,1.732446, 1.370705,0.698001,0.);\nvoid main(){\n  float Y = texture2D(uYTex,vTexIndex).r;\n  float U = texture2D(uUTex,vTexIndex).r;\n  float V = texture2D(uVTex,vTexIndex).r;\n  float y = 1.1643*(Y-0.0625);\n  float u = U-0.5;\n  float v = V-0.5;\n  float r = y+1.5958*v;\n  float g = y-0.39173*u-0.81290*v;\n  float b = y+2.017*u;\n  gl_FragColor = vec4(r,g,b,1.0);\n  \n  /*vec3 yuv = vec3(texture2D(uYTex,vTexIndex).r,texture2D(uUTex,vTexIndex).r - 0.5,texture2D(uVTex,vTexIndex).r-0.5);\n  gl_FragColor = vec4(mYUV2RGB * yuv,1.0);*/\n}\n';
        var program = '\nuniform sampler2D uYTex;\nuniform sampler2D uUTex;\nuniform sampler2D uVTex;\n\nvoid main(){\n  float Y = texture2D(uYTex,vTexIndex).r;\n  float U = texture2D(uUTex,vTexIndex).r;\n  float V = texture2D(uVTex,vTexIndex).r;\n  float y = 1.1643*(Y-0.0625);\n  float u = U-0.5;\n  float v = V-0.5;\n  float r = y+1.5958*v;\n  float g = y-0.39173*u-0.81290*v;\n  float b = y+2.017*u;\n  gl_FragColor = vec4(r,g,b,1.0);\n}\n';

        /***/
    })
]);
