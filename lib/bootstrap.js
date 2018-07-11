var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "react", "react-dom"], function (require, exports, React, react_dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    /**
     * Bootstrap a React Component to page.
     * @param App
     * @param props
     * @param container
     */
    function bootstrap(App, props, container) {
        if (!container) {
            container = document.createElement('div');
            document.body.appendChild(container);
        }
        react_dom_1.render(React.createElement(App, __assign({}, props)), container);
    }
    exports.default = bootstrap;
});
