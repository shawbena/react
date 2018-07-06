var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define("app", ["require", "exports", "react-dom", "react"], function (require, exports, ReactDOM, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ReactDOM = __importStar(ReactDOM);
    React = __importStar(React);
    // 这两个容器在 DOM 中是同级的
    var appRoot = document.getElementById('app-root');
    var modalRoot = document.getElementById('modal-root');
    var Modal = /** @class */ (function (_super) {
        __extends(Modal, _super);
        function Modal(props) {
            var _this = _super.call(this, props) || this;
            _this.el = document.createElement('div');
            return _this;
        }
        Modal.prototype.componentDidMount = function () {
            //
            modalRoot && modalRoot.appendChild(this.el);
        };
        Modal.prototype.componentWillUnmount = function () {
            modalRoot && modalRoot.removeChild(this.el);
        };
        Modal.prototype.render = function () {
            return ReactDOM.createPortal(this.props.children, this.el);
        };
        return Modal;
    }(React.Component));
    var Parent = /** @class */ (function (_super) {
        __extends(Parent, _super);
        function Parent(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                clicks: 0
            };
            return _this;
        }
        Parent.prototype.handleClick = function () {
            // 当点击 Child 中的按钮时触发，更新 Parent 的状态，即使按钮在 DOM 不是直接子孙也没关系。
            this.setState(function (prevState) { return ({
                clicks: prevState.clicks + 1
            }); });
        };
        Parent.prototype.render = function () {
            var _this = this;
            return (React.createElement("div", { onClick: function () { return _this.handleClick(); } },
                React.createElement("p", null,
                    "Number of clicks: ",
                    this.state.clicks),
                React.createElement("p", null, "Open up the browser DevTool to observe that the button is not a child of the div with th onClick handler."),
                React.createElement(Modal, null,
                    React.createElement(Child, null))));
        };
        return Parent;
    }(React.Component));
    function Child() {
        // 按钮的 click 事件将会冒泡到父组件，因为这里并没有定义 'onClick' 属性
        return (React.createElement("div", { className: "modal" },
            React.createElement("button", null, "Click")));
    }
    if (document.readyState !== 'loading') {
        bootstrap();
    }
    else {
        document.addEventListener('DOMContentLoaded', bootstrap);
    }
    function bootstrap() {
        ReactDOM.render(React.createElement(Parent, null), appRoot);
    }
});
