define([], function () {
    'use strict';

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

    function UserGreeting(props) {
        return React.createElement(
            'h1',
            null,
            'Welcome back!'
        );
    }

    function GuestGreeting(props) {
        return React.createElement(
            'h1',
            null,
            'Please sign up.'
        );
    }

    function Greeting(props) {
        var isLoggedIn = props.isLoggedIn;
        if (isLoggedIn) {
            return React.createElement(UserGreeting, null);
        }
        return React.createElement(GuestGreeting, null);
    }

    ReactDOM.render(React.createElement(Greeting, { isLoggedIn: true }), document.getElementById('app'));

    function LoginButton(props) {
        return React.createElement(
            'button',
            { onClick: props.onClick },
            'Login'
        );
    }
    function LogoutButton(props) {
        return React.createElement(
            'button',
            { onClick: props.onClick },
            'Logout'
        );
    }

    var LoginControl = function (_React$Component) {
        _inherits(LoginControl, _React$Component);

        function LoginControl(props) {
            _classCallCheck(this, LoginControl);

            var _this = _possibleConstructorReturn(this, (LoginControl.__proto__ || Object.getPrototypeOf(LoginControl)).call(this, props));

            _this.handleLoginClick = function () {
                _this.setState({ isLoggedIn: true });
            };

            _this.handlerLogoutClick = function () {
                _this.setState({ isLoggedIn: false });
            };

            _this.state = { isLoggedIn: false };
            return _this;
        }

        _createClass(LoginControl, [{
            key: 'render',
            value: function render() {
                var isLoggedIn = this.state.isLoggedIn;

                var button = null;
                if (isLoggedIn) {
                    button = React.createElement(LogoutButton, { onClick: this.handlerLogoutClick });
                } else {
                    button = React.createElement(LoginButton, { onClick: this.handleLoginClick });
                }

                return React.createElement(
                    'div',
                    null,
                    React.createElement(Greeting, { isLoggedIn: isLoggedIn }),
                    button
                );
            }
        }]);

        return LoginControl;
    }(React.Component);

    ReactDOM.render(React.createElement(LoginControl, null), document.getElementById('app'));
});