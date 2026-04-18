package tmpls

import (
	"html/template"
)

var componentTmpls *template.Template

func init() {
	componentTmpls, _ = template.ParseGlob("resources/templates/components/**/*.html")
}
