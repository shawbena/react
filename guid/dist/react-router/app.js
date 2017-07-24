define(['exports', '../react', '../react-dom', '../react-router-dom', '../history', './home', './newsFeed', './nav'], function (exports, _react, _reactDom, _reactRouterDom, _history, _home, _newsFeed, _nav) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.bootstrap = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _home2 = _interopRequireDefault(_home);

    var _newsFeed2 = _interopRequireDefault(_newsFeed);

    var _nav2 = _interopRequireDefault(_nav);

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

    var history = (0, _history.createBrowserHistory)();
    function Info(props) {
        return _react2.default.createElement(
            'div',
            { id: 'about' },
            _react2.default.createElement(
                'div',
                null,
                'Info Page'
            ),
            _react2.default.createElement(
                'div',
                null,
                props.children
            )
        );
    }
    function Message(props) {
        return _react2.default.createElement(
            'div',
            { id: 'alarm' },
            'Message Page'
        );
    }
    function Order(props) {
        return _react2.default.createElement(
            'div',
            { id: 'order' },
            'Order Page'
        );
    }
    function Flow(props) {
        return _react2.default.createElement(
            'div',
            { id: 'flow' },
            'Flow Page'
        );
    }
    function Alarm(props) {
        return _react2.default.createElement(
            'div',
            { id: 'alarm' },
            'Alarm Page'
        );
    }

    var App = function (_React$Component) {
        _inherits(App, _React$Component);

        function App(props) {
            _classCallCheck(this, App);

            var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.state = {};
            return _this;
        }

        _createClass(App, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    _reactRouterDom.BrowserRouter,
                    { history: history },
                    _react2.default.createElement(
                        'div',
                        { className: 'react-root' },
                        _react2.default.createElement(_reactRouterDom.Route, { component: _nav2.default }),
                        _react2.default.createElement(
                            _reactRouterDom.Route,
                            { path: '/info', component: Info },
                            _react2.default.createElement(_reactRouterDom.Route, { path: 'message', component: Message })
                        ),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/order', component: Order }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/flow', component: Flow }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/alarm', component: Alarm })
                    )
                );
            }
        }]);

        return App;
    }(_react2.default.Component);

    function bootstrap() {
        _reactDom2.default.render(_react2.default.createElement(App, null), document.querySelector('#app'));
    }
    exports.bootstrap = bootstrap;
});