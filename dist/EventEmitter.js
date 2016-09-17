"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _index = require("./index");

var EventEmitter = (function () {
    /**
     *
     * @constructor
     * @param maxListeners: The maximum number of Listener instances allowed per namespace. Default is 10. Set to 0
     *                      for unlimited (not recommended). This is a safety against memory leaks, and is not a hard
     *                      limit.
     */

    function EventEmitter() {
        var maxListeners = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

        _classCallCheck(this, EventEmitter);

        // If maxListeners is a negative value, treat as 0 (unlimited)
        if (maxListeners < 0) {
            this.maxListeners = 0;
        }
        this.listeners = [];
    }

    //# sourceMappingURL=EventEmitter.js.map

    /**
     * Subscribe a callable function to a namespace.
     * @param namespace: The namespace to subscribe the callback to.
     * @param callback: A function taking the event data and namespace as arguments (in that order). The data can be any
     *                  type, but the namespace will be an array of strings with the index indicating the depth.
     * @param once: A boolean value indicating how many times the callback will be executed. A true value will
     *              unsubscribe the Listener automatically after the callback is executed once.
     * @returns {EventListener}: Used to manage the subscription status via `open` and `close` methods.
     */

    _createClass(EventEmitter, [{
        key: "on",
        value: function on(namespace, callback) {
            var once = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            var listener = new _index.EventListener(namespace, callback, once, this);
            this.push(listener);
            return listener;
        }

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
    }, {
        key: "off",
        value: function off(callback) {
            var keepGoing = true;
            _index.lodash.each(this.listeners, function (listener, index, array) {
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
        }

        /**
         * Add a Listener instance to the EventNamespace instance. Called with `subscribe` method.
         * @param listener: A Listener instance to add to the EventNamespace instance.
         */
    }, {
        key: "push",
        value: function push(listener) {
            this.listeners.push(listener);
        }

        /**
         * Remove a Listener instance from the EventNamespace instance. Called with `unsubscribe` method.
         * @param listener: A Listener instance to remove from the EventNamespace instance.
         * @returns {boolean}: A true value indicates a successful pop.
         */
    }, {
        key: "pop",
        value: function pop(listener) {
            var keepGoing = true;
            _index.lodash.each(this.listeners, function (value, index, array) {
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
        }
    }, {
        key: "emit",
        value: function emit(namespace) {
            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                data[_key - 1] = arguments[_key];
            }

            if (typeof namespace !== 'string') {
                throw new Error("'namespace' param must be of String type");
            }
            if (this.listeners.length == 0) {
                return false;
            }
            _index.async.each(this.listeners, callMatchedListeners);
            function callMatchedListeners(listener, callback) {
                listener.execute(namespace, data);
            }
            return true;
        }
    }]);

    return EventEmitter;
})();

exports["default"] = EventEmitter;
module.exports = exports["default"];
//# sourceMappingURL=EventEmitter.js.map
