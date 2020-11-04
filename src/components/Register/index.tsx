import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Footer from '../Footer';
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from 'formik';
import Axios from 'axios';
import toastr from 'toastr';
import state from '../../state';

import LoginBG from '../../assets/img/bg8.jpg';
import { ReactComponent as Logo } from '../../assets/logo-white.svg';

import { User } from '../../contracts';

import { handleErrors } from '../../helpers';

interface FormState {
	email: string;
	password: string;
	name: string;
}

export default class Register extends Component<RouteComponentProps> {
	handleSubmit() {
		return async (
			values: FormState,
			{ setSubmitting }: FormikHelpers<FormState>
		) => {
			try {
				const response = await Axios.post<{
					user: User;
					token: string;
				}>('/auth/register', values);

				const { user, token } = response.data;

				if (!user.roles) {
					toastr.info('There was a problem with your registration.');
				} else {
					const role = user.roles[0];

					state.set('role', role);
					state.set('user', user);
					state.set('token', token);

					this.props.history.push('/account');
					toastr.success('Registered successfully!');
				}
			} catch (error) {
				console.log(error.toJSON ? error.toJSON() : error);
				handleErrors(error);
			} finally {
				setSubmitting(false);
			}
		};
	}

	validate(values: FormState) {
		const errors: {
			[key: string]: string;
		} = {};
		if (!values.name) {
			errors.name = 'Name is required.';
		}
		if (!values.email) {
			errors.email = 'Email is required.';
		}
		if (!values.password) {
			errors.password = 'Password is required.';
		}
		return errors;
	}

	render() {
		const formState: FormState = { name: '', email: '', password: '' };

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
															<i className='now-ui-icons text_caps-small'></i>
														</span>
													</div>
													<Field
														type='text'
														name='name'
														placeholder='Name'
														className='form-control'
													/>
												</div>
												<ErrorMessage
													name='name'
													component='small'
													className='form-text text-left mt-0 p-0 mb-3 ml-2'
												/>
												<div className='input-group no-border input-lg'>
													<div className='input-group-prepend'>
														<span className='input-group-text'>
															<i className='now-ui-icons users_circle-08'></i>
														</span>
													</div>
													<Field
														type='email'
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
													className={`btn btn-info btn-round btn-lg btn-block ${
														isSubmitting
															? 'disabled'
															: ''
													}`}
													disabled={isSubmitting}
												>
													{isSubmitting ? (
														<i className='now-ui-icons arrows-1_refresh-69 icon-spin'></i>
													) : (
														'Sign Up'
													)}
												</button>
												<div className='row'>
													<h6 className='col-sm-12 col-md-6'>
														<Link
															to='/login'
															className='link'
														>
															Sign In
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
