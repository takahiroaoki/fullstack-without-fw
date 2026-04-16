package main

import (
	"log"
	"net/http"
	"backend/handlers"
)

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./resources/static/"))))
	//http.Handle("/static/", http.FileServer(http.Dir("./resources/static/")))
	http.Handle("/sample1", handlers.NewSample1Handler())
	http.Handle("/sample2", handlers.NewSample2Handler())
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}