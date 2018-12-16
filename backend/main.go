package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime"

	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
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

	router := httprouter.New()
	// r.PathPrefix("/").Handler(http.FileServer(http.Dir("./public/build")))
	// router.NotFound = http.FileServer(http.Dir("public")) cannot find url
	//	http.Handle("/", http.FileServer(http.Dir("./")))
	go Socketme()
	router.POST("/api/create", Api)
	router.POST("/api/getpoll", Api)
	router.POST("/api/update", Api)
	router.NotFound = http.FileServer(http.Dir("./public"))
	log.Fatal(http.ListenAndServe(":5000", router))
}
