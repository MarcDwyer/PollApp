package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var mkey string

func init() {
	fmt.Println(runtime.NumCPU())
	ky := &mkey
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	*ky = os.Getenv("MONGODB")
}

func main() {
	fmt.Println("server running...")
	flag.Parse()
	hub := newHub()
	go hub.run()

	r := mux.NewRouter()
	r.HandleFunc("/api/create", Api)
	r.HandleFunc("/api/getpoll", Api)
	r.HandleFunc("/api/update", Api)

	r.HandleFunc("/sockets/{id}", func(w http.ResponseWriter, r *http.Request) {
		Socketme(hub, w, r)
	})

	// handler := c.Handler(r)
	http.ListenAndServe(":5000", r)
}
