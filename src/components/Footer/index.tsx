import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
	default: Boolean;
};

export default class Footer extends Component<Props> {
	render() {
		const name = this.props.default ? 'footer-default' : '';

		return (
			<footer className={`footer ${name}`}>
				<div className='container'>
					<nav>
						<ul>
							<li>
								<Link to='/'>libraria.io</Link>
							</li>
							<li>
								<Link to='/about-us'>About Us</Link>
							</li>
							<li>
								<a href='https://github.com/libraria-io'>
									Github
								</a>
							</li>
						</ul>
					</nav>
					<div className='copyright' id='copyright'>
						&copy; Designed by{' '}
						<a
							href='https://www.invisionapp.com'
							target='_blank'
							rel='noreferrer'
						>
							Invision
						</a>
						. Coded by{' '}
						<a
							href='https://github.com/avidianity'
							target='_blank'
							rel='noreferrer'
						>
							avidianity
						</a>
						.
					</div>
				</div>
			</footer>
		);
	}
}
