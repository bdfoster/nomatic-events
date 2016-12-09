import EventEmitter from "./EventEmitter";
export default class EventListener {
    namespace: any;
    callback: any;
    private once;
    private emitter;
    constructor(namespace: any, callback: Function, emitter: EventEmitter, once?: boolean);
    execute(context: any, ...data: any[]): void;
    close(): this;
    open(once?: boolean): this;
}
