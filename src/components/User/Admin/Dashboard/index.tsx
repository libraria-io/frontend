import React, { Component } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Books from '../../../Books';

import Container from './container';

export default class Dashboard extends Component<RouteComponentProps> {
	path(route: string) {
		return this.props.match.path + route;
	}

	render() {
		return (
			<div className='wrapper'>
				<Container>
					<Switch>
						<Route
							path={this.path('')}
							exact
							render={() => <div>Heyyy</div>}
						/>
						<Route path={this.path('/books')} component={Books} />
					</Switch>
				</Container>
			</div>
		);
	}
}
