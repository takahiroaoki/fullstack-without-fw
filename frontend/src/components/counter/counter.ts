import { EventSetting, ViewModel } from '@src/core/view-model';

export type CounterState = { count: number };

export class Counter extends ViewModel<CounterState> {
    constructor(elem: HTMLElement, initialState: CounterState) {
        super(elem, initialState);
        this.setState({ count: this.getInitialCount() }, { render: true, emit: false });
    }

    private getInitialCount(): number {
        return Number(this.getDataset().initialCount || 0);
    }

    protected getEventSettings(): EventSetting[] {
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

    protected render(): void {
        this.select('.counter__count')!.textContent = String(this.getState().count);
    }
}
