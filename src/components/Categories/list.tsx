import React, { Component, MouseEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Category } from '../../contracts';
import { handleErrors } from '../../helpers';
import { CategoryService } from '../../services';
import toastr from 'toastr';
import state from '../../state';

import Modal from '../Modal';

import { ReactComponent as PencilIcon } from 'bootstrap-icons/icons/pencil.svg';
import { ReactComponent as TrashIcon } from 'bootstrap-icons/icons/trash.svg';

type State = {
	data: Array<Category>;
	isLoading: boolean;
	loaded: boolean;
};

const isAdmin = state.makeMacro<boolean>('isAdmin');

export default class List extends Component<RouteComponentProps, State> {
	service = new CategoryService(this.setState.bind(this));

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			isLoading: false,
			data: [],
			loaded: false,
		};
	}

	componentDidMount() {
		this.refresh();
	}

	async refresh() {
		try {
			const data = await this.service.all();
			return this.setState({ data, loaded: true });
		} catch (error) {
			handleErrors(error, 'Unable to fetch authors.');
		}
	}

	deleteCategory(index: number) {
		const category = this.state.data[index];
		return (e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			const modal = $(`#deleteCategoryModal${index}`) as any;
			modal.modal('hide');
			modal.on('hidden.bs.modal', () => {
				this.service
					.setModel(category)
					.delete()
					.then(() =>
						toastr.success(
							'Category deleted successfully.',
							category.name
						)
					)
					.catch((error) => {
						console.log(error);
						handleErrors(error, 'Unable to delete category.');
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
						<h4 className='align-self-center m-0 p-0'>
							Categories
						</h4>
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
							onClick={() => this.refresh()}
						></i>
					</div>
					<div className='col-12'>
						<hr />
					</div>
					{this.state.loaded
						? this.state.data.map((category, index) => (
								<div
									className='col-sm-12 col-md-3 p-2 bg-white'
									key={index}
								>
									<div className='d-flex shadow-sm border p-2'>
										<div className='align-self-center'>
											{category.name}
										</div>
										{isAdmin() ? (
											<Link
												className='align-self-center ml-auto mr-1'
												to={path(
													`/${category.id}/edit`
												)}
											>
												<PencilIcon />
											</Link>
										) : null}
										{isAdmin() ? (
											<TrashIcon
												className='align-self-center mx-1 text-primary clickable'
												data-toggle='modal'
												data-target={`#deleteCategoryModal${index}`}
											/>
										) : null}
									</div>
									<Modal
										large={true}
										id={`deleteCategoryModal${index}`}
										title='Delete Category'
										button={
											<button
												className='btn btn-danger btn-sm'
												onClick={this.deleteCategory(
													index
												)}
											>
												Confirm
											</button>
										}
									>
										Are you sure you want to delete{' '}
										{category.name}?
									</Modal>
								</div>
						  ))
						: null}
				</div>
			</div>
		);
	}
}
