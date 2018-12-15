import React, { Component } from 'react'
import uuid from 'uuid'
export default class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: `name0`,
            add: '',
            questions: null
        }
    }
    render() {
        return (
            <div className="contained">
            <div className="poll">
            <h4>Poll</h4>
            <div className="actualpoll">
            <form onSubmit={this.handleSubmit}>
            <ul>
                {this.renderQuestions()}  
            </ul>
            </form>
            <button className="waves-effect waves-light btn pollbtn">Submit Answer</button>
            </div>
            </div>
            </div>
        )
    }
    handleChange = (e) => {
        switch (e.target.type) {
            case "radio":
            console.log('checkbox')
            this.setState({isChecked: e.target.name})
            return
            case "text":
            this.setState({add: e.target.value})
            return
        }
    }
    handleSubmit = () => {
    }
    renderQuestions = () => {
        const { questions } = this.state
        return questions.map(({ name }, index) => {
            this.state[name] = false
            return (
            <p key={uuid()}>
              <label>
                <input name={`name${index}`} type="radio" checked={this.state.isChecked === `name${index}`} value={`name${index}`} onChange={this.handleChange} />
                <span>{name}</span>
              </label>
            </p>
            )
        })
    }
}