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

    var NameForm = function (_React$Component) {
        _inherits(NameForm, _React$Component);

        function NameForm(props) {
            _classCallCheck(this, NameForm);

            var _this = _possibleConstructorReturn(this, (NameForm.__proto__ || Object.getPrototypeOf(NameForm)).call(this, props));

            _this.handleChange = function (event) {
                _this.setState({ value: event.target.value });
            };

            _this.handleSubmit = function (event) {
                alert('A man was submitted: ' + _this.state.value);
                event.preventDefault();
            };

            _this.state = { value: '' };
            return _this;
        }

        _createClass(NameForm, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'form',
                    { onSubmit: this.handleSubmit, className: 'name-form' },
                    _react2.default.createElement(
                        'label',
                        null,
                        'Name:',
                        _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange })
                    ),
                    _react2.default.createElement('input', { type: 'submit', value: 'Submit' })
                );
            }
        }]);

        return NameForm;
    }(_react2.default.Component);

    exports.default = NameForm;
});