define(['exports', '../react', './MyComponent', './MyContainer'], function (exports, _react, _MyComponent, _MyContainer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = MixedComponent;

    var _react2 = _interopRequireDefault(_react);

    var _MyComponent2 = _interopRequireDefault(_MyComponent);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function MixedComponent(props) {
        return _react2.default.createElement(
            'div',
            { className: 'mixed-component' },
            'hahaha!',
            _react2.default.createElement(_MyContainer.MyFirstComponent, null),
            _react2.default.createElement(_MyContainer.MySecondComponent, null),
            _react2.default.createElement(
                _MyComponent2.default,
                null,
                'hahahaha',
                _react2.default.createElement('div', null)
            ),
            _react2.default.createElement(
                'div',
                null,
                'cacaca'
            ),
            _react2.default.createElement(
                'div',
                { className: 'mix-component-child' },
                props.children
            )
        );
    }
});