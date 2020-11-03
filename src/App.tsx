import React, { Component } from 'react';
import './App.scss';
import state from './state';
import { Theme } from './contracts';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import 'aos/src/sass/aos.scss';
import './boot';

import Routes from './routes';

import Navbar from './components/Navbar';

export type State = {
	theme: Theme;
};

export default class App extends Component<{}, State> {
	render() {
		return (
			<div className='login-page sidebar-collapse'>
				<Router>
					<Navbar />
					<Routes />
				</Router>
			</div>
		);
	}

	key = -1;

	constructor(props: {}) {
		super(props);
		this.state = {
			theme: state.has('theme') ? state.get<Theme>('theme') : 'light',
		};
	}

	componentDidMount() {
		AOS.init();
		this.key = state.listen<Theme>('theme', (theme) => {
			this.setState({ theme });
			(document.querySelector('body') as HTMLBodyElement).classList.add(
				theme
			);
		});
	}

	componentWillUnmount() {
		state.removeListener('theme', this.key);
	}
}
