package components

type Counter struct {
	Count int
}

func NewCounter(count int) Counter {
	return Counter{
		Count: count,
	}
}
