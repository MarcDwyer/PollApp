package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

type Payload struct {
	Id       string `json:"_id"`
	Question string `json:"question"`
}

type connection struct {
	// The websocket connection.
	ws *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte

	// The hub.
	h *hub
}
type Client struct {
	hub *Hub

	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte
}

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

func Socketme(w http.ResponseWriter, r *http.Request) {
	//	payload := new(Payload)
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println(id)
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
	}
	//	defer conn.Close()
	rz := new(Payload)
	// ch := make(chan *Payload)
	go func(conn *websocket.Conn) {
		for {
			mType, msg, err := conn.ReadMessage()
			if err != nil {
				fmt.Println("LOOK HERE")
				fmt.Println(err)
				break
			}
			json.Unmarshal(msg, rz)
			fmt.Println(*rz)
			conn.WriteMessage(mType, msg)
		}

	}(conn)
}
