import React, { Component, MouseEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Book, PaginatedData } from '../../contracts';
import { handleErrors } from '../../helpers';
import { BookService } from '../../services';
import toastr from 'toastr';

import Modal from '../Modal';

import { ReactComponent as PencilIcon } from 'bootstrap-icons/icons/pencil.svg';
import { ReactComponent as TrashIcon } from 'bootstrap-icons/icons/trash.svg';

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
		this.refresh();
	}

	async refresh() {
		try {
			const data = await this.service.all<PaginatedData<Book>>();
			return this.setState({ data, loaded: true });
		} catch (error) {
			handleErrors(error, 'Unable to fetch books.');
		}
	}

	randomBadge() {
		const badges = ['primary', 'warning', 'success', 'info', 'danger'];
		return badges[Math.floor(Math.random() * badges.length)];
	}

	deleteBook(index: number) {
		const book = this.state.data.data[index];
		return (e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			const modal = $(`#deleteBookModal${index}`) as any;
			modal.modal('hide');
			modal.on('hidden.bs.modal', () => {
				this.service
					.setModel(book)
					.delete()
					.then(() =>
						toastr.success('Book deleted successfully.', book.title)
					)
					.catch((error) => {
						console.log(error);
						handleErrors(error, 'Unable to delete book.');
					})
					.finally(() => this.refresh());
			});
		};
	}

	render() {
		const path = (route: string) => {
			return this.props.match.path + route;
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
									className='col-sm-12 col-md-4 p-2'
									key={index}
								>
									<div className='card shadow text-dark text-left'>
										<img
											src={book.photo?.uri}
											alt={`${book.title} cover`}
											className='card-img-top'
										/>
										<div className='card-body'>
											<h5 className='card-title d-flex'>
												<Link
													to={path(`/${book.id}`)}
													className='align-self-center'
												>
													{book.title}
												</Link>
												<Link
													className='align-self-center ml-auto mr-1'
													to={path(
														`/${book.id}/edit`
													)}
												>
													<PencilIcon />
												</Link>
												<TrashIcon
													className='align-self-center mx-1 text-primary clickable'
													data-toggle='modal'
													data-target={`#deleteBookModal${index}`}
												/>
												<Modal
													id={`deleteBookModal${index}`}
													title='Delete Book'
													button={
														<button
															className='btn btn-danger btn-sm'
															onClick={this.deleteBook(
																index
															)}
														>
															Confirm
														</button>
													}
												>
													Are you sure you want to
													delete {book.title}?
												</Modal>
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
											<div>
												{book.tags?.map(
													(tag, index) => (
														<small
															className={`mx-1 badge-${this.randomBadge()}`}
															key={index}
															style={{
																fontSize:
																	'10px',
																padding:
																	'2px 4px',
																borderRadius:
																	'4px',
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
						  ))
						: null}
				</div>
			</div>
		);
	}
}
