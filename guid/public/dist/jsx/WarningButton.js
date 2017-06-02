define(['exports', '../react', '../react-dom', './CustomerButton'], function (exports, _react, _reactDom, _CustomerButton) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _CustomerButton2 = _interopRequireDefault(_CustomerButton);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function WarningButton() {
        return _react2.default.createElement(_CustomerButton2.default, { color: 'red', text: 'Waring Button' });
    }

    exports.default = WarningButton;
});