define(['exports', '../react', '../utli'], function (exports, _react, _utli) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NewRolePop = exports.Pop = undefined;

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

    var Pop = function (_React$Component) {
        _inherits(Pop, _React$Component);

        function Pop(props) {
            _classCallCheck(this, Pop);

            var _this2 = _possibleConstructorReturn(this, (Pop.__proto__ || Object.getPrototypeOf(Pop)).call(this, props));

            _this2.closePopHandler = function (e) {
                console.log('pop-closed');
            };

            return _this2;
        }

        _createClass(Pop, [{
            key: 'render',
            value: function render() {
                var ChildPop = this.props.childPop;
                return _react2.default.createElement(
                    'div',
                    { className: 'pop-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'pop-box-child', id: this.props.id },
                        _react2.default.createElement(
                            'div',
                            { className: 'pop-box-title-bar' },
                            _react2.default.createElement(
                                'div',
                                { className: 'pop-box-title' },
                                this.props.title
                            ),
                            _react2.default.createElement('div', { className: 'pop-box-close-icon', onClick: this.closePopHandler })
                        ),
                        _react2.default.createElement(ChildPop, { closePopFun: this.closePopHandler })
                    )
                );
            }
        }]);

        return Pop;
    }(_react2.default.Component);

    var NewRolePop = function (_React$Component2) {
        _inherits(NewRolePop, _React$Component2);

        function NewRolePop(props) {
            _classCallCheck(this, NewRolePop);

            var _this3 = _possibleConstructorReturn(this, (NewRolePop.__proto__ || Object.getPrototypeOf(NewRolePop)).call(this, props));

            _this3.createRoleHandler = function (e) {
                var roleName = 'new role name';
                var _this = _this3;
                _this3.setState({ roleName: roleName });
                _utli2.default.ajax({
                    method: 'post',
                    url: '/role/newRole',
                    data: {
                        roleName: roleName
                    }
                }, function (res) {
                    _utli2.default.popo(res.msg);
                    _this.props.closePopFun();
                    console.log('创建了一个新角色！');
                });
            };

            _this3.state = { roleName: '' };
            return _this3;
        }

        _createClass(NewRolePop, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    { className: 'pop-box-content' },
                    _react2.default.createElement('div', null),
                    _react2.default.createElement(
                        'div',
                        { className: 'buttons' },
                        _react2.default.createElement(
                            'button',
                            { onClick: this.createRoleHandler },
                            '\u521B\u5EFA'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.props.closePopFun },
                            '\u53D6\u6D88'
                        )
                    )
                );
            }
        }]);

        return NewRolePop;
    }(_react2.default.Component);

    exports.Pop = Pop;
    exports.NewRolePop = NewRolePop;
});