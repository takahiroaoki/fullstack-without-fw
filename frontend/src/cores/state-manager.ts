export const EVENT_UPDATE_STATE = 'event_update_state';

export class StateManager<T> {
    private state: T;
    private emitter = new EventTarget();

    constructor(initialState: T) {
        this.state = initialState;
    }

    protected emit(eventName: string): void {
        this.emitter.dispatchEvent(new CustomEvent(eventName));
    }

    public getState(): T {
        return this.state;
    }

    public setState(partial: Partial<T>): void {
        const newState = { ...this.state, ...partial };
        this.state = newState;
        this.emit(EVENT_UPDATE_STATE);
    }

    public on(eventName: string, callback: EventListenerOrEventListenerObject): void {
        this.emitter.addEventListener(eventName, callback);
    }
}