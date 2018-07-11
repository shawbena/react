var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "react", "react-dom"], function (require, exports, React, react_dom_1) {
    "use strict";
    exports.__esModule = true;
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
    exports["default"] = bootstrap;
});
