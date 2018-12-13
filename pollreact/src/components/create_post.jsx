import React, { Component } from 'react'

export default class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            number: 3
        }
    }
    componentWillMount() {
        for (let x = 0; x < 8; x++) {
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
        console.log('is this running')
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
            <div className="contained">
            <div className="poll">
            <h4>Create a poll</h4>
            <div className="actualpoll">
            <form onSubmit={this.handleSubmit}>
            <ul className="marginthis">
            {this.renderInput()}
            </ul>
            <button className="waves-effect waves-light btn pollbtn">Submit poll</button>
            </form>
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
                 <input value={this.state[item]} id="first_name2" type="text" className="validate" name={item} onChange={this.handleChange} placeholder={`Questions #${i + 1}`} autoComplete="off"  />
                    </div>
                </div>
                )
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }
}


