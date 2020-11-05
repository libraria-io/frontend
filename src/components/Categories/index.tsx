import React, { Component } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import List from './list';
import Form from './form';

export default class Categories extends Component<RouteComponentProps> {
	render() {
		const path = (route: string) => {
			return this.props.match.path + route;
		};

		return (
			<Switch>
				<Route path={path('')} component={List} exact />
				<Route path={path('/add')} component={Form} />
				<Route path={path('/:id/edit')} component={Form} />
			</Switch>
		);
	}
}
