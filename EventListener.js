"use strict";
var Listener = (function () {
    function Listener(namespace, callback, once, emitter) {
        this.namespace = namespace;
        if (typeof callback !== 'function') {
            throw new Error("'callback' param must be a function");
        }
        this.callback = callback;
        this.once = once;
        this.emitter = emitter;
    }
    Listener.prototype.execute = function (data) {
        this.callback(data, this.namespace);
        if (this.once) {
            this.close();
        }
        return this;
    };
    Listener.prototype.close = function () {
        this.emitter.pop(this);
        return this;
    };
    Listener.prototype.open = function (once) {
        if (once === void 0) { once = false; }
        this.once = once;
        this.emitter.push(this);
        return this;
    };
    return Listener;
}());
module.exports = Listener;
//# sourceMappingURL=EventListener.js.map