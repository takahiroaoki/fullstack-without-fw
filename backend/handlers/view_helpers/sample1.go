package view_helpers

import "backend/handlers/components"

func GetCounterForSample1() components.Counter {
	return components.NewCounter(10)
}