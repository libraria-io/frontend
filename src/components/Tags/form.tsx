import { ErrorMessage, Field, Formik, FormikHelpers, Form } from 'formik';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import toastr from 'toastr';

import { TagService } from '../../services';
import { handleErrors } from '../../helpers';

import { ReactComponent as CircleIcon } from 'bootstrap-icons/icons/slash-circle.svg';

type Modes = 'Add' | 'Edit';

interface FormState {
	name: string;
}

interface State {
	mode: Modes;
}

type Params = { id?: string };

export default class TagForm extends Component<
	RouteComponentProps<Params>,
	State
> {
	tagService = new TagService(this.setState.bind(this));
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
			this.tagService
				.get(id)
				.then((tag) => {
					this.tagService.setModel(tag);
					const set = this.setter;
					set('name', tag.name);
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
		};
	}

	submit() {
		return (
			values: FormState,
			{ setSubmitting }: FormikHelpers<FormState>
		) => {
			this.tagService.setForm(values);
			this.request()
				.then((tag) =>
					toastr.success('Tag saved succesfully.', tag.name)
				)
				.catch((errors) => {
					console.log(errors);
					handleErrors(errors, 'Unable to save tag.');
				})
				.finally(() => setSubmitting(false));
		};
	}

	request() {
		return this.state.mode === 'Add'
			? this.tagService.post()
			: this.tagService.put();
	}

	render() {
		const formState: FormState = {
			name: '',
		};
		return (
			<div className='container'>
				<h3 className='my-2 d-flex'>
					{this.state.mode} Tag
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
								<div className='col-sm-12 col-md-6 col-lg-4'>
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
								<div className='col-sm-12'>
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
