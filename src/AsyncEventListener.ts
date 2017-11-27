import EventListener from './EventListener';

export class AsyncEventListener extends EventListener {
    public execute(context: any, ...data: any[]) {
        const value = this.callback.apply(context, data);

        if (this.once) {
            this.close();
        }

        return Promise.resolve(value);
    }
}

export default AsyncEventListener;
