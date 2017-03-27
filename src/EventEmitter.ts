import EventListener from "./EventListener";

export class EventEmitter {
  private _maxListeners: number = 10;

  public listeners: Array<EventListener> = [];

  /**
   *
   * @constructor
   * @param maxListeners: The maximum number of Listener instances allowed per namespace. Default is 10. Set to 0
   *                      for unlimited (not recommended). This is a safety against memory leaks, and is not a hard
   *                      limit.
   */
  constructor(maxListeners: number = 10) {
    this.maxListeners = maxListeners;
  }

  public get maxListeners() {
    return this._maxListeners;
  }

  public set maxListeners(value: number) {
    if (value < 0) {
      this._maxListeners = 0;
    } else {
      this._maxListeners = value;
    }
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
  public on(namespace: string | RegExp, callback: Function, once: boolean = false) {
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

  public emit(namespace: string, ...data: any[]) {
    for (const listener in this.listeners) {
      if (namespace.match(this.listeners[listener].namespace)) {
        this.listeners[listener].execute(this, ...data);
      }
    }
  }
}

export default EventEmitter;
