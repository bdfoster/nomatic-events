"use strict";
var EventListener = (function () {
    function EventListener(namespace, callback, once, emitter) {
        if (once === void 0) { once = false; }
        if (!(namespace instanceof RegExp || typeof namespace === 'string')) {
            throw new Error("'namespace' param must be of RegExp or String type");
        }
        else {
            this.namespace = namespace;
        }
        if (!(callback instanceof Function)) {
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
        if (this.namespace.match(namespace)) {
            this.callback.apply(this, data);
            if (this.once) {
                this.close();
            }
            return true;
        }
        return false;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventListener;
//# sourceMappingURL=EventListener.js.map