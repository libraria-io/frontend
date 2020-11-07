import React, { Component } from 'react';
import { User } from '../../contracts';
import state from '../../state';

type State = {
	user: User;
};

export default class Profile extends Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			user: state.get<User>('user'),
		};
	}

	render() {
		const { email, name, roles, authors } = this.state.user;
		const role = roles ? roles[0].name : 'N/A';
		const authorCount = authors?.length || 0;
		let booksCount = 0;
		authors?.forEach((author) => author.books?.forEach(() => booksCount++));
		return (
			<div className='container pt-3'>
				<div className='row'>
					<div className='col-12'>
						<h5>{name}</h5>
						<p>{email}</p>
						<p>Role: {role}</p>
						<p>Authors Registered: {authorCount}</p>
						<p>Books Published: {booksCount}</p>
					</div>
				</div>
			</div>
		);
	}
}
