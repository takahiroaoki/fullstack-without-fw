import { ViewModel, EVENT_UPDATE_STATE } from "@src/core/view-model"
import { Counter } from "@src/components/counter/counter"

export type CounterListState = {total: number}

export class CounterList extends ViewModel<CounterListState> {
    private counters: Counter[]

    constructor(elem: HTMLElement, initialState: CounterListState) {
        super(elem, initialState)
        this.counters = this.selectAll('[data-ref="counter"]').map((counterElem) => new Counter(counterElem, {count: 0}))
        this.setState({total: this.getTotalCount()}, {render: true, emit: false})

        this.counters.forEach((counter) => {
            counter.on(EVENT_UPDATE_STATE, () => {
                this.setState({total: this.getTotalCount()})
            })
        })
    }

    private getTotalCount(): number {
        return this.counters.reduce((sum, counter) => sum + counter.getState().count, 0)
    }

    protected render(): void {
        this.select('.counter-list__total__value')!.textContent = String(this.getState().total)
    }
}