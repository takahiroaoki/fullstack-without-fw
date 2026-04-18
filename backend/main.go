package main

import (
	"backend/handlers"
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	srv := &http.Server{
		Addr: ":8080",
	}
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./resources/static/"))))
	http.Handle("/sample1", handlers.NewSample1Handler())
	http.Handle("/sample2", handlers.NewSample2Handler())

	idleConnsClosed := make(chan struct{})
	go func() {
		stopReq := make(chan os.Signal, 1)
		signal.Notify(stopReq, syscall.SIGINT, syscall.SIGTERM)
		<-stopReq

		shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		log.Println("[INFO] HTTP server is shutting down...")
		if err := srv.Shutdown(shutdownCtx); err != nil {
			log.Printf("[ERROR] HTTP server Shutdown: %v", err)
		}
		close(idleConnsClosed)
	}()

	log.Printf("[INFO] Starting HTTP server on %s", srv.Addr)
	if err := srv.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("[ERROR] HTTP server ListenAndServe: %v", err)
	}

	<-idleConnsClosed
	log.Println("[INFO] HTTP server stopped")
}
