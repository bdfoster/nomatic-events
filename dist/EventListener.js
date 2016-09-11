"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventListener = (function () {
    function EventListener(namespace, callback, once, emitter) {
        if (once === undefined) once = false;

        _classCallCheck(this, EventListener);

        if (!(namespace instanceof RegExp || typeof namespace !== 'string')) {
            throw new Error("'namespace' param must be of RegExp or String type");
        } else {
            this.namespace = namespace;
        }
        if (callback instanceof Function) {
            throw new Error("'callback' param must be a function or method");
        } else {
            this.callback = callback;
        }
        this.once = once;
        this.emitter = emitter;
    }

    //# sourceMappingURL=EventListener.js.map

    _createClass(EventListener, [{
        key: "execute",
        value: function execute(namespace) {
            if (this.namespace && namespace.match(this.namespace)) {
                for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    data[_key - 1] = arguments[_key];
                }

                this.callback.apply(this, data);
                if (this.once) {
                    this.close();
                }
                return true;
            }
            return false;
        }
    }, {
        key: "close",
        value: function close() {
            this.emitter.pop(this);
            return this;
        }
    }, {
        key: "open",
        value: function open() {
            var once = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            this.once = once;
            this.emitter.push(this);
            return this;
        }
    }]);

    return EventListener;
})();

exports["default"] = EventListener;
module.exports = exports["default"];
//# sourceMappingURL=EventListener.js.map
