import React, { Component } from 'react';
import BG5 from '../../../../assets/img/bg5.jpg';

export default class Container extends Component {
	render() {
		return (
			<div>
				<div
					className='page-header page-header-small'
					style={{ minHeight: '20vh' }}
				>
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
				</div>
				<div className='container text-left pt-2'>
					{this.props.children}
				</div>
			</div>
		);
	}
}
