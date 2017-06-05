define(['exports', '../react', '../react-dom', './WarningButton', './Pop', './Greeting', './MyComponent', './MyContainer', './MixedComponent'], function (exports, _react, _reactDom, _WarningButton, _Pop, _Greeting, _MyComponent, _MyContainer, _MixedComponent) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _WarningButton2 = _interopRequireDefault(_WarningButton);

    var _Greeting2 = _interopRequireDefault(_Greeting);

    var _MyComponent2 = _interopRequireDefault(_MyComponent);

    var _MixedComponent2 = _interopRequireDefault(_MixedComponent);

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

    var App = function (_React$Component) {
        _inherits(App, _React$Component);

        function App() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, App);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.showPopHandler = function () {
                _reactDom2.default.render(_react2.default.createElement(_Pop.Pop, { id: 'new_role_pop', title: '\u65B0\u5EFA\u89D2\u8272', childPop: _Pop.NewRolePop }), document.getElementById('pop'));
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(App, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_WarningButton2.default, null),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'button',
                            { onClick: this.showPopHandler },
                            '\u663E\u793A\u5F39\u7A97'
                        )
                    ),
                    _react2.default.createElement(MyTextBox, { autocomplete: true }),
                    _react2.default.createElement(App1, null),
                    _react2.default.createElement(App2, null),
                    _react2.default.createElement(
                        _MyComponent2.default,
                        null,
                        'Hello world!'
                    ),
                    _react2.default.createElement(
                        _MyComponent2.default,
                        null,
                        _react2.default.createElement(
                            'div',
                            null,
                            'This is valid HTML & JSX at the same time.'
                        )
                    ),
                    _react2.default.createElement(SameDiv, null),
                    _react2.default.createElement(
                        _MyContainer.MyContainer,
                        null,
                        _react2.default.createElement(_MyContainer.MyFirstComponent, null),
                        _react2.default.createElement(_MyContainer.MySecondComponent, null)
                    ),
                    _react2.default.createElement(
                        _MixedComponent2.default,
                        null,
                        'aaaaaa'
                    )
                );
            }
        }]);

        return App;
    }(_react2.default.Component);

    function getGreeting(user) {
        if (user) {
            return _react2.default.createElement(
                'h1',
                null,
                'Hello, ',
                formatName(user),
                '!'
            );
        }
        return _react2.default.createElement(
            'h1',
            null,
            'Hello, Stranger.'
        );
    }
    function formatName() {}

    var div = _react2.default.createElement('div', { className: 'sidebar' });

    function MyTextBox(props) {
        return _react2.default.createElement(
            'div',
            { className: 'my-text-box' },
            _react2.default.createElement('input', { type: 'text', autoComplete: props.autocomplete })
        );
    }

    function App1() {
        return _react2.default.createElement(_Greeting2.default, { firstName: 'Ben', lastName: 'Hector' });
    }

    function App2() {
        var propps = { firstName: 'Ben', lastName: 'Hector' };
        return _react2.default.createElement(_Greeting2.default, propps);
    }

    function SameDiv() {
        return _react2.default.createElement(
            'div',
            { className: 'same-div' },
            _react2.default.createElement(
                'div',
                null,
                'Hello World'
            ),
            _react2.default.createElement(
                'div',
                null,
                'Hello World'
            ),
            _react2.default.createElement(
                'div',
                null,
                'Hello World'
            ),
            _react2.default.createElement(
                'div',
                null,
                'Hello World'
            )
        );
    }

    exports.default = App;
});