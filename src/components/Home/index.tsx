import React, { Component } from 'react';

import Header from './header';
import About from './about';
import Team from './team';
import Footer from '../Footer';

export default class Home extends Component {
	render() {
		return (
			<div className='wrapper'>
				<Header />
				<About />
				<Team />
				<Footer default={true} />
			</div>
		);
	}
}
