import EventEmitter from './EventEmitter';
import AsyncEventListener from './AsyncEventListener';

export class AsyncEventEmitter extends EventEmitter {
    public async emit(namespace: string, ...data: any[]) {
        for (const listener in this.listeners) {
            if (namespace.match(this.listeners[listener].namespace)) {
                await this.listeners[listener].execute(this, ...data);
            }
        }
    }

    public on(namespace: string | RegExp, callback: Function, once: boolean = false) {
        let listener = new AsyncEventListener(namespace, callback, this, once);
        this.push(listener);
        return listener;
    }
}

export default AsyncEventEmitter;