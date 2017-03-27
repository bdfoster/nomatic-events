import EventEmitter from "./EventEmitter";

export default class EventListener {
  private callback: Function;
  private once: boolean;

  public emitter: EventEmitter;
  public namespace: RegExp;

  constructor(namespace: RegExp | string, callback: Function, emitter: EventEmitter = null, once: boolean = false) {
    if (!(namespace instanceof RegExp)) {
      //noinspection TypeScriptValidateTypes
      this.namespace = new RegExp(namespace);
    } else {
      this.namespace = namespace;
    }
    this.callback = callback;
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
