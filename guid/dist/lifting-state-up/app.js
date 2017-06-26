define(['exports', '../react'], function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

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

    var scaleNames = {
        c: 'Celsius',
        f: 'Fahrenheit'
    };

    var TemperatureInput = function (_React$Component) {
        _inherits(TemperatureInput, _React$Component);

        function TemperatureInput(props) {
            _classCallCheck(this, TemperatureInput);

            var _this = _possibleConstructorReturn(this, (TemperatureInput.__proto__ || Object.getPrototypeOf(TemperatureInput)).call(this, props));

            _this.handleChange = function (e) {
                _this.props.onTemperatureChange(e.target.value);
            };

            return _this;
        }

        _createClass(TemperatureInput, [{
            key: 'render',
            value: function render() {
                var temperature = this.props.temperature;
                var scale = this.props.scale;

                return _react2.default.createElement(
                    'fieldset',
                    null,
                    _react2.default.createElement(
                        'legend',
                        null,
                        'Enter temperature in ',
                        scaleNames[scale],
                        ':'
                    ),
                    _react2.default.createElement('input', { value: temperature, onChange: this.handleChange })
                );
            }
        }]);

        return TemperatureInput;
    }(_react2.default.Component);

    var Caculator = function (_React$Component2) {
        _inherits(Caculator, _React$Component2);

        function Caculator(props) {
            _classCallCheck(this, Caculator);

            var _this2 = _possibleConstructorReturn(this, (Caculator.__proto__ || Object.getPrototypeOf(Caculator)).call(this, props));

            _this2.handleCelsiusChange = function (temperature) {
                _this2.setState({ scale: 'c', temperature: temperature });
            };

            _this2.handleFahrenheitChange = function (temperature) {
                _this2.setState({ scale: 'f', temperature: temperature });
            };

            _this2.state = { temperature: '', scale: 'c' };
            return _this2;
        }

        _createClass(Caculator, [{
            key: 'render',
            value: function render() {
                var scale = this.state.scale;
                var temperature = this.state.temperature;
                var celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
                var fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(TemperatureInput, { scale: 'c', temperature: celsius, onTemperatureChange: this.handleCelsiusChange }),
                    _react2.default.createElement(TemperatureInput, { scale: 'f', temperature: fahrenheit, onTemperatureChange: this.handleFahrenheitChange }),
                    _react2.default.createElement(BoilingVerdict, { celsius: parseFloat(celsius) })
                );
            }
        }]);

        return Caculator;
    }(_react2.default.Component);

    function BoilingVerdict(props) {
        if (props.celsius >= 100) {
            return _react2.default.createElement(
                'p',
                null,
                'The water would boil.'
            );
        }
        return _react2.default.createElement(
            'p',
            null,
            'The water would not boil.'
        );
    }

    function toCelsius(fahrenheit) {
        return (fahrenheit - 32) / 1.8;
    }

    function toFahrenheit(celsius) {
        return celsius * 1.8 + 32;
    }

    function tryConvert(temperature, convert) {
        var input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        var output = convert(input);
        var rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }
    exports.default = Caculator;
});