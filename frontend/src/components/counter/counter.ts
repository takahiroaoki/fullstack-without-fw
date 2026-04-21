import { EventSetting, ViewModel } from '@src/cores/view-model';

export type CounterState = { count: number };

export class Counter extends ViewModel<CounterState> {
    constructor(elem: HTMLElement, initialState?: CounterState) {
        super(elem, initialState ?? { count: 0 });
        if (!initialState) this.setState({ count: this.getInitialCount() });
    }

    private getInitialCount(): number {
        return Number(this.getDataset().initialCount || 0);
    }

    protected override getEventSettings(): EventSetting[] {
        return [
            {
                selector: '.counter__increment',
                eventName: 'click',
                callback: () => {
                    this.setState({ count: this.getState().count + 1 });
                },
            },
            {
                selector: '.counter__decrement',
                eventName: 'click',
                callback: () => {
                    this.setState({ count: this.getState().count - 1 });
                },
            },
        ];
    }

    protected override render(): void {
        this.select('.counter__count')!.textContent = String(this.getState().count);
    }
}
