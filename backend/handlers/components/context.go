package components

type Context struct {
	Theme string `json:"theme"`
}

func NewContext(theme string) Context {
	return Context{Theme: theme}
}
