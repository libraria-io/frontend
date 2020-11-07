import React, { Component, MouseEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { User, PaginatedData } from '../../../../contracts';
import { handleErrors } from '../../../../helpers';
import { UserService } from '../../../../services';
import toastr from 'toastr';
import state from '../../../../state';

import Modal from '../../../Modal';
import Pagination from '../../../Pagination';

import { ReactComponent as PencilIcon } from 'bootstrap-icons/icons/pencil.svg';
import { ReactComponent as TrashIcon } from 'bootstrap-icons/icons/trash.svg';

type State = {
	data: PaginatedData<User>;
	isLoading: boolean;
	loaded: boolean;
	current: User;
};

export default class List extends Component<RouteComponentProps, State> {
	service = new UserService(this.setState.bind(this));

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			isLoading: false,
			data: {} as PaginatedData<User>,
			loaded: false,
			current: state.get<User>('user'),
		};
	}

	componentDidMount() {
		this.refresh();
	}

	async refresh(url: string | null = null) {
		try {
			const data = await this.service.all<PaginatedData<User>>(url);
			return this.setState({ data, loaded: true });
		} catch (error) {
			handleErrors(error, 'Unable to fetch users.');
		}
	}

	deleteUser(index: number) {
		const user = this.state.data.data[index];
		return (e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			const modal = $(`#deleteUserModal${index}`) as any;
			modal.modal('hide');
			modal.on('hidden.bs.modal', () => {
				this.service
					.setModel(user)
					.delete()
					.then(() =>
						toastr.success('User deleted successfully.', user.name)
					)
					.catch((error) => {
						console.log(error);
						handleErrors(error, 'Unable to delete user.');
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
						<h4 className='align-self-center m-0 p-0'>Users</h4>
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
					<div className='col-sm-12'>
						{this.state.loaded ? (
							<Pagination
								dontJustify={true}
								pagination={this.state.data}
								onChange={(url) => {
									this.refresh(url);
								}}
							/>
						) : null}
					</div>
					{this.state.loaded ? (
						<div className='col-12'>
							<table className='table'>
								<thead>
									<tr>
										<th>Name</th>
										<th>Email</th>
										<th>Role</th>
										<th className='text-right'>Actions</th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.data.map((user, index) => (
										<tr key={index}>
											<td>{user.name}</td>
											<td>{user.email}</td>
											<td>
												{user.roles
													? user.roles[0].name
													: 'N/A'}
											</td>
											<td className='td-actions text-right'>
												{this.state.current.id !==
												user.id ? (
													<Link
														className='align-self-center ml-auto mr-1'
														to={path(
															`/${user.id}/edit`
														)}
													>
														<PencilIcon />
													</Link>
												) : null}
												{this.state.current.id !==
												user.id ? (
													<TrashIcon
														className='align-self-center mx-1 text-primary clickable'
														data-toggle='modal'
														data-target={`#deleteUserModal${index}`}
													/>
												) : null}
												{this.state.current.id !==
												user.id ? (
													<Modal
														large={true}
														id={`deleteUserModal${index}`}
														title='Delete User'
														button={
															<button
																className='btn btn-danger btn-sm'
																onClick={this.deleteUser(
																	index
																)}
															>
																Confirm
															</button>
														}
													>
														<div className='text-center'>
															Are you sure you
															want to delete{' '}
															{user.name}?
														</div>
													</Modal>
												) : (
													<span className='badge badge-warning'>
														You
													</span>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : null}
					<div className='col-sm-12'>
						{this.state.loaded ? (
							<Pagination
								dontJustify={true}
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
