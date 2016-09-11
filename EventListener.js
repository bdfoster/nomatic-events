"use strict";
var EventListener = (function () {
    function EventListener(namespace, callback, once, emitter) {
        if (once === void 0) { once = false; }
        if (!(namespace instanceof RegExp || namespace instanceof String)) {
            throw new Error("'namespace' param must be of RegExp or String type");
        }
        else {
            this.namespace = namespace;
        }
        if (callback instanceof Function) {
            throw new Error("'callback' param must be a function or method");
        }
        else {
            this.callback = callback;
        }
        this.once = once;
        this.emitter = emitter;
    }
    EventListener.prototype.execute = function (namespace) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        this.callback.apply({ namespace: namespace }, data);
        if (this.once) {
            this.close();
        }
        return this;
    };
    EventListener.prototype.close = function () {
        this.emitter.pop(this);
        return this;
    };
    EventListener.prototype.open = function (once) {
        if (once === void 0) { once = false; }
        this.once = once;
        this.emitter.push(this);
        return this;
    };
    return EventListener;
}());
exports.EventListener = EventListener;
//# sourceMappingURL=EventListener.js.map