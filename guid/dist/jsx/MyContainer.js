define(["exports", "../react"], function (exports, _react) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MyContainer = exports.MySecondComponent = exports.MyFirstComponent = undefined;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function MyContainer(props) {
        return _react2.default.createElement(
            "div",
            { className: "my-container" },
            props.children
        );
    }

    function MyFirstComponent() {
        return _react2.default.createElement("div", { className: "my-first-component" });
    }

    function MySecondComponent() {
        return _react2.default.createElement("div", { className: "my-second-component" });
    }

    exports.MyFirstComponent = MyFirstComponent;
    exports.MySecondComponent = MySecondComponent;
    exports.MyContainer = MyContainer;
});