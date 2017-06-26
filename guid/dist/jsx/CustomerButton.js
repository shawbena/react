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

    function CustomerButton(props) {
        return _react2.default.createElement(
            'button',
            null,
            props.text ? props.text : 'button'
        );
    }

    exports.default = CustomerButton;
});