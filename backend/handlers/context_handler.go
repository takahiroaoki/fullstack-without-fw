package handlers

import (
	"backend/handlers/components"
	"encoding/json"
	"net/http"
)

type contextHandler struct{}

func (h *contextHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	c := components.NewContext("light")
	jsonData, err := json.Marshal(c)
	if err != nil {
		http.Error(w, "Failed to marshal context", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}

func NewContextHandler() http.Handler {
	return &contextHandler{}
}
