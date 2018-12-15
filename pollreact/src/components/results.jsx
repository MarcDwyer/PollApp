import React, { Component } from 'react'
import Nav from './nav'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
export default class Results extends Component {
        constructor(props) {
            super(props)
            this.state = {
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
            console.log(pollData)
            this.setState({questions: pollData})
        }
        render() {
            const { questions } = this.state
            console.log('BARNACULES')
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
        renderResults = () => {
            const { questions  } = this.state
            if (!questions) return
            const filtered = Object.values(questions).filter(item => item.question);
            return filtered.map(({ question, count }) => {
                return (
                    <li key={uuid()} className="thevotes">
                        <span>{question}</span>
                        <span className="votes">{count} Votes</span>
                    </li>
                )
            })
            
        }
}