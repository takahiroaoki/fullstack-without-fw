package tmpls

import (
	"html/template"
)

var pageTmplsMap map[string]*template.Template

const (
	// tmpl names
	Layout = "layout"
	// file paths
	sample1TmplPath = "resources/templates/pages/sample1/index.html"
	sample2TmplPath = "resources/templates/pages/sample2/index.html"
	layoutTmplPath = "resources/templates/layout/layout.html"
	// page names
	Sample1 = "sample1"
	Sample2 = "sample2"
)

func init() {
	// Clone component templates for each page to avoid template name conflicts
	sample1Base, _ := componentTmpls.Clone()
	sample2Base, _ := componentTmpls.Clone()

	sample1, _ := sample1Base.ParseFiles(sample1TmplPath, layoutTmplPath)
	sample2, _ := sample2Base.ParseFiles(sample2TmplPath, layoutTmplPath)

	pageTmplsMap = map[string]*template.Template{
		Sample1: sample1,
		Sample2: sample2,
	}
}

func GetPageTmpl(pageName string) *template.Template {
	return pageTmplsMap[pageName]
}