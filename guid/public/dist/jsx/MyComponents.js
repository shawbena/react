define(["../react"], function (_react) {
    "use strict";

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var MyComponents = {
        DatePicker: function DatePicker(props) {
            return _react2.default.createElement(
                "div",
                null,
                "Imaging a ",
                props.color,
                " datepicker here."
            );
        }
    };

    function BlueDatePicker() {
        return _react2.default.createElement(MyComponents.DatePicker, { color: "blue" });
    }
});