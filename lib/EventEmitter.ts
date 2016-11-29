import {EventListener} from "./index";
import {each} from "lodash";

export default class EventEmitter {
    private listeners: Array<EventListener>;
    private maxListeners: number;

    /**
     *
     * @constructor
     * @param maxListeners: The maximum number of Listener instances allowed per namespace. Default is 10. Set to 0
     *                      for unlimited (not recommended). This is a safety against memory leaks, and is not a hard
     *                      limit.
     */
    constructor(maxListeners: number = 10) {
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
    public on(namespace: any, callback: FunctionConstructor, once: boolean = false) {
        let listener = new EventListener(namespace, callback, this, once);
        this.push(listener);
        return listener;
    }

    /**
     * Add a Listener instance to the EventNamespace instance. Called with `subscribe` method.
     * @param listener: A Listener instance to add to the EventNamespace instance.
     */
    public push(listener: EventListener) {
        this.listeners.push(listener);
    }

    /**
     * Remove a Listener instance from the EventNamespace instance. Called with `unsubscribe` method.
     * @param listener: A Listener instance to remove from the EventNamespace instance.
     * @returns {boolean}: A true value indicates a successful pop.
     */
    public pop(listener: EventListener) {
        let index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
            return true;
        }
        return false;
    }

    public emit(namespace: any, ...data: any[]) {
        if (!(namespace instanceof RegExp || typeof namespace === 'string' )) {
            throw new Error("'namespace' param must be of String type");
        }

        each(this.listeners, function(listener: EventListener) {
            if (listener.namespace.match(namespace)) {
                listener.execute(this, ...data);
            }
        });
    }

}
