define([], function () {
    'use strict';

    (function () {

        if (!('on' in Element.prototype)) {
            Element.prototype.on = Element.prototype.addEventListener;
        }

        function $(selector) {
            if (typeof selector != 'string') {
                return null;
            }
            return document.querySelector(selector);
        }
        window.$ = $;
    })();
});