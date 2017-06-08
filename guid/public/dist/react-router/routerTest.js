define(['exports', '../react', '../react-router', '../history'], function (exports, _react, _reactRouter, _history) {
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

    var customHistory = (0, _history.createBrowserHistory)();
    var routerTest = _react2.default.createElement(
        _reactRouter.Router,
        { history: customHistory },
        _react2.default.createElement(
            'div',
            null,
            'lkjlsda'
        )
    );

    exports.default = routerTest;
});