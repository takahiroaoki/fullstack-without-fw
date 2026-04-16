package main

import (
	"log"
	"net/http"
	"backend/handlers"
)

func main() {
	http.Handle("/sample1", handlers.NewSample1Handler())
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}