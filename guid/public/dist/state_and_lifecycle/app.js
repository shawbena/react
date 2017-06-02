'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function tick() {
    var element = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Hello, world!'
        ),
        React.createElement(
            'h2',
            null,
            'It is ',
            new Date().toLocaleTimeString(),
            '.'
        )
    );

    ReactDOM.render(element, document.getElementById('root'));
}

function Clock1(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Hello, world!'
        ),
        React.createElement(
            'h2',
            null,
            'It is ',
            new Date().toLocaleTimeString(),
            '.'
        )
    );
}

function tick2() {
    ReactDOM.render(React.createElement(Clock1, null), document.getElementById('root2'));
}

var Clock = function (_React$Component) {
    _inherits(Clock, _React$Component);

    function Clock(props) {
        _classCallCheck(this, Clock);

        var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

        _this.state = { date: new Date() };
        return _this;
    }

    _createClass(Clock, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Hello, world!'
                ),
                React.createElement(FormattedDate, { date: this.state.date })
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.timerID = setInterval(function () {
                _this2.tick();
                console.log(_this2);
            }, 1000);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.timerID);
        }
    }, {
        key: 'tick',
        value: function tick() {
            this.setState({
                date: new Date()
            });
        }
    }]);

    return Clock;
}(React.Component);

ReactDOM.render(React.createElement(Clock, null), document.getElementById('root'));

function FormattedDate(props) {
    return React.createElement(
        'h2',
        null,
        'It is ',
        props.date.toLocaleTimeString(),
        '.'
    );
}

ReactDOM.render(React.createElement(Clock, null), document.getElementById('root2'));

function App() {
    return React.createElement(
        'div',
        null,
        React.createElement(Clock, null),
        React.createElement(Clock, null),
        React.createElement(Clock, null)
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root3'));