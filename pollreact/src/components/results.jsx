import React, { Component } from 'react'
import Nav from './nav'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import uuid from 'uuid'
export default class Results extends Component {

        constructor(props) {
            super(props)
            this.state = {
                questions: null,
                ws: new WebSocket(`ws://localhost:5000/sockets/${this.props.match.params.id}`)
            }
        }
        async componentDidMount() {
            this.state.ws.addEventListener("message", (msg) => console.log(msg))
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
            console.log(this.state.ws.readyState)
                return (
                    <div>
                    <Nav />
                    <div className="contained">
                    <div className="poll">
                    <h4>The results are in!</h4>
                    <div className="actualpoll">
                    <div className="check">
                    <ul> 
                    {this.renderResults()}
                    </ul>
                    </div>
                    <Link to="/" className="waves-effect waves-light btn pollbtn">Create new poll</Link>
                    <CopyToClipboard text={this.state.value}
                           onCopy={() => this.setState({copied: true})} text={`${window.location.hostname}:3000/poll-results/${this.props.match.params.id}`} >
                          <button className="waves-effect waves-light btn purple accent-1 copyres">Copy url to clipboard</button>
                         </CopyToClipboard>
                    </div>
                    </div>
                    </div>
                    </div>
                )

        }
        renderResults = () => {
            const { questions } = this.state
            if (!questions) {
                return (
                    <li className="thevotes">
                    <span>Loading results...</span>
                </li>
                )
            }

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