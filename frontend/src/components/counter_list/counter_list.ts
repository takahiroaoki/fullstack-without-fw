import { ViewModel } from '@src/cores/view-model';
import { EVENT_UPDATE_STATE } from '@src/cores/state-manager';
import { Counter } from '@src/components/counter/counter';

export type CounterListState = { total: number };

export class CounterList extends ViewModel<CounterListState> {
    private counters: Counter[];

    constructor(elem: HTMLElement) {
        super(elem, { total: 0 });
        this.counters = this.selectAll('[data-ref="counter"]').map((counterElem) => new Counter(counterElem));
        this.setState({ total: this.getTotalCount() });

        this.counters.forEach((counter) => {
            counter.on(EVENT_UPDATE_STATE, () => {
                this.setState({ total: this.getTotalCount() });
            });
        });
    }

    private getTotalCount(): number {
        return this.counters.reduce((sum, counter) => sum + counter.getState().count, 0);
    }

    protected override render(): void {
        this.select('.counter-list__total__value')!.textContent = String(this.getState().total);
    }
}
