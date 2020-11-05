import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Book, PaginatedData } from '../../contracts';
import { handleErrors } from '../../helpers';
import { BookService } from '../../services';

type State = {
	data: PaginatedData<Book>;
	isLoading: boolean;
	loaded: boolean;
};

export default class List extends Component<RouteComponentProps, State> {
	service = new BookService(this.setState.bind(this));

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			isLoading: false,
			data: {} as PaginatedData<Book>,
			loaded: false,
		};
	}

	componentDidMount() {
		this.refresh().then(() => this.setState({ loaded: true }));
	}

	async refresh() {
		try {
			const data = await this.service.all<PaginatedData<Book>>();
			return this.setState({ data });
		} catch (error) {
			handleErrors(error, 'Unable to fetch books.');
			return Promise.reject(error);
		}
	}

	render() {
		const path = (route: string) => {
			return window.location.pathname + route;
		};
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-12 d-flex px-2 pt-2'>
						<h4 className='align-self-center m-0 p-0'>Books</h4>
						<Link
							to={path('/add')}
							className='mr-2 align-self-center ml-auto text-dark mt-1'
						>
							<i className='now-ui-icons ui-1_simple-add'></i>
						</Link>
						<i
							className={`now-ui-icons arrows-1_refresh-69 clickable align-self-center ${
								this.state.isLoading ? 'icon-spin' : ''
							}`}
							onClick={(e) => this.refresh()}
						></i>
					</div>
					<div className='col-12'>
						<hr />
					</div>
					{this.state.loaded
						? this.state.data.data.map((book, index) => (
								<div
									className='col-sm-12 col-md-4 col-lg-3 p-2'
									key={index}
								>
									<div className='card shadow text-dark text-left'>
										<img
											// src={book.photo?.uri}
											src='http://via.placeholder.com/300'
											alt={`${book.title} cover`}
											className='card-img-top'
										/>
										<div className='card-body'>
											<h5 className='card-title'>
												{book.title}
											</h5>
											<h6 className='card-title'>
												{book.category?.name}
											</h6>
											<p
												className='card-text'
												style={{ fontSize: '14px' }}
											>
												{book.description}
											</p>
											<div className='card-text'>
												By: {book.author?.user?.name}
											</div>
										</div>
									</div>
								</div>
						  ))
						: null}
				</div>
			</div>
		);
	}
}
