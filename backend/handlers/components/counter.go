package components

type Counter struct {
	Ref		  string
	Count int
}

func NewCounter(count int) Counter {
	return Counter{
		Ref: "counter",
		Count: count,
	}
}