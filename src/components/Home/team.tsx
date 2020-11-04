import React, { Component } from 'react';

export default class Team extends Component {
	render() {
		return (
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
										"The public is more familiar with bad
										design than good design. It is, in
										effect, conditioned to prefer bad
										design, because that is what it lives
										with. The new becomes threatening, the
										old reassuring."
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
		);
	}
}
