import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Links extends Component {
	render() {
		return (
			<div
				className='collapse navbar-collapse justify-content-end'
				id='navigation'
				data-nav-image='/assets/img/blurred-image-1.jpg'
			>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<Link className='nav-link' to='/authors'>
							Authors
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/books'>
							Books
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/categories'>
							Categories
						</Link>
					</li>
					<li className='nav-item'>
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
					<li className='nav-item'>
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
