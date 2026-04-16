package handlers

import (
	"html/template"
	"net/http"
	"backend/handlers/components"
	"backend/handlers/tmpls"
)

type sample2Handler struct {
	tmpl *template.Template
}

type Sample2View struct {
	CounterList components.CounterList
}

func (h *sample2Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.tmpl.ExecuteTemplate(w, tmpls.Layout, Sample2View{
		CounterList: components.NewCounterList([]components.Counter{
			components.NewCounter(0),
			components.NewCounter(0),
			components.NewCounter(0),
		}),
	})
}

func NewSample2Handler() http.Handler {
	return &sample2Handler{
		tmpl: tmpls.GetPageTmpl(tmpls.Sample2),
	}	
}
