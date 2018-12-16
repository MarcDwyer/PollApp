import React, { Component } from 'react'
import uuid from 'uuid'
import Nav from './nav'
import Results from './results'
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
       
        if (!this.state.questions) {
            return (
                <div>
                    <Nav />
                    <div className="contained">
                    <div className="preloader-wrapper big active">
    <div className="spinner-layer spinner-blue-only">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
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
            <h4>{this.state.questions.title}</h4>
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
        if (updateFetch.status === 200) {
            const { isChecked, questions } = this.state
            this.setState({isComplete: true, submitted: questions[isChecked]}, () => {
                this.props.history.push(`/poll-results/${this.state.questions.Id}`)
            })
        }
    }
    renderQuestions = () => {
        const { questions } = this.state
        const filtered = Object.values(questions).filter(item => item.question);

        return filtered.map(({ question }, index) => {
            if (!question) return
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