import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
	render() {
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
		);
	}
}
