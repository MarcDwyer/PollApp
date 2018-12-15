import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Nav from './nav'

import Completed from './complete'
export default class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            number: 2,
            id: null,
            title: ''
        }
    }
    componentWillMount() {
        
        for (let x = 0; x < 5; x++) {
            const path = `quest${x}`
            this.setState((state) => {
                return {...state, [path]: ''}
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        //checks to see if all inputs have a value... it they do, another input tag is displayed
    (() => {
        const { number } = this.state;
        const path = `quest${number - 1}`
        if (!this.state[path] || this.state[path].length === 0) return;
        let ch = 0
        const sort = Object.keys(this.state).filter(item => item.startsWith('quest'))
        const { state } = this
        for (let x = 0; x < state.number; x++) {
            
            if (state[sort[x]] && state[sort[x]].length > 0) {
                ch++
                continue
            } 
        }
         if (ch === this.state.number) {
            this.setState({number: this.state.number + 1})
        }
    })() 
    }
    render() {
        return (
            <div>
            <Route path="/completed/:id" render={(props) => <Completed {...props} id={this.state.id} /> } />
            <Nav />
            <div className="contained">
            <div className="poll">
            <h4>Create a poll</h4>
            <div className="actualpoll">
            <form onSubmit={this.handleSubmit}>
            <div className="row">
    <div className="input-field col s12">
      <input name="title" value={this.state.title} id="first_name2" type="text" className="validate" onChange={this.handleChange} />
      <label className="active">Enter a title</label>
    </div>
  </div>
            <ul className="marginthis">
            {this.renderInput()}
            </ul>
            <button className="waves-effect waves-light btn pollbtn">Submit poll</button>
            </form>
            </div>
            </div>
            </div>
            </div>
        )
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }
    renderInput = () => {
    const sort = Object.keys(this.state).filter(item => item.startsWith('quest'))
       return sort.map((item, i) => {
            if (i < this.state.number) {
                return (
                    <div key={i} className="row">
                    <div className="input-field col s12">
                 <input value={this.state[item]} id={`item${i}`} type="text" className="validate" name={item} onChange={this.handleChange} placeholder={`Questions #${i + 1}`} autoComplete="off"  />
                    </div>
                </div>
                )
            }
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const sort = Object.keys(this.state).filter(item => item.startsWith('quest'))

       const submitted = sort.filter((item) => {
            if (this.state[item].length > 0) {
                return this.state[item]
            }
        }).map(item => {
           return {[item]: this.state[item], count: 0}
        }).reduce((obj, item, i) => {
            const [first, second] = Object.keys(item)
            obj[first] = {question: item[first], [second]: 0}
            obj.title = this.state.title
           return obj
        }, {})
        console.log(submitted)
        const postFetch = await fetch('/api/create', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(submitted)
        })
        const fetchRes = await postFetch.json()
        this.setState({id: fetchRes, quest0: '', quest1: '', quest2: '', quest3: '', quest4: ''}, () => {
            this.props.history.push(`/completed/${fetchRes}`)
        })
    }
}


