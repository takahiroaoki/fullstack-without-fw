package tmpls

import (
	"html/template"

	"github.com/Masterminds/sprig/v3"
)

var componentTmpls *template.Template

func init() {
	componentTmpls, _ = template.New("components").Funcs(sprig.FuncMap()).ParseGlob("resources/templates/components/**/*.html")
}
