import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import toastr from 'toastr';
import { handleErrors } from '../../helpers';
import { Book } from '../../contracts';

import { ReactComponent as CompassLogo } from 'bootstrap-icons/icons/compass.svg';

import { BookService } from '../../services';

type State = {
	book: Book;
	ready: boolean;
};

type Params = { id?: string };

export default class Show extends Component<
	RouteComponentProps<Params>,
	State
> {
	service = new BookService();
	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			book: {} as Book,
			ready: false,
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (!id) {
			toastr.error('Unable to find book.');
			return this.props.history.goBack();
		}
		this.service
			.get(id)
			.then((book) => {
				this.setState({ book, ready: true });
			})
			.catch((error) => {
				handleErrors(error);
				this.props.history.goBack();
			});
	}

	randomBadge() {
		const badges = ['primary', 'warning', 'success', 'info', 'danger'];
		return badges[Math.floor(Math.random() * badges.length)];
	}

	render() {
		return (
			<div className='container'>
				{this.state.ready ? (
					<div className='row'>
						<div className='col-sm-12 col-md-4 offset-md-4'>
							<div className='card'>
								<img
									src={this.state.book.photo?.uri}
									alt={`${this.state.book.title} cover`}
									className='card-img-top'
								/>
								<div className='card-body'>
									<div className='card-title'>
										{this.state.book.title}
									</div>
									<h6 className='card-title'>
										{this.state.book.category?.name}
									</h6>
									<p
										className='card-text'
										style={{ fontSize: '14px' }}
									>
										{this.state.book.description}
									</p>
									<div className='card-text'>
										By: {this.state.book.author?.user?.name}
									</div>
									<div className='card-footer'>
										<div className='card-text'>
											{this.state.book.tags?.map(
												(tag, index) => (
													<small
														className={`mx-1 badge-${this.randomBadge()}`}
														key={index}
														style={{
															fontSize: '10px',
															padding: '2px 4px',
															borderRadius: '4px',
														}}
													>
														{tag.name}
													</small>
												)
											)}
										</div>
									</div>
								</div>
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
