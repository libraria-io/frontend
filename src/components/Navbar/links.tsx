import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Role, User } from '../../contracts';

import state from '../../state';

type State = {
	user: User | null;
	logged: boolean;
	role: Role | null;
};

export default class Links extends Component<{}, State> {
	protected userKey = -1;
	protected roleKey = -1;

	constructor(props: {}) {
		super(props);

		this.state = {
			user: state.has('user') ? state.get<User>('user') : null,
			logged: state.has('user'),
			role: state.has('role') ? state.get<Role>('role') : null,
		};
	}

	componentDidMount() {
		this.userKey = state.listen<User>('user', (user) => {
			this.setState({
				user,
				logged: user !== null,
			});
		});
		this.roleKey = state.listen<Role>('role', (role) => {
			this.setState({ role });
		});
	}

	componentWillUnmount() {
		state.removeListener('user', this.userKey);
		state.removeListener('role', this.roleKey);
	}

	determineRole() {
		return this.state.role && this.state.role.name === 'Admin'
			? '/dashboard'
			: '/account';
	}

	path(route: string) {
		return this.state.logged ? this.determineRole() + route : route;
	}

	renderLinks() {
		const fragments = window.location.pathname.split('/');
		const links = [
			<li
				className={`nav-item ${
					fragments.includes('authors') ? 'active' : ''
				}`}
				key={0}
			>
				<Link className='nav-link' to={this.path('/authors')}>
					Authors
				</Link>
			</li>,
			<li
				className={`nav-item ${
					fragments.includes('books') ? 'active' : ''
				}`}
				key={1}
			>
				<Link className='nav-link' to={this.path('/books')}>
					Books
				</Link>
			</li>,
			<li
				className={`nav-item ${
					fragments.includes('categories') ? 'active' : ''
				}`}
				key={2}
			>
				<Link className='nav-link' to={this.path('/categories')}>
					Categories
				</Link>
			</li>,
		];

		if (this.state.role && this.state.role.name === 'Admin') {
			links.push(
				<li
					className={`nav-item ${
						fragments.includes('tags') ? 'active' : ''
					}`}
					key={3}
				>
					<Link className='nav-link' to={this.path('/tags')}>
						Tags
					</Link>
				</li>
			);
			links.push(
				<li
					className={`nav-item ${
						fragments.includes('users') ? 'active' : ''
					}`}
					key={4}
				>
					<Link className='nav-link' to={this.path('/users')}>
						Users
					</Link>
				</li>
			);
		}

		return links;
	}

	render() {
		return (
			<div
				className='collapse navbar-collapse justify-content-end'
				id='navigation'
				data-nav-image='/assets/img/blurred-image-1.jpg'
			>
				<ul className='navbar-nav'>
					{this.renderLinks()}
					<li className={`nav-item`}>
						<a
							className='nav-link'
							rel='tooltip noreferrer'
							title='Visit us on GitHub'
							data-placement='bottom'
							href='https://github.com/libraria-io'
							target='_blank'
						>
							<i className='fab fa-github'></i>
							<p className='d-lg-none d-xl-none'>Github</p>
						</a>
					</li>
					<li className={`nav-item`}>
						<a
							className='nav-link'
							rel='tooltip noreferrer'
							title='Follow the creator.'
							data-placement='bottom'
							href='https://facebook.com/mekkyinblack'
							target='_blank'
						>
							<i className='fab fa-facebook-square'></i>
							<p className='d-lg-none d-xl-none'>Facebook</p>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
