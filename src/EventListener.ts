import EventEmitter from "./EventEmitter";

export default class EventListener {
  public namespace;
  public callback;
  private once: boolean;
  private emitter: any;

  constructor(namespace: any, callback: Function, emitter: EventEmitter = null, once: boolean = false) {
    if (!( namespace instanceof RegExp || typeof namespace === 'string' )) {
      throw new Error("'namespace' param must be of RegExp or String type")
    } else {
      this.namespace = namespace;
    }

    if (!(callback instanceof Function)) {
      throw new Error("'callback' param must be a function or method");
    } else {
      this.callback = callback;
    }

    this.once = once;

    if (!emitter) {
      this.emitter = new EventEmitter();
    } else {
      this.emitter = emitter;
    }

  }

  public execute(context: any, ...data: any[]) {
    this.callback.apply(context, data);

    if (this.once) {
      this.close();
    }
  }

  public close() {
    this.emitter.pop(this);
    return this;
  }

  public open(once: boolean = false) {
    this.once = once;
    this.emitter.push(this);
    return this;
  }
}
