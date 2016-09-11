import EventEmitter from "./EventEmitter";
export default class EventListener {
    namespace: any;
    callback: Function;
    private once;
    private emitter;
    constructor(namespace: any, callback: FunctionConstructor, once: boolean, emitter: EventEmitter);
    execute(namespace: string, ...data: any[]): boolean;
    close(): this;
    open(once?: boolean): this;
}
