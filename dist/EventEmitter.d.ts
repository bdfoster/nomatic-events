import { EventListener } from "./index";
export default class EventEmitter {
    private listeners;
    private maxListeners;
    /**
     *
     * @constructor
     * @param maxListeners: The maximum number of Listener instances allowed per namespace. Default is 10. Set to 0
     *                      for unlimited (not recommended). This is a safety against memory leaks, and is not a hard
     *                      limit.
     */
    constructor(maxListeners?: number);
    /**
     * Subscribe a callable function to a namespace.
     * @param namespace: The namespace to subscribe the callback to.
     * @param callback: A function taking the event data and namespace as arguments (in that order). The data can be any
     *                  type, but the namespace will be an array of strings with the index indicating the depth.
     * @param once: A boolean value indicating how many times the callback will be executed. A true value will
     *              unsubscribe the Listener automatically after the callback is executed once.
     * @returns {EventListener}: Used to manage the subscription status via `open` and `close` methods.
     */
    on(namespace: string, callback: FunctionConstructor, once?: boolean): EventListener;
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
    off(callback: Function): boolean;
    /**
     * Add a Listener instance to the EventNamespace instance. Called with `subscribe` method.
     * @param listener: A Listener instance to add to the EventNamespace instance.
     */
    push(listener: EventListener): void;
    /**
     * Remove a Listener instance from the EventNamespace instance. Called with `unsubscribe` method.
     * @param listener: A Listener instance to remove from the EventNamespace instance.
     * @returns {boolean}: A true value indicates a successful pop.
     */
    pop(listener: EventListener): boolean;
    emit(namespace: string, ...data: any[]): boolean;
}
