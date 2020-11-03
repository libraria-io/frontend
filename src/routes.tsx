import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

export default class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
			</Switch>
		);
	}
}
