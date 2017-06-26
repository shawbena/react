define(['exports', '../react'], function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Greeting;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function Greeting(props) {
        return _react2.default.createElement(
            'div',
            { className: 'greeting' },
            'Hello, ',
            props.lastName + ' · ' + props.firstName
        );
    }
});