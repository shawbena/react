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

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
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

    var Reservation = function (_React$Component) {
        _inherits(Reservation, _React$Component);

        function Reservation(props) {
            _classCallCheck(this, Reservation);

            var _this = _possibleConstructorReturn(this, (Reservation.__proto__ || Object.getPrototypeOf(Reservation)).call(this, props));

            _this.handleInputChange = function (event) {
                var target = event.target;
                var value = target.type === 'checkbox' ? target.checked : target.value;
                var name = target.name;

                _this.setState(_defineProperty({}, name, value));
            };

            _this.state = {
                isGoing: true,
                numberOfGuests: 2
            };
            return _this;
        }

        _createClass(Reservation, [{
            key: 'render',
            value: function render() {
                var _React$createElement;

                return _react2.default.createElement(
                    'form',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Is going:',
                        _react2.default.createElement('input', (_React$createElement = { type: 'text', name: 'isGoing' }, _defineProperty(_React$createElement, 'type', 'checkbox'), _defineProperty(_React$createElement, 'checked', this.state.isGoing), _defineProperty(_React$createElement, 'onChange', this.handleInputChange), _React$createElement))
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'label',
                        null,
                        'Number of guests:',
                        _react2.default.createElement('input', { type: 'number', name: 'numberOfGuests', value: this.state.numberOfGuests, onChange: this.handleInputChange })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        this.state.isGoing + ', ' + this.state.numberOfGuests
                    )
                );
            }
        }]);

        return Reservation;
    }(_react2.default.Component);

    exports.default = Reservation;
});