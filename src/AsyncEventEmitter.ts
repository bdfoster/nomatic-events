import EventEmitter from './EventEmitter';
import AsyncEventListener from './AsyncEventListener';

export class AsyncEventEmitter extends EventEmitter {
    public emit(namespace: string, ...data: any[]) {
        const promises = [];
        for (const listener in this.listeners) {
            if (namespace.match(this.listeners[listener].namespace)) {
                promises.push(this.listeners[listener].execute(this, ...data));
            }
        }

        return Promise.all(promises);
    }

    public on(namespace: string | RegExp, callback: Function, once: boolean = false) {
        let listener = new AsyncEventListener(namespace, callback, this, once);
        this.push(listener);
        return listener;
    }
}

export default AsyncEventEmitter;