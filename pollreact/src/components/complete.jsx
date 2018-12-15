import React from 'react'
import Nav from './nav'

import { Link } from 'react-router-dom'
const Complete = (props) => {
    if (!props.id) {
        props.history.push('/')
    }
    return (
        <div>
            <Nav />
        <div className="contained">
        <div className="poll">
        <h4>Poll Submitted</h4>
        <div className="actualpoll">
        <div className="check">
        <i className="fa fa-check" />
        </div>

        <Link to={`/poll-results/${props.id}`} className="waves-effect waves-light btn pollbtn">View Poll</Link>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Complete