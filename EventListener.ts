import Emitter = require("./EventEmitter");

class Listener {
    public namespace;
    public callback: Function;
    private once: boolean;
    private emitter: Emitter;

    constructor(namespace: string, callback: Function, once: boolean, emitter: Emitter) {
        this.namespace = namespace;

        if (typeof callback !== 'function') {
            throw new Error("'callback' param must be a function");
        }
        this.callback = callback;
        this.once = once;
        this.emitter = emitter;

    }

    public execute(data: any) {
        this.callback(data, this.namespace);

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

export = Listener;