import React, { Component } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import state from '../../../state';

import BG1 from '../../../assets/img/bg1.jpg';
import BG3 from '../../../assets/img/bg3.jpg';
import BG4 from '../../../assets/img/bg4.jpg';
import BG5 from '../../../assets/img/bg5.jpg';
import BG6 from '../../../assets/img/bg6.jpg';
import BG7 from '../../../assets/img/bg7.jpg';

import Authors from '../../Authors';
import Books from '../../Books';
import Categories from '../../Categories';
import Profile from '../Profile';
import Settings from '../Settings';

type State = {
	bg: string;
};

export default class Account extends Component<RouteComponentProps, State> {
	key: NodeJS.Timeout = (null as unknown) as NodeJS.Timeout;

	constructor(props: RouteComponentProps) {
		super(props);

		if (!state.call<boolean>('isNormal')) {
			this.props.history.goBack();
		}

		this.state = {
			bg: this.getRandomBackground(),
		};
	}

	componentDidMount() {
		this.key = setInterval(
			() =>
				this.setState({
					bg: this.getRandomBackground(),
				}),
			10000
		);
	}

	componentWillUnmount() {
		clearInterval(this.key);
	}

	getRandomBackground() {
		return [BG1, BG3, BG4, BG5, BG6, BG7][Math.floor(Math.random() * 5)];
	}

	render() {
		const path = (url: string) => this.props.match.path + url;
		return (
			<div style={{ paddingTop: '100px' }}>
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						height: '100%',
						width: '100%',
						margin: 0,
						padding: 0,
						backgroundImage: `url(${this.state.bg})`,
						WebkitFilter: 'blur(3px)',
						msFilter: 'blur(3px)',
						filter: 'blur(3px)',
					}}
				></div>
				<div className='container p-1'>
					<Switch>
						<Route path={path('/authors')} component={Authors} />
						<Route path={path('/books')} component={Books} />
						<Route
							path={path('/categories')}
							component={Categories}
						/>
						<Route path={path('/profile')} component={Profile} />
						<Route path={path('/settings')} component={Settings} />
					</Switch>
				</div>
			</div>
		);
	}
}
