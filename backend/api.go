package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Poll struct {
	Id     bson.ObjectId `bson:"_id"`
	Title  string        `bson:"title,omitempty"`
	Quest0 *Question     `bson:"quest0,omitempty"`
	Quest1 *Question     `bson:"quest1,omitempty"`
	Quest2 *Question     `bson:"quest2,omitempty"`
	Quest3 *Question     `bson:"quest3,omitempty"`
	Quest4 *Question     `bson:"quest4,omitempty"`
}
type Question struct {
	Count    *int    `bson:"count,omitempty"`
	Question *string `bson:"question,omitempty"`
}
type ReceivedPoll struct {
	Id     bson.ObjectId `bson:"_id"`
	Title  string        `json:"title,omitempty"`
	Quest0 *ReceivedQ    `json:"quest0,omitempty"`
	Quest1 *ReceivedQ    `json:"quest1,omitempty"`
	Quest2 *ReceivedQ    `json:"quest2,omitempty"`
	Quest3 *ReceivedQ    `json:"quest3,omitempty"`
	Quest4 *ReceivedQ    `json:"quest4,omitempty"`
}
type ReceivedQ struct {
	Count    int    `json:"count"`
	Question string `json:"question"`
}
type UpdatePoll struct {
	Id       bson.ObjectId `json:"_id"`
	Question string        `json:"question"`
}

func Api(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	session, err := mgo.Dial(mkey)
	if err != nil {
		panic(err)
	}
	defer session.Close()
	c := session.DB("abase").C("polls")
	switch r.URL.String() {
	case "/api/create":
		poll := &Poll{}
		json.NewDecoder(r.Body).Decode(&poll)
		poll.Id = bson.NewObjectId()
		err = c.Insert(*poll)
		if err != nil {
			fmt.Println(err)
		}
		rz, _ := json.Marshal(poll.Id)
		w.Write(rz)
		return
	case "/api/getpoll":
		rz := new(string)
		rec := &ReceivedPoll{}
		json.NewDecoder(r.Body).Decode(&rz)
		err := c.FindId(bson.ObjectIdHex(*rz)).One(&rec)
		if err != nil {
			fmt.Println(err)
		}
		result, _ := json.Marshal(rec)
		w.Write(result)
		return
	case "/api/update":
		upd := &UpdatePoll{}
		json.NewDecoder(r.Body).Decode(&upd)
		str := fmt.Sprintf("%v.count", upd.Question)
		change := bson.M{"$inc": bson.M{str: 1}}
		err := c.UpdateId(upd.Id, change)
		if err != nil {
			fmt.Println(err)
		}
		return
	}
}
