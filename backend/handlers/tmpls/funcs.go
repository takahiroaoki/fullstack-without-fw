package tmpls

import "html/template"

func templateFuncs() template.FuncMap {
	return template.FuncMap{
		"js":  JSPath,
		"css": CssPath,
	}
}
