import React, { Component } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Books from '../../../Books';
import Authors from '../../../Authors';
import Categories from '../../../Categories';
import Tags from '../../../Tags';
import Users from '../Users';

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
						<Route
							path={this.path('/authors')}
							component={Authors}
						/>
						<Route
							path={this.path('/categories')}
							component={Categories}
						/>
						<Route path={this.path('/tags')} component={Tags} />
						<Route path={this.path('/users')} component={Users} />
					</Switch>
				</Container>
			</div>
		);
	}
}
