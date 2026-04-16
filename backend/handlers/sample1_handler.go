package handlers

import (
	"html/template"
	"net/http"
)

type sample1Handler struct {
	tmpl *template.Template
}

func (h *sample1Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.tmpl.Execute(w, map[string]any{"Message": "Hello, World!"})
}

func NewSample1Handler() http.Handler {
	return &sample1Handler{
		tmpl: template.Must(template.ParseFiles("resources/templates/pages/sample1/index.html")),
	}	
}
