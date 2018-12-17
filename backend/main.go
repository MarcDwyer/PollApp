package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var mkey string
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

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

	r := mux.NewRouter()
	r.HandleFunc("/api/create", Api)
	r.HandleFunc("/api/getpoll", Api)
	r.HandleFunc("/api/update", Api)

	r.HandleFunc("/sockets/{id}", Socketme)

	// handler := c.Handler(r)
	http.ListenAndServe(":5000", r)
}
