import React, { Component } from 'react';
import BG5 from '../../../../assets/img/bg5.jpg';

export default class Header extends Component {
	render() {
		return (
			<div className='page-header'>
				<div
					className='page-header-image'
					data-parallax='true'
					style={{
						backgroundImage: `url(${BG5})`,
						WebkitFilter: 'blur(3px)',
						msFilter: 'blur(3px)',
						filter: 'blur(3px)',
					}}
				></div>
				<div
					className='container text-left'
					style={{ marginTop: '72px' }}
				>
					heyyy
				</div>
			</div>
		);
	}
}
