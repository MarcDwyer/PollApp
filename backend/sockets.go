package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

type Payload struct {
	Id       string `json:"_id"`
	Question string `json:"question"`
}

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
