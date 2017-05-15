//添加全局功能
(function() {
    
    if (!('on' in Element.prototype)) {
        Element.prototype.on = Element.prototype.addEventListener;
    }

    function $(selector) {
        if (typeof selecto != 'string') {
            return null;
        }
        return document.querySelector(selector);
    }
})();
