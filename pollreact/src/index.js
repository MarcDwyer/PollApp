import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';


import Poll from './components/poll'
import CreatePoll from './components/create_poll'
import Results from './components/results'
 
// const DOMNode = document.getElementById('renderTarget');
ReactDOM.render(
<BrowserRouter>
<Switch>
    <Route exact path="/poll-survey/:id" component={Poll} />
    <Route exact path="/poll-results/:id" component={Results} />
    <Route path="/" component={CreatePoll} />
</Switch>
</BrowserRouter>
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
