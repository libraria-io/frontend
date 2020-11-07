import React, { Component } from 'react';
import { PaginatedData, Model } from '../contracts';

type Props = {
	pagination: PaginatedData<Model>;
	onChange: (url: string | null) => void;
	dontJustify?: boolean;
};

export default class Pagination extends Component<Props> {
	render() {
		const pagination = { ...this.props.pagination };
		const onChange = this.props.onChange;

		pagination.links = pagination.links.filter((link) =>
			Number.isInteger(link.label)
		);
		if (pagination.total <= pagination.per_page) {
			return null;
		}
		return (
			<nav aria-label='Page navigation example'>
				<ul
					className={`pagination ${
						this.props.dontJustify ? '' : 'justify-content-center'
					}`}
				>
					{pagination.prev_page_url ? (
						<li className='page-item'>
							<button
								className='page-link'
								onClick={(e) => {
									e.preventDefault();
									onChange(pagination.prev_page_url);
								}}
							>
								Previous
							</button>
						</li>
					) : null}
					{pagination.links.map((link, index) => (
						<li
							className={`page-item ${
								link.active ? 'active' : ''
							}`}
							key={index}
						>
							<button
								className='page-link'
								onClick={(e) => {
									e.preventDefault();
									onChange(link.url);
								}}
							>
								{link.label}
							</button>
						</li>
					))}
					{pagination.next_page_url ? (
						<li className='page-item'>
							<button
								className='page-link'
								onClick={(e) => {
									e.preventDefault();
									onChange(pagination.next_page_url);
								}}
							>
								Next
							</button>
						</li>
					) : null}
				</ul>
			</nav>
		);
	}
}
