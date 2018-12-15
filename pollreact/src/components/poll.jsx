import React, { Component } from 'react'
import uuid from 'uuid'
import Nav from './nav'
import { Link } from 'react-router-dom'
export default class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: `quest0`,
            isComplete: false,
            submitted: null,
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
        if (this.state.isComplete) {
            return (
                <div>
                <Nav />
                <div className="contained">
                <div className="poll">
                <h4>The results are in!</h4>
                <div className="actualpoll">
                <ul> 
                    {this.renderResults()}
                </ul>
                <Link to="/" className="waves-effect waves-light btn pollbtn">Create new poll</Link>
                </div>
                </div>
                </div>
                </div>
            )
        }
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
        if (updateFetch.status === 200) {
            const { isChecked, submitted, questions } = this.state
            this.setState({isComplete: true, submitted: questions[isChecked].question})
        }
    }
    renderQuestions = () => {
        const { questions } = this.state
        return Object.values(questions).map(({ question }, index) => {
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
    renderResults = () => {
        const { questions, submitted  } = this.state

        return Object.values(questions).map(({ question, count }, index) => {
            if (question === submitted) count += 1
            return (
                <li key={uuid()} className="thevotes">
                    <span>{question}</span>
                    <span className="votes">{count} Votes</span>
                </li>
            )
        })
        
    }
}