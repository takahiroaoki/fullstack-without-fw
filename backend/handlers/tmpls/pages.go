package tmpls

import (
	"html/template"
)

type PageName string

var pageTmplsMap map[PageName]*template.Template

const (
	// root names
	Layout = "layout"
	// file paths
	tmplPathSample1 = "resources/templates/pages/sample1/index.html"
	tmplPathSample2 = "resources/templates/pages/sample2/index.html"
	tmplPathLayout  = "resources/templates/layout/layout.html"
	// page names
	PageNameSample1 PageName = "sample1"
	PageNameSample2 PageName = "sample2"
)

func init() {
	pageTmplsMap = map[PageName]*template.Template{
		PageNameSample1: getParsedTmpl(tmplPathSample1, tmplPathLayout),
		PageNameSample2: getParsedTmpl(tmplPathSample2, tmplPathLayout),
	}
}

func getParsedTmpl(tmplPaths ...string) *template.Template {
	base, _ := componentTmpls.Clone()
	tmpl, _ := base.ParseFiles(tmplPaths...)
	return tmpl
}

func GetPageTmpl(pageName PageName) *template.Template {
	return pageTmplsMap[pageName]
}
