define(['exports', 'react', 'utli'], function (exports, _react, _utli) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NewRolePop = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _utli2 = _interopRequireDefault(_utli);

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

    var NewRolePop = function (_React$Component) {
        _inherits(NewRolePop, _React$Component);

        function NewRolePop(props) {
            _classCallCheck(this, NewRolePop);

            var _this2 = _possibleConstructorReturn(this, (NewRolePop.__proto__ || Object.getPrototypeOf(NewRolePop)).call(this, props));

            _this2.createNewRole = function (e) {
                var roleName = 'new rolename';
                var _this = _this2;
                _utli2.default.ajax({
                    method: 'post',
                    url: '/role/newRole',
                    data: {
                        roleName: roleName
                    }
                }, function (res) {
                    _utli2.default.popo(res.msg);
                    console.log('创建了一个新角色！');
                    _this.canclePop();
                    _this.props.newRoleCreated({
                        roleName: roleName
                    });
                });
            };

            _this2.canclePop = function () {
                console.log('关闭新建角色弹窗');
            };

            _this2.state = {};
            return _this2;
        }

        _createClass(NewRolePop, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    { className: 'pop-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'pop-box-child' },
                        _react2.default.createElement(
                            'div',
                            { className: 'pop-box-title-bar' },
                            _react2.default.createElement(
                                'div',
                                { className: 'pop-box-title' },
                                '\u65B0\u5EFA\u89D2\u8272'
                            ),
                            _react2.default.createElement('div', { className: 'pop-box-close-icon', onClick: this.canclePop })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'pop-box-content' },
                            _react2.default.createElement(
                                'div',
                                { className: 'buttons' },
                                _react2.default.createElement(
                                    'button',
                                    { onClick: this.createNewRole },
                                    '\u521B\u5EFA'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { onClick: this.canclePop },
                                    '\u53D6\u6D88'
                                )
                            )
                        )
                    )
                );
            }
        }]);

        return NewRolePop;
    }(_react2.default.Component);

    exports.NewRolePop = NewRolePop;
});