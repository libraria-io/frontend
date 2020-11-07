import { ErrorMessage, Field, Formik, FormikHelpers, Form } from 'formik';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import toastr from 'toastr';

import { UserService } from '../../../../services';
import { Roles } from '../../../../contracts';
import { handleErrors } from '../../../../helpers';

import { ReactComponent as CircleIcon } from 'bootstrap-icons/icons/slash-circle.svg';

type Modes = 'Add' | 'Edit';

interface FormState {
	email: string;
	password: string;
	name: string;
	role: Roles;
}

interface State {
	mode: Modes;
}

type Params = { id?: string };

export default class UserForm extends Component<
	RouteComponentProps<Params>,
	State
> {
	userService = new UserService(this.setState.bind(this));
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
			this.userService
				.get(id)
				.then((user) => {
					this.userService.setModel(user);
					const set = this.setter;
					set('name', user.name);
					set('email', user.email);
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
			if (!values.name || values.name.length === 0) {
				errors.name = 'Name is required.';
			}
			if (!values.email || values.email.length === 0) {
				errors.email = 'Email is required.';
			}
			if (!values.password || values.password.length === 0) {
				errors.password = 'Password is required.';
			}
		};
	}

	submit() {
		return (
			values: FormState,
			{ setSubmitting }: FormikHelpers<FormState>
		) => {
			this.userService.setForm(values);
			this.request()
				.then((user) =>
					toastr.success('User saved succesfully.', user.name)
				)
				.catch((errors) => {
					console.log(errors);
					handleErrors(errors, 'Unable to save user.');
				})
				.finally(() => setSubmitting(false));
		};
	}

	request() {
		return this.state.mode === 'Add'
			? this.userService.post()
			: this.userService.put();
	}

	render() {
		const formState: FormState = {
			name: '',
			email: '',
			password: '',
			role: 'Normal',
		};
		return (
			<div className='container'>
				<h3 className='my-2 d-flex'>
					{this.state.mode} User
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
								<div className='col-sm-12 col-lg-4 offset-md-4'>
									<div className='form-group'>
										<label htmlFor='role'>Role:</label>
										<Field
											id='role'
											name='role'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
											component='select'
										>
											<option value='Normal'>
												Normal
											</option>
											<option value='Admin'>Admin</option>
										</Field>
										<ErrorMessage
											name='role'
											component='small'
											className='form-text text-left mt-0 p-0 mb-3 ml-2'
										/>
									</div>
								</div>
								<div className='col-sm-12 col-lg-4 offset-md-4'>
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
								<div className='col-sm-12 col-lg-4 offset-md-4'>
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
										<ErrorMessage
											name='email'
											component='small'
											className='form-text text-left mt-0 p-0 mb-3 ml-2'
										/>
									</div>
								</div>
								<div className='col-sm-12 col-lg-4 offset-md-4'>
									<div className='form-group'>
										<label htmlFor='password'>
											Password:
										</label>
										<Field
											type='password'
											id='password'
											name='password'
											placeholder='Password'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
										/>
										<ErrorMessage
											name='password'
											component='small'
											className='form-text text-left mt-0 p-0 mb-3 ml-2'
										/>
									</div>
								</div>
								<div className='col-sm-12 text-center'>
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
							</div>
						</Form>
					)}
				</Formik>
			</div>
		);
	}
}
