package view_helpers

import "backend/handlers/components"

func GetCounterListForSample2() components.CounterList {
	return components.NewCounterList([]components.Counter{
		components.NewCounter(10),
		components.NewCounter(20),
	})
}