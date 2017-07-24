define(['exports', '../react', '../react-dom'], function (exports, _react, _reactDom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.bootstrap = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

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
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var CustomTextInput = function (_React$Component) {
        _inherits(CustomTextInput, _React$Component);

        function CustomTextInput(props) {
            _classCallCheck(this, CustomTextInput);

            var _this = _possibleConstructorReturn(this, (CustomTextInput.__proto__ || Object.getPrototypeOf(CustomTextInput)).call(this, props));

            _this.focus = function () {
                _this.textInput.focus();
            };

            _this.state = {};
            return _this;
        }

        _createClass(CustomTextInput, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', { type: 'text', ref: function ref(input) {
                            _this2.textInput = input;
                        } }),
                    _react2.default.createElement('input', { type: 'button', value: 'Focus the text input', onClick: this.focus })
                );
            }
        }]);

        return CustomTextInput;
    }(_react2.default.Component);

    var AutoFocusTextInput = function (_React$Component2) {
        _inherits(AutoFocusTextInput, _React$Component2);

        function AutoFocusTextInput() {
            _classCallCheck(this, AutoFocusTextInput);

            return _possibleConstructorReturn(this, (AutoFocusTextInput.__proto__ || Object.getPrototypeOf(AutoFocusTextInput)).apply(this, arguments));
        }

        _createClass(AutoFocusTextInput, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.textInput.focus();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this4 = this;

                return _react2.default.createElement(CustomTextInput, { ref: function ref(input) {
                        _this4.textInput = input;
                    } });
            }
        }]);

        return AutoFocusTextInput;
    }(_react2.default.Component);

    function MyFunctionalComponent() {
        return _react2.default.createElement('input', null);
    }

    var Parent = function (_React$Component3) {
        _inherits(Parent, _React$Component3);

        function Parent() {
            _classCallCheck(this, Parent);

            return _possibleConstructorReturn(this, (Parent.__proto__ || Object.getPrototypeOf(Parent)).apply(this, arguments));
        }

        _createClass(Parent, [{
            key: 'render',
            value: function render() {
                var _this6 = this;

                return _react2.default.createElement(MyFunctionalComponent, { ref: function ref(input) {
                        _this6.textInput = input;
                    } });
            }
        }]);

        return Parent;
    }(_react2.default.Component);

    function CustomTextInputFun(props) {
        var textInput = null;

        function handleClick() {
            textInput.focus();
        }

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', { type: 'text', ref: function ref(input) {
                    textInput = input;
                } }),
            _react2.default.createElement('input', { type: 'button', value: 'Focus the text input', onClick: handleClick })
        );
    }

    var App = function (_React$Component4) {
        _inherits(App, _React$Component4);

        function App(props) {
            _classCallCheck(this, App);

            var _this7 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this7.state = {};
            return _this7;
        }

        _createClass(App, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(CustomTextInput, null),
                    _react2.default.createElement(AutoFocusTextInput, null),
                    _react2.default.createElement(CustomTextInputFun, null)
                );
            }
        }]);

        return App;
    }(_react2.default.Component);

    function bootstrap() {
        _reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));
    }

    exports.bootstrap = bootstrap;
});