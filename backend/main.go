package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	fmt.Println("server running...")

	r := mux.NewRouter()
	// r.PathPrefix("/").Handler(http.FileServer(http.Dir("./public/build")))
	log.Fatal(http.ListenAndServe(":5000", r))
}
