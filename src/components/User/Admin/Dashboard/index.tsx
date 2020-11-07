import React, { Component } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Books from '../../../Books';
import Authors from '../../../Authors';
import Categories from '../../../Categories';
import Tags from '../../../Tags';
import Users from '../Users';
import Profile from '../../Profile';
import Settings from '../../Settings';

import Container from './container';
import state from '../../../../state';

export default class Dashboard extends Component<RouteComponentProps> {
	constructor(props: RouteComponentProps) {
		super(props);

		if (!state.call<boolean>('isAdmin')) {
			this.props.history.goBack();
		}
	}

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
							render={() => <div>Under Construction</div>}
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
						<Route
							path={this.path('/profile')}
							component={Profile}
						/>
						<Route
							path={this.path('/settings')}
							component={Settings}
						/>
					</Switch>
				</Container>
			</div>
		);
	}
}
