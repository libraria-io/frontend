import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from './menu';
import Links from './links';

export default class Navbar extends Component {
	render() {
		return (
			<nav
				className='navbar navbar-expand-lg bg-primary fixed-top navbar-transparent '
				color-on-scroll='400'
			>
				<div className='container'>
					<Menu />
					<div className='navbar-translate'>
						<Link
							className='navbar-brand'
							to='/'
							data-placement='bottom'
						>
							libraria.io
						</Link>
						<button
							className='navbar-toggler navbar-toggler'
							type='button'
							data-toggle='collapse'
							data-target='#navigation'
							aria-controls='navigation-index'
							aria-expanded='false'
							aria-label='Toggle navigation'
						>
							<span className='navbar-toggler-bar top-bar'></span>
							<span className='navbar-toggler-bar middle-bar'></span>
							<span className='navbar-toggler-bar bottom-bar'></span>
						</button>
					</div>
					<Links />
				</div>
			</nav>
		);
	}
}
