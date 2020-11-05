import React, { Component } from 'react';

type Props = {
	button: any;
	title: string;
	id: string;
	large?: boolean;
};

export default class Modal extends Component<Props> {
	render() {
		const large = this.props.large || false;
		return (
			<div
				className='modal fade'
				id={this.props.id}
				tabIndex={-1}
				role='dialog'
				aria-labelledby={`${this.props.id}ModalLabel`}
				aria-hidden='true'
			>
				<div
					className={`modal-dialog modal-dialog-centered ${
						large ? 'modal-lg' : ''
					}`}
					role='document'
				>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5
								className='modal-title'
								id={`${this.props.id}ModalLabel`}
							>
								{this.props.title}
							</h5>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>{this.props.children}</div>
						<div className='modal-footer'>
							{this.props.button}
							<button
								type='button'
								className='btn btn-secondary btn-sm'
								data-dismiss='modal'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
