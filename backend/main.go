package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime"

	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
	_ "github.com/lib/pq"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Poll struct {
	Id     bson.ObjectId `bson:"_id"`
	Quest0 Question
	Quest1 Question
	Quest2 Question
	Quest3 Question
	Quest4 Question
	Quest5 Question
}
type Question struct {
	Question string `json:"question"`
	Count    int    `json:"count"`
}
type ReceivedPoll struct {
	Quest0 string `db:"quest0"`
	Quest1 string `db:"quest1"`
	Quest2 string `db:"quest2"`
	Quest3 string `db:"quest3"`
	Quest4 string `db:"quest4"`
	Quest5 string `db:"quest5"`
}

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
	router.POST("/api/create", api)
	router.NotFound = http.FileServer(http.Dir("./public"))
	log.Fatal(http.ListenAndServe(":5000", router))
}

func api(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	w.Header().Set("Content-type", "application/json")
	session, err := mgo.Dial(mkey)
	if err != nil {
		panic(err)
	}
	defer session.Close()
	fmt.Println("is this running?")

	switch r.URL.String() {
	case "/api/create":
		poll := &Poll{}
		json.NewDecoder(r.Body).Decode(&poll)
		poll.Id = bson.NewObjectId()
		fmt.Println(poll)
		c := session.DB("abase").C("polls")
		err = c.Insert(*poll)
		if err != nil {
			log.Fatal(err)
		}
		rz, _ := json.Marshal(poll.Id)
		w.Write(rz)
	}
}
