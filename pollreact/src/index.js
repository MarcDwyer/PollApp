import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import Poll from './components/poll'
import CreatePost from './components/create_post'
import Completed from './components/complete'

ReactDOM.render(
<BrowserRouter>
<Switch>
    <Route path="/poll" component={Poll} />
    <Route path="/" component={CreatePost} />
</Switch>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
