import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
	to: string;
	title: string;
};

export default class Link extends Component<Props> {
	render() {
		return (
			<li className='nav-item'>
				<RouterLink to={this.props.to} className='nav-link'>
					{this.props.title}
				</RouterLink>
			</li>
		);
	}
}
