define(["exports", "../react"], function (exports, _react) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = MyComponent;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function MyComponent(props) {
        return _react2.default.createElement(
            "div",
            { className: "my-component" },
            props.children
        );
    }
});