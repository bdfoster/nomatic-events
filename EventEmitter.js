"use strict";
var EventListener = require("./EventListener");
var lodash = require("lodash");
var async = require("async");
var EventEmitter = (function () {
    /**
     *
     * @constructor
     * @param maxListeners: The maximum number of Listener instances allowed per namespace. Default is 10. Set to 0
     *                      for unlimited (not recommended). This is a safety against memory leaks, and is not a hard
     *                      limit.
     */
    function EventEmitter(maxListeners) {
        if (maxListeners === void 0) { maxListeners = 10; }
        // If maxListeners is a negative value, treat as 0 (unlimited)
        if (maxListeners < 0) {
            this.maxListeners = 0;
        }
        this.listeners = [];
    }
    /**
     * Subscribe a callable function to a namespace.
     * @param namespace: The namespace to subscribe the callback to.
     * @param callback: A function taking the event data and namespace as arguments (in that order). The data can be any
     *                  type, but the namespace will be an array of strings with the index indicating the depth.
     * @param once: A boolean value indicating how many times the callback will be executed. A true value will
     *              unsubscribe the Listener automatically after the callback is executed once.
     * @returns {EventListener}: Used to manage the subscription status via `open` and `close` methods.
     */
    EventEmitter.prototype.on = function (namespace, callback, once) {
        var listener = new EventListener.EventListener(namespace, callback, once, this);
        this.push(listener);
        return listener;
    };
    /**
     * Subscribe a callable function to a namespace and only execute once. Alias of 'on' method with 'once' param set to
     * true.
     * @param namespace: The namespace to subscribe to, using `EventEmitter.separator` property to delineate hierarchy.
     *                   A '*' in a namespace part is a wildcard, while a '**' in a namespace part
     * @param callback: A function taking the event data and namespace as arguments (in that order). The data can be any
     *                  type, but the namespace will be an array of strings. If you use a wildcard when subscribing,
     *                  they are replaced with actual values.
     */
    /**
     * Unsubscribe a callable function from the EventNamespace instance.
     * @param callback: The function already subscribed to the EventNamespace instance.
     * @returns {boolean}: A true value indicates a successful unsubscribe.
     */
    EventEmitter.prototype.off = function (callback) {
        var keepGoing = true;
        lodash.each(this.listeners, function (listener, index, array) {
            if (listener.callback === callback) {
                delete array[index];
                keepGoing = false;
            }
            return keepGoing;
        });
        if (keepGoing) {
            throw new Error("Callback '" + typeof callback + "' not found");
        }
        return true;
    };
    /**
     * Add a Listener instance to the EventNamespace instance. Called with `subscribe` method.
     * @param listener: A Listener instance to add to the EventNamespace instance.
     */
    EventEmitter.prototype.push = function (listener) {
        this.listeners.push(listener);
    };
    /**
     * Remove a Listener instance from the EventNamespace instance. Called with `unsubscribe` method.
     * @param listener: A Listener instance to remove from the EventNamespace instance.
     * @returns {boolean}: A true value indicates a successful pop.
     */
    EventEmitter.prototype.pop = function (listener) {
        var keepGoing = true;
        lodash.each(this.listeners, function (value, index, array) {
            if (value === listener) {
                delete array[index];
                keepGoing = false;
            }
            return keepGoing;
        });
        if (keepGoing) {
            throw new Error("Listener not found");
        }
        return true;
    };
    EventEmitter.prototype.emit = function (namespace) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (typeof namespace !== 'string') {
            throw new Error("'namespace' param must be of String type");
        }
        if (this.listeners.length == 0) {
            return true;
        }
        async.each(this.listeners, callMatchedListeners);
        function callMatchedListeners(listener, callback) {
            if (listener.namespace && namespace.match(listener.namespace)) {
                listener.execute.apply(listener, [namespace].concat(data));
            }
            callback(null);
        }
        return true;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map