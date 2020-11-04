import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BG6 from '../../assets/img/bg6.jpg';

export default class Header extends Component {
	render() {
		return (
			<div className='page-header page-header-small'>
				<div
					className='page-header-image'
					data-parallax='true'
					style={{
						backgroundImage: `url(${BG6})`,
					}}
				></div>
				<div className='content-center'>
					<div className='container'>
						<h2 className='title'>
							Today's research, tomorrow's innovation.
						</h2>
						<div className='text-center'>
							<a
								href='https://facebook.com/mekkyinblack'
								target='_blank'
								rel='noreferrer'
								className='btn btn-primary btn-icon btn-round'
							>
								<i className='fab fa-facebook-square'></i>
							</a>
							<a
								href='https://github.com/libraria-io'
								target='_blank'
								rel='noreferrer'
								className='btn btn-primary btn-icon btn-round'
							>
								<i className='fab fa-github'></i>
							</a>
						</div>
						<Link
							to='/login'
							className='btn btn-primary btn-sm btn-round'
						>
							Get Started
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
