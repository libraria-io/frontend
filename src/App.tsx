import React, { Component } from 'react';
import './App.scss';
import state from './state';
import { Role, Theme } from './contracts';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
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

	constructor(props: RouteComponentProps) {
		super(props);
		this.registerStateMacros();
		this.state = {
			theme: state.has('theme') ? state.get<Theme>('theme') : 'light',
		};
	}

	registerStateMacros() {
		state.macro('logged', () => state.has('user') && state.has('token'));
		state.macro(
			'isAdmin',
			() =>
				state.call('logged') &&
				state.has('role') &&
				state.get<Role>('role').name === 'Admin'
		);
		state.macro('isNormal', () => !state.call('isAdmin'));
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
