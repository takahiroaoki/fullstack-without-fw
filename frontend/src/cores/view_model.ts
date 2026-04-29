import { StateManager } from './state_manager';

export type EventSetting = {
    selector: string;
    eventName: string;
    callback: EventListenerOrEventListenerObject;
};

export class ViewModel<T> extends StateManager<T> {
    private elem: HTMLElement;

    constructor(elem: HTMLElement, initialState: T) {
        super(initialState);

        this.elem = elem;
        this.render();
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

    protected getDataset(): DOMStringMap {
        return this.elem.dataset;
    }

    protected getRef(): string {
        return this.getDataset().ref || '';
    }

    protected render(): void {}

    public override setState(partial: Partial<T>): void {
        super.setState(partial);
        this.render();
    }
}
