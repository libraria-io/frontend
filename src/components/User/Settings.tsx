import { Field, Formik, FormikHelpers, Form } from 'formik';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import toastr from 'toastr';
import state from '../../state';

import { UserService } from '../../services';
import { handleErrors } from '../../helpers';

import { ReactComponent as CircleIcon } from 'bootstrap-icons/icons/slash-circle.svg';
import { User } from '../../contracts';

interface FormState {
	email: string;
	password: string;
	name: string;
}

type Params = { id?: string };

export default class UserForm extends Component<RouteComponentProps<Params>> {
	userService = new UserService(this.setState.bind(this));
	setter: any;

	componentDidMount() {
		this.userService
			.setModel(state.get<User>('user'))
			.get()
			.then((user) => {
				this.userService.setModel(user);
				const set = this.setter;
				set('name', user.name);
				set('email', user.email);
			})
			.catch(console.log);
	}

	bindSetter(setter: any) {
		this.setter = setter;
	}

	submit() {
		return (
			values: FormState,
			{ setSubmitting }: FormikHelpers<FormState>
		) => {
			this.userService.setForm(values);
			this.request()
				.then((user) =>
					toastr.success('Settings saved succesfully.', user.name)
				)
				.catch((errors) => {
					console.log(errors);
					handleErrors(errors, 'Unable to save settings.');
				})
				.finally(() => setSubmitting(false));
		};
	}

	request() {
		return this.userService.put();
	}

	render() {
		const formState: FormState = {
			name: '',
			email: '',
			password: '',
		};
		return (
			<div className='container'>
				<h3 className='my-2 d-flex'>
					Settings
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
				<Formik initialValues={formState} onSubmit={this.submit()}>
					{({ isSubmitting, setFieldValue }) => (
						<Form className='form'>
							{this.bindSetter(setFieldValue)}
							<div className='row'>
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
											'Save'
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
