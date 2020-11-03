import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
	render() {
		return (
			<nav
				className='navbar navbar-expand-lg bg-primary fixed-top navbar-transparent '
				color-on-scroll='400'
			>
				<div className='container'>
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
						<div
							className='dropdown-menu'
							aria-labelledby='navbarDropdown'
						>
							<a
								href={process.env.REACT_APP_PUBLIC_URL}
								className='dropdown-header text-dark'
								style={{ textDecoration: 'none' }}
								onClick={(e) => e.preventDefault()}
							>
								Menu
							</a>
							<Link className='dropdown-item' to='/books'>
								Books
							</Link>
							<Link className='dropdown-item' to='/categories'>
								Categories
							</Link>
							<Link className='dropdown-item' to='/authors'>
								Authors
							</Link>
							<div className='dropdown-divider'></div>
							<Link className='dropdown-item' to='/login'>
								Sign In
							</Link>
							<Link className='dropdown-item' to='/register'>
								Sign Up
							</Link>
						</div>
					</div>
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
					<div
						className='collapse navbar-collapse justify-content-end'
						id='navigation'
						data-nav-image='/assets/img/blurred-image-1.jpg'
					>
						<ul className='navbar-nav'>
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
									<p className='d-lg-none d-xl-none'>
										Github
									</p>
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
									<p className='d-lg-none d-xl-none'>
										Facebook
									</p>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
