export const EVENT_UPDATE_STATE = 'event_update_state';

export type EventSetting = {
    selector: string;
    eventName: string;
    callback: EventListenerOrEventListenerObject;
};

type SetStateOptions = {
    render: boolean;
    emit: boolean;
};

export class ViewModel<T> {
    private elem: HTMLElement;
    private state: T;
    private emitter = new EventTarget();
    private dataset: DOMStringMap;

    constructor(elem: HTMLElement, initialState: T) {
        this.elem = elem;
        this.state = initialState;
        this.dataset = this.elem.dataset;

        this.getEventSettings().forEach((e: EventSetting) => {
            this.select(e.selector)?.addEventListener(e.eventName, e.callback);
        });
    }

    protected getEventSettings(): EventSetting[] {
        return [];
    }

    protected select(selector: string): HTMLElement | null {
        return this.elem.querySelector(selector);
    }

    protected selectAll(selector: string): HTMLElement[] {
        return Array.from(this.elem.querySelectorAll(selector));
    }

    protected emit(eventName: string): void {
        this.emitter.dispatchEvent(new CustomEvent(eventName));
    }

    protected getDataset(): DOMStringMap {
        return this.dataset;
    }

    protected render(): void {}

    public getState(): T {
        return this.state;
    }

    public setState(
        partial: Partial<T>,
        options: SetStateOptions = {
            render: true,
            emit: true,
        }
    ) {
        const newState = { ...this.state, ...partial };
        this.state = newState;
        if (options.render) {
            this.render();
        }
        if (options.emit) {
            this.emit(EVENT_UPDATE_STATE);
        }
    }

    public on(eventName: string, callback: EventListenerOrEventListenerObject): void {
        this.emitter.addEventListener(eventName, callback);
    }
}
