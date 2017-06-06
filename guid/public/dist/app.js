define(['exports', './react', './react-dom', './pops'], function (exports, _react, _reactDom, _pops) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var App = function (_React$Component) {
        _inherits(App, _React$Component);

        function App(props) {
            _classCallCheck(this, App);

            var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.newRolePop = function () {
                var newRoleCreated = function newRoleCreated(data) {
                    var roleName = data.roleName;
                    roleName && _this.setState({ roleName: roleName });
                };

                _reactDom2.default.render(_react2.default.createElement(_pops.NewRolePop, { newRoleCreated: newRoleCreated }), document.getElementById('pop'));
            };

            _this.newRoleCreatedHandler = function (data) {
                var roleName = data.roleName;
                roleName && _this.state({ roleName: roleName });
            };

            _this.state = {};
            return _this;
        }

        _createClass(App, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        null,
                        this.state.roleName
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'new-role' },
                        _react2.default.createElement(
                            'button',
                            { className: 'new-role-btn', onClick: this.newRolePop },
                            '\u65B0\u5EFA\u89D2\u8272'
                        )
                    )
                );
            }
        }]);

        return App;
    }(_react2.default.Component);

    exports.default = App;
});