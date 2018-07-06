var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("theme-context", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    exports.themes = {
        light: {
            foreground: '#000000',
            background: '#eeeeee',
        },
        dark: {
            foreground: '#ffffff',
            background: '#222222',
        },
    };
    exports.ThemeContext = React.createContext({
        theme: exports.themes.dark,
        toggleTheme: function () { }
    });
});
define("theme-toggle-button", ["require", "exports", "react", "theme-context"], function (require, exports, React, theme_context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    function ThemeToggleButton() {
        // Theme Toggler Button 不仅从 context 接收 them 也接收 toggleTheme 函数。
        return (React.createElement(theme_context_1.ThemeContext.Consumer, null, function (_a) {
            var theme = _a.theme, toggleTheme = _a.toggleTheme;
            return (React.createElement("button", { onClick: toggleTheme, style: { backgroundColor: theme.background } }, "Toggle Theme"));
        }));
    }
    exports.default = ThemeToggleButton;
});
define("app", ["require", "exports", "react", "theme-context", "theme-toggle-button", "react-dom"], function (require, exports, React, theme_context_2, theme_toggle_button_1, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    theme_toggle_button_1 = __importDefault(theme_toggle_button_1);
    ReactDOM = __importStar(ReactDOM);
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App(props) {
            var _this = _super.call(this, props) || this;
            _this.toggleTheme = function () {
                _this.setState(function (state) { return ({
                    theme: state.theme === theme_context_2.themes.dark ? theme_context_2.themes.light : theme_context_2.themes.dark
                }); });
            };
            _this.state = {
                theme: theme_context_2.themes.light,
                toggleTheme: _this.toggleTheme
            };
            return _this;
            // this.toggleTheme = this.toggleTheme.bind(this);
        }
        App.prototype.render = function () {
            return (React.createElement(theme_context_2.ThemeContext.Provider, { value: this.state },
                React.createElement(Content, null)));
        };
        return App;
    }(React.Component));
    function Content() {
        return (React.createElement("div", null,
            React.createElement(theme_toggle_button_1.default, null)));
    }
    if (document.readyState !== 'loading') {
        bootstrap();
    }
    else {
        document.addEventListener('DOMContentLoaded', bootstrap);
    }
    function bootstrap() {
        ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
    }
});
