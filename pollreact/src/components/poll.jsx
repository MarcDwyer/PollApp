import React, { Component } from 'react'
import uuid from 'uuid'
import Nav from './nav'
export default class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: `quest0`,

            questions: null
        }
    }
    async componentDidMount() {
        const pollFetch = await fetch('/api/getpoll', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.props.match.params.id)
        })
        const pollData = await pollFetch.json()
        this.setState({questions: pollData})
    }
    render() {
        console.log(this.state)
        if (!this.state.questions) return null
        return (
            <div>
                <Nav />
            <div className="contained">
            <div className="poll">
            <h4>Poll</h4>
            <div className="actualpoll">
            <form onSubmit={this.handleSubmit}>
            <ul> 
                {this.renderQuestions()}
            </ul>
            <button type="submit" className="waves-effect waves-light btn pollbtn">Submit Answer</button>
            </form>
            </div>
            </div>
            </div>
            </div>
        )
    }
    handleChange = (e) => {
            this.setState({isChecked: e.target.name})
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            _id: this.props.match.params.id,
            question: this.state.isChecked
        }
        const updateFetch = await fetch('/api/update', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
        })
        console.log(updateFetch)
    }
    renderQuestions = () => {
        const { questions } = this.state
        return Object.values(questions).map(({ question, count }, index) => {

            return (
            <p key={uuid()}>
              <label>
                <input name={`quest${index}`} type="radio" checked={this.state.isChecked === `quest${index}`}  onChange={this.handleChange} />
                <span>{question}</span>
              </label>
            </p>
            )
        })
    }
}