"use strict";
var lodash = require("lodash");
var async = require("async");
var Listener = require("./EventListener");
var EventEmitter = (function () {
    /**
     *
     * @constructor
     * @param maxListeners: The maximum number of Listener instances allowed per namespace. Default is 10. Set to 0
     *                      for unlimited (not recommended). This is a safety against memory leaks, and is not a hard
     *                      limit.
     * @param separator: The string used to indicate the end of a namespace part and the beginning of the next part.
     *                   By default, '.' is used, and 'test.namespace.1' would be a namespace with a depth of 3. Cannot
     *                   have '*' in the string, which is used as a wildcard.
     * @throws {Error}: 'separator' param cannot have wildcard character '*'
     */
    function EventEmitter(maxListeners, separator) {
        // If maxListeners is a negative value, treat as 0
        if (maxListeners < 0) {
            this.maxListeners = 0;
        }
        else {
            this.maxListeners = maxListeners;
        }
        if (separator) {
            // Check for existence of wildcard character, throw AssertionError if found
            if (separator.indexOf("*") > 0) {
                throw new Error("'separator' param cannot have wildcard character '*'");
            }
            this.separator = separator;
        }
        else {
            // Default separator used
            this.separator = ".";
        }
        this.listeners = [];
        this.maxListeners = maxListeners || 10;
    }
    /**
     * Subscribe a callable function to a namespace.
     * @param namespace: The namespace to subscribe the callback to.
     * @param callback: A function taking the event data and namespace as arguments (in that order). The data can be any
     *                  type, but the namespace will be an array of strings with the index indicating the depth.
     * @param once: A boolean value indicating how many times the callback will be executed. A true value will
     *              unsubscribe the Listener automatically after the callback is executed once.
     * @returns {Listener}: Used to manage the subscription status via `open` and `close` methods (see: `Listener`).
     * @throws {AssertionError}: 'callback' param is not a function type
     */
    EventEmitter.prototype.on = function (namespace, callback, once) {
        var listener = new Listener(namespace, callback, once, this);
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
    EventEmitter.prototype.emit = function (namespace, data) {
        async.each(this.listeners, callMatchedListeners);
        function callMatchedListeners(listener, callback) {
            // TODO: Allow wildcards in listener.namespace
            if (listener.namespace && namespace) {
                listener.execute(data);
            }
            callback(null);
        }
        return true;
    };
    return EventEmitter;
}());
module.exports = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map