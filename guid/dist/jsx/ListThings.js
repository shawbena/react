define(["exports", "../react"], function (exports, _react) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ListOfTenThings = exports.Repeat = undefined;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function Repeat(props) {
        var items = [];
        for (var i = 0; i < props.numTimes; i++) {
            items.push(props.children(i));
        }

        return _react2.default.createElement(
            "div",
            { className: "repeat-items" },
            items
        );
    }

    function ListOfTenThings() {
        return _react2.default.createElement(
            Repeat,
            { numTimes: 10 },
            function (index) {
                return _react2.default.createElement(
                    "div",
                    { key: index },
                    "This is item ",
                    index,
                    " in the list."
                );
            }
        );
    }

    exports.Repeat = Repeat;
    exports.ListOfTenThings = ListOfTenThings;
});