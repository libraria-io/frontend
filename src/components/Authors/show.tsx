import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import toastr from 'toastr';
import { handleErrors } from '../../helpers';
import { Author } from '../../contracts';

import { ReactComponent as CompassLogo } from 'bootstrap-icons/icons/compass.svg';

import { AuthorService } from '../../services';

type State = {
	author: Author;
	ready: boolean;
};

type Params = { id?: string };

export default class Show extends Component<
	RouteComponentProps<Params>,
	State
> {
	service = new AuthorService();
	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			author: {} as Author,
			ready: false,
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (!id) {
			toastr.error('Unable to find author.');
			return this.props.history.goBack();
		}
		this.service
			.get(id)
			.then((author) => {
				this.setState({ author, ready: true });
			})
			.catch((error) => {
				handleErrors(error);
				this.props.history.goBack();
			});
	}
	render() {
		return (
			<div className='container'>
				{this.state.ready ? (
					<div className='row'>
						<div className='col-sm-12 pt-4 px-2'>
							<div className='border shadow-sm p-2'>
								<h5 className='card-title d-flex'>
									{this.state.author.name}
								</h5>
								<div className='card-text'>
									Email:{' '}
									<a
										href={`mailto:${this.state.author.email}`}
										style={{ fontSize: '14px' }}
									>
										{this.state.author.email}
									</a>
								</div>
								<div className='card-text'>
									Website:{' '}
									<a
										href={this.state.author.website}
										style={{ fontSize: '14px' }}
									>
										{this.state.author.website}
									</a>
								</div>
								<div className='card-text'>
									Address:
									<p style={{ fontSize: '14px' }}>
										{this.state.author.address}
									</p>
								</div>

								<p
									className='card-text'
									style={{ fontSize: '14px' }}
								>
									{this.state.author.books?.length} Books
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className='text-center'>
						<CompassLogo
							className='icon-spin mt-5 mx-auto text-center'
							height='100'
							width='100'
						/>
					</div>
				)}
			</div>
		);
	}
}
