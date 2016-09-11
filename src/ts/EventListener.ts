import EventEmitter from "./EventEmitter";

export default class EventListener {
    public namespace;
    public callback: Function;
    private once: boolean;
    private emitter: any;

    constructor(namespace: any, callback: FunctionConstructor, once: boolean = false, emitter: EventEmitter) {
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
        this.emitter = emitter;

    }

    public execute(namespace: string, ...data: any[]) {
        if (this.namespace.match(namespace)) {
            this.callback.apply(this, data);


            if (this.once) {
                this.close();
            }

            return true;
        }

        return false;
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