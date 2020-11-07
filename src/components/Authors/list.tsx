import React, { Component, MouseEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Author, PaginatedData } from '../../contracts';
import { handleErrors } from '../../helpers';
import { AuthorService } from '../../services';
import toastr from 'toastr';
import state from '../../state';

import Modal from '../Modal';
import Pagination from '../Pagination';

import { ReactComponent as PencilIcon } from 'bootstrap-icons/icons/pencil.svg';
import { ReactComponent as TrashIcon } from 'bootstrap-icons/icons/trash.svg';

type State = {
	data: PaginatedData<Author>;
	isLoading: boolean;
	loaded: boolean;
};

const isAdmin = state.makeMacro<boolean>('isAdmin');

export default class List extends Component<RouteComponentProps, State> {
	service = new AuthorService(this.setState.bind(this));

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			isLoading: false,
			data: {} as PaginatedData<Author>,
			loaded: false,
		};
	}

	componentDidMount() {
		this.refresh();
	}

	async refresh(url: string | null = null) {
		try {
			const data = await this.service.all<PaginatedData<Author>>(url);
			return this.setState({ data, loaded: true });
		} catch (error) {
			handleErrors(error, 'Unable to fetch authors.');
		}
	}

	deleteAuthor(index: number) {
		const author = this.state.data.data[index];
		return (e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			const modal = $(`#deleteAuthorModal${index}`) as any;
			modal.modal('hide');
			modal.on('hidden.bs.modal', () => {
				this.service
					.setModel(author)
					.delete()
					.then(() =>
						toastr.success(
							'Author deleted successfully.',
							author.name
						)
					)
					.catch((error) => {
						console.log(error);
						handleErrors(error, 'Unable to delete author.');
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
						<h4 className='align-self-center m-0 p-0'>Authors</h4>
						{isAdmin() ? (
							<Link
								to={path('/add')}
								className='mr-2 align-self-center ml-auto text-dark mt-1'
							>
								<i className='now-ui-icons ui-1_simple-add'></i>
							</Link>
						) : null}
						<i
							className={`now-ui-icons arrows-1_refresh-69 clickable align-self-center ${
								this.state.isLoading ? 'icon-spin' : ''
							} ${!isAdmin() ? 'ml-auto' : ''}`}
							onClick={(e) => this.refresh()}
						></i>
					</div>
					<div className='col-12'>
						<hr />
					</div>
					<div className='col-sm-12'>
						{this.state.loaded ? (
							<Pagination
								pagination={this.state.data}
								onChange={(url) => {
									this.refresh(url);
								}}
							/>
						) : null}
					</div>
					{this.state.loaded
						? this.state.data.data.map((author, index) => (
								<div
									className='col-sm-12 col-md-6 col-lg-4 p-2'
									key={index}
								>
									<div className='border shadow-sm p-2 bg-white'>
										<h5 className='card-title d-flex'>
											<Link
												to={path(`/${author.id}`)}
												className='align-self-center'
											>
												{author.name}
											</Link>
											{isAdmin() ? (
												<Link
													className='align-self-center ml-auto mr-1'
													to={path(
														`/${author.id}/edit`
													)}
												>
													<PencilIcon />
												</Link>
											) : null}
											{isAdmin() ? (
												<TrashIcon
													className='align-self-center mx-1 text-primary clickable'
													data-toggle='modal'
													data-target={`#deleteAuthorModal${index}`}
												/>
											) : null}
											{isAdmin() ? (
												<Modal
													large={true}
													id={`deleteAuthorModal${index}`}
													title='Delete Author'
													button={
														<button
															className='btn btn-danger btn-sm'
															onClick={this.deleteAuthor(
																index
															)}
														>
															Confirm
														</button>
													}
												>
													Are you sure you want to
													delete {author.name}?
												</Modal>
											) : null}
										</h5>
										<div className='card-text'>
											Email:{' '}
											<a
												href={`mailto:${author.email}`}
												style={{ fontSize: '14px' }}
											>
												{author.email}
											</a>
										</div>
										<div className='card-text'>
											Website:{' '}
											<a
												href={author.website}
												style={{ fontSize: '14px' }}
											>
												{author.website}
											</a>
										</div>
										<div className='card-text'>
											Address:
											<p style={{ fontSize: '14px' }}>
												{author.address}
											</p>
										</div>

										<p
											className='card-text'
											style={{ fontSize: '14px' }}
										>
											{author.books?.length} Books
										</p>
									</div>
								</div>
						  ))
						: null}
					<div className='col-sm-12'>
						{this.state.loaded ? (
							<Pagination
								pagination={this.state.data}
								onChange={(url) => {
									this.refresh(url);
								}}
							/>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}
