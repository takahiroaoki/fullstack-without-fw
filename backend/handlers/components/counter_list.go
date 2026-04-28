package components

type CounterList struct {
	Counters []Counter
}

func NewCounterList(counters []Counter) CounterList {
	return CounterList{
		Counters: counters,
	}
}
