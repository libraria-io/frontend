import { ErrorMessage, Field, Formik, FormikHelpers, Form } from 'formik';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import toastr from 'toastr';

import { AuthorService } from '../../services';
import { handleErrors } from '../../helpers';

import { ReactComponent as CircleIcon } from 'bootstrap-icons/icons/slash-circle.svg';

type Modes = 'Add' | 'Edit';

interface FormState {
	address: string;
	website: string;
	email: string;
	name: string;
}

interface State {
	mode: Modes;
}

type Params = { id?: string };

export default class AuthorForm extends Component<
	RouteComponentProps<Params>,
	State
> {
	authorService = new AuthorService(this.setState.bind(this));
	setter: any;

	constructor(props: RouteComponentProps<Params>) {
		super(props);
		const id = this.props.match.params.id;
		this.state = {
			mode: id ? 'Edit' : 'Add',
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (this.state.mode === 'Edit' && id) {
			this.authorService
				.get(id)
				.then((author) => {
					this.authorService.setModel(author);
					console.log(author);
					const set = this.setter;
					set('name', author.name);
					set('website', author.website);
					set('address', author.address);
					set('email', author.email);
				})
				.catch((error) => {
					console.log(error);
					toastr.error(
						'Something went wrong. Check your internet connection and try again.'
					);
					this.props.history.goBack();
				});
		}
	}

	bindSetter(setter: any) {
		this.setter = setter;
	}

	validate() {
		return (values: FormState) => {
			const errors: { [key: string]: string } = {};
			if (!values.name) {
				errors.name = 'Name is required.';
			}
		};
	}

	submit() {
		return (
			values: FormState,
			{ setSubmitting }: FormikHelpers<FormState>
		) => {
			this.authorService.setForm(values);
			this.request()
				.then((author) =>
					toastr.success('Author saved succesfully.', author.name)
				)
				.catch((errors) => {
					console.log(errors);
					handleErrors(errors, 'Unable to save author.');
				})
				.finally(() => setSubmitting(false));
		};
	}

	request() {
		return this.state.mode === 'Add'
			? this.authorService.post()
			: this.authorService.put();
	}

	render() {
		const formState: FormState = {
			address: '',
			website: '',
			email: '',
			name: '',
		};
		return (
			<div className='container'>
				<h3 className='my-2 d-flex'>
					{this.state.mode} Author
					<button
						onClick={(e) => {
							e.preventDefault();
							this.props.history.goBack();
						}}
						className='btn btn-info btn-sm align-self-center ml-auto'
					>
						Back
					</button>
				</h3>
				<Formik
					initialValues={formState}
					validate={this.validate()}
					onSubmit={this.submit()}
				>
					{({ isSubmitting, setFieldValue }) => (
						<Form className='form'>
							{this.bindSetter(setFieldValue)}
							<div className='row'>
								<div className='col-sm-12 col-md-6'>
									<div className='form-group'>
										<label htmlFor='name'>Name:</label>
										<Field
											type='text'
											id='name'
											name='name'
											placeholder='Name'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
										/>
										<ErrorMessage
											name='name'
											component='small'
											className='form-text text-left mt-0 p-0 mb-3 ml-2'
										/>
									</div>
								</div>
								<div className='col-sm-12 col-md-6'>
									<div className='form-group'>
										<label htmlFor='website'>
											Website:
										</label>
										<Field
											type='text'
											id='website'
											name='website'
											placeholder='Website'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
										/>
									</div>
								</div>
								<div className='col-sm-12 col-md-6'>
									<div className='form-group'>
										<label htmlFor='email'>Email:</label>
										<Field
											type='email'
											id='email'
											name='email'
											placeholder='Email'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
										/>
									</div>
								</div>
								<div className='col-sm-12 col-md-6'>
									<div className='form-group'>
										<label htmlFor='address'>
											Address:
										</label>
										<Field
											type='text'
											id='address'
											name='address'
											placeholder='Address'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
										/>
									</div>
								</div>
								<button
									type='submit'
									className={`btn btn-info btn-sm mb-5 ${
										isSubmitting ? 'disabled' : ''
									}`}
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<CircleIcon className='icon-spin' />
									) : (
										'Submit'
									)}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		);
	}
}
