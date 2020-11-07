import React, { Component } from 'react';

import BG1 from '../assets/img/bg1.jpg';

export default class Background extends Component {
	render() {
		return (
			<div className='page-header page-header-small overflow-none'>
				<div
					className='page-header-image'
					data-parallax='true'
					style={{
						backgroundImage: `url(${BG1})`,
					}}
				></div>
			</div>
		);
	}
}
