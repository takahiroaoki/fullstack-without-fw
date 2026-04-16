package handlers

import (
	"html/template"
	"net/http"
	"backend/handlers/components"
	"backend/handlers/tmpls"
)

type sample1Handler struct {
	tmpl *template.Template
}

type Sample1View struct {
	Counter components.Counter
}

func (h *sample1Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.tmpl.ExecuteTemplate(w, tmpls.Layout, Sample1View{
		Counter: components.NewCounter(0),
	})
}

func NewSample1Handler() http.Handler {
	return &sample1Handler{
		tmpl: tmpls.GetPageTmpl(tmpls.PageNameSample1),
	}	
}
