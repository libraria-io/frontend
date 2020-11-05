import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import React, { ChangeEvent, Component, createRef } from 'react';
import { RouteComponentProps as RCProps } from 'react-router-dom';
import toastr from 'toastr';

import { Author, Category, PaginatedData, Tag } from '../../contracts';

import { ReactComponent as CircleIcon } from 'bootstrap-icons/icons/slash-circle.svg';

import {
	AuthorService,
	BookService,
	CategoryService,
	TagService,
} from '../../services';
import { handleErrors } from '../../helpers';

type Modes = 'Add' | 'Edit';

interface FormState {
	title: string;
	description: string;
	tag_ids: Array<number>;
	category_id: number;
	author_id: number;
	photo: File | null;
}

interface State {
	mode: Modes;
	photo_url: string;
	tags: Array<Tag>;
	categories: Array<Category>;
	authors: Array<Author>;
}

type Params = { id?: string };

export default class BookForm extends Component<RCProps<Params>, State> {
	bookService = new BookService<FormState>(this.setState.bind(this));
	tagService = new TagService(this.setState.bind(this));
	categoryService = new CategoryService(this.setState.bind(this));
	authorService = new AuthorService(this.setState.bind(this));

	photoRef = createRef<HTMLInputElement>();

	setter = (() => {}) as any;

	constructor(props: RCProps<Params>) {
		super(props);
		const id = this.props.match.params.id;
		this.state = {
			mode: id ? 'Edit' : 'Add',
			photo_url: 'https://via.placeholder.com/300',
			tags: [],
			categories: [],
			authors: [],
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (this.state.mode === 'Edit' && id) {
			this.bookService
				.get(id)
				.then((book) => {
					this.bookService.setModel(book);
					this.setState({
						photo_url: book.photo?.uri as string,
					});
					const set = this.setter;
					set('title', book.title);
					set('description', book.description);
					set('category_id', book.category?.id as number);
					set('author_id', book.author?.id as number);
				})
				.catch((error) => {
					console.log(error);
					toastr.error(
						'Something went wrong. Check your internet connection and try again.'
					);
					this.props.history.goBack();
				});
		}

		Promise.all([
			this.tagService.all(),
			this.categoryService.all(),
			this.authorService.all<PaginatedData<Author>>(),
		])
			.then(([tags, categories, authors]) => {
				this.setState({
					tags,
					categories,
					authors: authors.data,
				});
				if (this.state.mode === 'Add') {
					const set = this.setter;
					set('author_id', authors.data[0].id);
					set('category_id', categories[0].id);
				}
			})
			.catch((error) => {
				console.log(error);
				toastr.error(
					'Something went wrong. Check your internet connection and try again.'
				);
				this.props.history.goBack();
			});
	}

	processFile() {
		return (e: ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			const file = e.target.files ? e.target.files[0] : null;
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					this.setState({
						photo_url: String(reader.result),
					});
					this.setter('photo', file);
				};

				reader.readAsDataURL(file);
			}
		};
	}

	bindSetter(setter: any) {
		this.setter = setter;
	}

	validate() {
		return (values: FormState) => {
			const errors: { [key: string]: string } = {};
			if (!values.title) {
				errors.title = 'Title is required.';
			}
			if (!values.description) {
				errors.description = 'Description is required.';
			}
			if (!values.category_id) {
				errors.category_id = 'Category is required.';
			}
			if (!values.author_id) {
				errors.author_id = 'Author is required.';
			}
			if (!values.photo || values.photo === null) {
				errors.photo = 'Photo is required.';
			}
		};
	}

	submit() {
		return (
			values: FormState,
			{ setSubmitting }: FormikHelpers<FormState>
		) => {
			if (this.state.mode === 'Add') {
				if (!values.photo) {
					toastr.error('Photo is required.');
					return setSubmitting(false);
				}
			}
			this.bookService.setForm(values);
			this.request()
				.then((book) => {
					console.log(book);
					toastr.success('Book saved succesfully.', book.title);
				})
				.catch((errors) => {
					console.log(errors);
					handleErrors(errors, 'Unable to save book.');
				})
				.finally(() => setSubmitting(false));
		};
	}

	request() {
		return this.state.mode === 'Add'
			? this.bookService.post()
			: this.bookService.put();
	}

	render() {
		const formState: FormState = {
			title: '',
			description: '',
			tag_ids: [],
			category_id: 1,
			author_id: 1,
			photo: null,
		};
		return (
			<div className='container'>
				<h3 className='my-2 d-flex'>
					<div className='align-self-center'>
						{this.state.mode} Book
					</div>
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
					{({ isSubmitting, setFieldValue, values }) => (
						<Form className='form'>
							{this.bindSetter(setFieldValue)}
							<div className='d-flex my-1'>
								<img
									src={this.state.photo_url}
									alt='Book Preview'
									style={{ height: '150px', width: '150px' }}
									onClick={() =>
										this.photoRef.current?.click()
									}
									className='mx-auto img-fluid clickable shadow rounded-circle bg-dark'
								/>
								<input
									type='file'
									className='d-none'
									ref={this.photoRef}
									onChange={this.processFile()}
								/>
							</div>
							<hr />
							<div className='row'>
								<div className='col-sm-12 col-md-4'>
									<div className='form-group'>
										<label htmlFor='title'>Title:</label>
										<Field
											type='text'
											id='title'
											name='title'
											placeholder='Title'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
										/>
										<ErrorMessage
											name='title'
											component='small'
											className='form-text text-left mt-0 p-0 mb-3 ml-2'
										/>
									</div>
								</div>
								<div className='col-sm-12 col-md-4'>
									<div className='form-group'>
										<label htmlFor='category_id'>
											Category:
										</label>
										<Field
											id='category_id'
											name='category_id'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
											component='select'
										>
											{this.state.categories.map(
												(category, index) => (
													<option
														key={index}
														value={category.id}
													>
														{category.name}
													</option>
												)
											)}
										</Field>
										<ErrorMessage
											name='category_id'
											component='small'
											className='form-text text-left mt-0 p-0 mb-3 ml-2'
										/>
									</div>
								</div>
								<div className='col-sm-12 col-md-4'>
									<div className='form-group'>
										<label htmlFor='tag_ids'>
											Tags: (Ctrl + Click)
										</label>
										<Field
											id='tag_ids'
											name='tag_ids'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
											component='select'
											multiple={true}
										>
											{this.state.tags.map(
												(tag, index) => (
													<option
														key={index}
														value={tag.id}
														selected={values.tag_ids.includes(
															tag.id
														)}
													>
														{tag.name}
													</option>
												)
											)}
										</Field>
										<ErrorMessage
											name='tag_ids'
											component='small'
											className='form-text text-left mt-0 p-0 mb-3 ml-2'
										/>
									</div>
								</div>
								<div className='col-sm-12 col-md-4'>
									<div className='form-group'>
										<label htmlFor='author_id'>
											Author:
										</label>
										<Field
											id='author_id'
											name='author_id'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											disabled={isSubmitting}
											component='select'
										>
											{this.state.authors.map(
												(author, index) => (
													<option
														key={index}
														value={Number(
															author.id
														)}
													>
														{author.name}
													</option>
												)
											)}
										</Field>
										<ErrorMessage
											name='author_id'
											component='small'
											className='form-text text-left mt-0 p-0 mb-3 ml-2'
										/>
									</div>
								</div>
								<div className='col-sm-12'>
									<div className='form-group'>
										<label htmlFor='description'>
											Description:
										</label>
										<Field
											type='text'
											id='description'
											name='description'
											component='textarea'
											placeholder='Description'
											className={`form-control form-control-sm ${
												isSubmitting ? 'disabled' : ''
											}`}
											style={{ height: '60px' }}
											disabled={isSubmitting}
										/>
										<ErrorMessage
											name='description'
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
