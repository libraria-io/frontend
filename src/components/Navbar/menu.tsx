import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import state from '../../state';

import { Role, User } from '../../contracts';

type State = {
	user: User | null;
	logged: boolean;
	role: Role | null;
};

export default class Menu extends Component<{}, State> {
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
		if (!this.state.logged) {
			return [
				<Link className='dropdown-item' to='/books' key={0}>
					Books
				</Link>,
				<Link className='dropdown-item' to='/categories' key={1}>
					Categories
				</Link>,
				<Link className='dropdown-item' to='/authors' key={2}>
					Authors
				</Link>,
				<div className='dropdown-divider' key={3}></div>,
			];
		}
		return [
			<Link className='dropdown-item' to={this.path('/')} key={0}>
				Dashboard
			</Link>,
			<Link className='dropdown-item' to={this.path('/profile')} key={1}>
				Profile
			</Link>,
			<Link className='dropdown-item' to={this.path('/settings')} key={2}>
				Settings
			</Link>,
			<div className='dropdown-divider' key={3}></div>,
			<a
				onClick={(e) => {
					e.preventDefault();
					state.clear();
					window.location.href = '/';
				}}
				className='dropdown-item'
				href={this.path('/logout')}
				key={4}
			>
				Logout
			</a>,
		];
	}

	render() {
		const fragments = window.location.pathname.split('/');
		return (
			<div className='dropdown button-dropdown'>
				<a
					href={process.env.REACT_APP_PUBLIC_URL}
					className='dropdown-toggle'
					id='navbarDropdown'
					data-toggle='dropdown'
				>
					<span className='button-bar'></span>
					<span className='button-bar'></span>
					<span className='button-bar'></span>
				</a>
				<div className='dropdown-menu' aria-labelledby='navbarDropdown'>
					<a
						href={process.env.REACT_APP_PUBLIC_URL}
						className='dropdown-header text-dark'
						style={{ textDecoration: 'none' }}
						onClick={(e) => e.preventDefault()}
					>
						Menu
					</a>
					{this.renderLinks()}
					{!this.state.logged && !fragments.includes('login') ? (
						<Link className='dropdown-item' to='/login'>
							Sign In
						</Link>
					) : null}
					{!this.state.logged && !fragments.includes('register') ? (
						<Link className='dropdown-item' to='/register'>
							Sign Up
						</Link>
					) : null}
				</div>
			</div>
		);
	}
}
