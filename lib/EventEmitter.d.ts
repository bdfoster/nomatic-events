import { EventListener } from "./index";
export default class EventEmitter {
    private listeners;
    private maxListeners;
    constructor(maxListeners?: number);
    on(namespace: any, callback: FunctionConstructor, once?: boolean): EventListener;
    push(listener: EventListener): void;
    pop(listener: EventListener): boolean;
    emit(namespace: string, ...data: any[]): void;
}
