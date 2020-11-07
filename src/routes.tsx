import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

// Administrator
import Dashboard from './components/User/Admin/Dashboard';
import Account from './components/User/Normal/Account';

// 404
import FourZeroFour from './components/FZF';

export default class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route path='/' exact component={Home} />
				<Redirect from='/authors' to='/account/authors' />
				<Redirect from='/books' to='/account/books' />
				<Redirect from='/categories' to='/account/categories' />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/dashboard' component={Dashboard} />
				<Route path='/account' component={Account} />
				<Route component={FourZeroFour} />
			</Switch>
		);
	}
}
