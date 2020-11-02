import React, { Component } from 'react';
import './App.scss';
import state from './state';
import { Theme } from './contracts';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AOS from 'aos';
import 'aos/src/sass/aos.scss';

export type State = {
	theme: Theme;
};

export default class App extends Component<{}, State> {
	render() {
		return <div className={`${this.state.theme} app`}>hiii</div>;
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
