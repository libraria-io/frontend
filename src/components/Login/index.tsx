import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Footer from '../Footer';
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from 'formik';
import Axios from 'axios';
import toastr from 'toastr';
import state from '../../state';

import LoginBG from '../../assets/img/bg11.jpg';
import { ReactComponent as Logo } from '../../assets/logo-white.svg';

import { User } from '../../contracts';
import { handleErrors } from '../../helpers';

interface FormState {
	email: string;
	password: string;
}

export default class Login extends Component<RouteComponentProps> {
	handleSubmit() {
		return async (
			values: FormState,
			{ setSubmitting }: FormikHelpers<FormState>
		) => {
			try {
				const response = await Axios.post<{
					user: User;
					token: string;
				}>('/auth/login', values);

				const { user, token } = response.data;

				if (!user.roles) {
					toastr.info('There was a problem with your login.');
					return;
				}

				const role = user.roles[0];
				let destination: string | null = null;

				switch (role.name) {
					case 'Admin':
						destination = '/dashboard';
						break;
					case 'Normal':
						destination = '/account';
						break;
					default:
						toastr.info('There was a problem with your account.');
						break;
				}

				if (destination) {
					state.set('user', user);
					state.set('token', token);
					state.set('role', role);

					this.props.history.push(destination);
					toastr.success(`Welcome back, ${user.name}.`);
				}
			} catch (error) {
				console.log(error.toJSON ? error.toJSON() : error);
				handleErrors(error, 'Unable to login.');
			} finally {
				setSubmitting(false);
			}
		};
	}

	validate(values: FormState) {
		const errors: {
			[key: string]: string;
		} = {};
		if (!values.email) {
			errors.email = 'Email is required.';
		}
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Email must be valid.';
		}
		if (!values.password) {
			errors.password = 'Password is required.';
		}
		return errors;
	}

	render() {
		const formState: FormState = { email: '', password: '' };

		return (
			<div className='page-header' filter-color='orange'>
				<div
					className='page-header-image'
					style={{ backgroundImage: `url(${LoginBG})` }}
				></div>
				<div className='content'>
					<div className='container'>
						<div className='col-md-4 ml-auto mr-auto'>
							<div className='card card-login card-plain'>
								<Formik
									initialValues={formState}
									validate={this.validate}
									onSubmit={this.handleSubmit()}
								>
									{({ isSubmitting }) => (
										<Form className='form'>
											<div className='card-header mb-4 mt-5'>
												<Logo width='240' />
											</div>
											<div className='card-body'>
												<div className='input-group no-border input-lg'>
													<div className='input-group-prepend'>
														<span className='input-group-text'>
															<i className='now-ui-icons users_circle-08'></i>
														</span>
													</div>
													<Field
														type='text'
														name='email'
														placeholder='Email'
														className='form-control'
													/>
												</div>
												<ErrorMessage
													name='email'
													component='small'
													className='form-text text-left mt-0 p-0 mb-3 ml-2'
												/>
												<div className='input-group no-border input-lg'>
													<div className='input-group-prepend'>
														<span className='input-group-text'>
															<i className='now-ui-icons objects_key-25'></i>
														</span>
													</div>
													<Field
														type='password'
														name='password'
														placeholder='Password'
														className='form-control'
													/>
												</div>
												<ErrorMessage
													name='password'
													component='small'
													className='form-text text-left mt-0 p-0 mb-3 ml-2'
												/>
											</div>
											<div className='card-footer text-center'>
												<button
													type='submit'
													className={`btn btn-primary btn-round btn-lg btn-block ${
														isSubmitting
															? 'disabled'
															: ''
													}`}
													disabled={isSubmitting}
												>
													{isSubmitting ? (
														<i className='now-ui-icons arrows-1_refresh-69 icon-spin'></i>
													) : (
														'Sign In'
													)}
												</button>
												<div className='row'>
													<h6 className='col-sm-12 col-md-6'>
														<Link
															to='/register'
															className='link'
														>
															Create Account
														</Link>
													</h6>
													<h6 className='col-sm-12 col-md-6'>
														<Link
															to='/forgot-password'
															className='link'
														>
															Forgot password?
														</Link>
													</h6>
												</div>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</div>
				<Footer default={false} />
			</div>
		);
	}
}
