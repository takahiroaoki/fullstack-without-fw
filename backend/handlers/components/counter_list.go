package components

type CounterList struct {
	Ref      string
	Counters []Counter
}

func NewCounterList(counters []Counter) CounterList {
	return CounterList{
		Ref:      "counter-list",
		Counters: counters,
	}
}
