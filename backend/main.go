package main

import (
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

	hub := newHub()
	go hub.run()

	router := mux.NewRouter()
	router.HandleFunc("/api/create", Api)
	router.HandleFunc("/api/getpoll", Api)
	router.HandleFunc("/api/update", Api)

	router.HandleFunc("/sockets/{id}", func(w http.ResponseWriter, r *http.Request) {
		Socketme(hub, w, r)
	})

	//	router.HandleFunc("/{rest:.*}", emberHandler)
	// router.PathPrefix("/").HandlerFunc(serveFile)
	home := router.PathPrefix("/poll/").Subrouter()
	home.HandleFunc("/survey/{id}", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/build/index.html")
	})
	home.HandleFunc("/results/{id}", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/build/index.html")
	})
	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./public/build"))))
	log.Fatal(http.ListenAndServe(":5000", router))
}

// var emberView = template.Must(template.ParseFiles("./public/build/index.html"))

func emberHandler(w http.ResponseWriter, r *http.Request) {
	//	http.ServeFile(w, r, "./public/build")
	http.FileServer(http.Dir("./public/build")).ServeHTTP(w, r)
}
