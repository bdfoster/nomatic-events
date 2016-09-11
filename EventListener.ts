import {EventEmitter} from "./EventEmitter";

export class EventListener {
    public namespace;
    public callback: Function;
    private once: boolean;
    private emitter: EventEmitter;

    constructor(namespace: any, callback: Function, once: boolean = false, emitter: EventEmitter) {
        if (!( namespace instanceof RegExp || namespace instanceof String )) {
            throw new Error("'namespace' param must be of RegExp or String type")
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

    public execute(namespace: string, ...data: any[]) {

        this.callback.apply({ namespace: namespace }, data);

        if (this.once) {
            this.close();
        }

        return this;
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
