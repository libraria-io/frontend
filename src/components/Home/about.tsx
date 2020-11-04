import React, { Component } from 'react';

import BG1 from '../../assets/img/bg11.jpg';
import BG3 from '../../assets/img/bg3.jpg';
import Login from '../../assets/img/login.jpg';

export default class About extends Component {
	render() {
		return (
			<div className='section section-about-us overflow-none'>
				<div className='container'>
					<div
						className='row'
						data-aos='fade-left'
						data-aos-duration='1200'
					>
						<div className='col-md-8 ml-auto mr-auto text-center'>
							<h2 className='title'>Who are we?</h2>
							<h5 className='description'>
								libraria.io is an open, editable library
								catalog, building towards a web page for every
								book ever published. Read, borrow, and discover
								more than 3M books for free.
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
									data-aos='fade-right'
									data-aos-duration='1100'
								>
									<p className='blockquote blockquote-primary'>
										"Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Ad at itaque
										perspiciatis fugit! Necessitatibus, quos
										quisquam. Alias adipisci maiores
										voluptatem blanditiis facere."
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
									data-aos='fade-right'
									data-aos-duration='1300'
								></div>
							</div>
							<div className='col-md-5'>
								<div
									className='image-container image-right'
									style={{
										backgroundImage: `url(${BG1})`,
									}}
									data-aos='fade-left'
									data-aos-duration='1400'
								></div>
								<h3
									data-aos='fade-left'
									data-aos-duration='1500'
								>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit.
								</h3>
								<p
									data-aos='fade-left'
									data-aos-duration='1600'
								>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Neque ea perspiciatis
									voluptatibus tenetur rerum quod voluptate
									accusantium expedita.
								</p>
								<p
									data-aos='fade-left'
									data-aos-duration='1700'
								>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Nesciunt et quisquam
									repudiandae harum? Recusandae nihil cumque
									voluptatibus unde doloremque quas ab
									consequatur rerum iusto tenetur, excepturi,
									numquam modi debitis error?
								</p>
								<p
									data-aos='fade-left'
									data-aos-duration='1800'
								>
									Lorem, ipsum dolor sit amet consectetur
									adipisicing elit. Tempore pariatur dolorum
									voluptatibus quod est dicta, fugit laborum
									vel, quibusdam sint quia repellat. Odio
									magnam et eos sit quo quam debitis.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
