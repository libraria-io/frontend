import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Footer from '../Footer';

import BG6 from '../../assets/img/bg6.jpg';
import BG1 from '../../assets/img/bg11.jpg';
import BG3 from '../../assets/img/bg3.jpg';
import Login from '../../assets/img/login.jpg';

export default class Home extends Component {
	render() {
		return (
			<div className='wrapper'>
				<div className='page-header page-header-small'>
					<div
						className='page-header-image'
						data-parallax='true'
						style={{
							backgroundImage: `url(${BG6})`,
						}}
					></div>
					<div className='content-center'>
						<div className='container'>
							<h2 className='title'>
								Today's research, tomorrow's innovation.
							</h2>
							<div className='text-center'>
								<a
									href='https://facebook.com/mekkyinblack'
									target='_blank'
									rel='noreferrer'
									className='btn btn-primary btn-icon btn-round'
								>
									<i className='fab fa-facebook-square'></i>
								</a>
								<a
									href='https://github.com/libraria-io'
									target='_blank'
									rel='noreferrer'
									className='btn btn-primary btn-icon btn-round'
								>
									<i className='fab fa-github'></i>
								</a>
							</div>
							<Link
								to='/login'
								className='btn btn-primary btn-sm btn-round'
							>
								Get Started
							</Link>
						</div>
					</div>
				</div>
				<div className='section section-about-us'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-8 ml-auto mr-auto text-center'>
								<h2 className='title'>Who are we?</h2>
								<h5 className='description'>
									libraria.io is an open, editable library
									catalog, building towards a web page for
									every book ever published. Read, borrow, and
									discover more than 3M books for free.
								</h5>
							</div>
						</div>
						<div className='separator separator-primary'></div>
						<div className='section-story-overview'>
							<div className='row'>
								<div className='col-md-6'>
									<div
										className='image-container image-left'
										style={{
											backgroundImage: `url(${Login})`,
										}}
									>
										<p className='blockquote blockquote-primary'>
											"Lorem ipsum dolor sit amet
											consectetur adipisicing elit. Ad at
											itaque perspiciatis fugit!
											Necessitatibus, quos quisquam. Alias
											adipisci maiores voluptatem
											blanditiis facere."
											<br />
											<br />
											<small>-Anonymous</small>
										</p>
									</div>
									<div
										className='image-container'
										style={{
											backgroundImage: `url(${BG3})`,
										}}
									></div>
								</div>
								<div className='col-md-5'>
									<div
										className='image-container image-right'
										style={{
											backgroundImage: `url(${BG1})`,
										}}
									></div>
									<h3>
										Lorem ipsum dolor sit amet, consectetur
										adipisicing elit.
									</h3>
									<p>
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Neque ea perspiciatis
										voluptatibus tenetur rerum quod
										voluptate accusantium expedita.
									</p>
									<p>
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Nesciunt et quisquam
										repudiandae harum? Recusandae nihil
										cumque voluptatibus unde doloremque quas
										ab consequatur rerum iusto tenetur,
										excepturi, numquam modi debitis error?
									</p>
									<p>
										Lorem, ipsum dolor sit amet consectetur
										adipisicing elit. Tempore pariatur
										dolorum voluptatibus quod est dicta,
										fugit laborum vel, quibusdam sint quia
										repellat. Odio magnam et eos sit quo
										quam debitis.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='section section-team text-center'>
					<div className='container'>
						<h2 className='title'>The Creator</h2>
						<div className='team'>
							<div className='row'>
								<div className='col-sm-12 col-md-4 offset-md-4'>
									<div className='team-player'>
										<img
											src='https://avatars1.githubusercontent.com/u/56546989?s=460&u=cb4b333610a43932f3dc5aab0ca8c1994a30fb0b&v=4'
											alt='Thumbnail'
											className='rounded-circle img-fluid img-raised'
										/>
										<h4 className='title'>
											John Michael Manlupig
										</h4>
										<p className='category text-primary'>
											Web Developer
										</p>
										<p className='description'>
											"The public is more familiar with
											bad design than good design. It is,
											in effect, conditioned to prefer bad
											design, because that is what it
											lives with. The new becomes
											threatening, the old reassuring."
										</p>
										<a
											href='https://twitter.com/avidianity'
											target='_blank'
											rel='noopener noreferrer'
											className='btn btn-primary btn-icon btn-round'
										>
											<i className='fab fa-twitter'></i>
										</a>
										<a
											href='https://www.instagram.com/mekkydigret'
											target='_blank'
											rel='noopener noreferrer'
											className='btn btn-primary btn-icon btn-round'
										>
											<i className='fab fa-instagram'></i>
										</a>
										<a
											href='https://facebook.com/mekkyinblack'
											target='_blank'
											rel='noopener noreferrer'
											className='btn btn-primary btn-icon btn-round'
										>
											<i className='fab fa-facebook-square'></i>
										</a>
										<a
											href='http://github.com/avidianity'
											target='_blank'
											rel='noopener noreferrer'
											className='btn btn-primary btn-icon btn-round'
										>
											<i className='fab fa-github'></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer default={true} />
			</div>
		);
	}
}
