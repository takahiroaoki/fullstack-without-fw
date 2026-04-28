package tmpls

import (
	"encoding/json"
	"os"
)

var manifest map[string]struct {
	File string   `json:"file"`
	Css  []string `json:"css"`
}

func init() {
	data, _ := os.ReadFile("resources/.vite/manifest.json")
	_ = json.Unmarshal(data, &manifest)
}

func JSPath(entryName string) string {
	return manifest[entryName].File
}

func CssPath(entryName string) string {
	if path, ok := manifest[entryName]; ok {
		if len(path.Css) > 0 {
			return path.Css[0]
		}
	}
	return ""
}
