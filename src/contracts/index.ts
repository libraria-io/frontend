export type Theme = 'dark' | 'light';

export type Roles = 'Admin' | 'Normal';

export interface Model {
	id: number;
	created_at: Date | string;
	updated_at: Date | string;
}

export interface Role extends Model {
	name: Roles;
	guard_name: string;
	pivot: {
		model_id: number;
		role_id: number;
		model_type: string;
	};
}

export interface User extends Model {
	name: string;
	email: string;
	password?: string;
	remember_token?: string;
	email_verified_at: Date | string;
	authors?: Array<Author>;
	roles?: Array<Role>;
}

export type PaginationLink = {
	url: string | null;
	label: string;
	active: boolean;
};

export interface PaginatedData<T extends Model> {
	current_page: number;
	data: Array<T>;
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: Array<PaginationLink>;
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
}

export interface File extends Model {
	type: string;
	name: string;
	size: number;
	public: boolean;
	uri: string;
}

export interface Category extends Model {
	name: string;
	books?: Array<Book>;
}

export interface Author extends Model {
	address: string;
	website: string;
	email: string;
	name: string;
	user_id: number;
	user?: User;
	books?: Array<Book>;
}

export interface Book extends Model {
	title: string;
	description: string;
	tag_ids: Array<number>;
	tags?: Array<Tag>;
	photo_id: number;
	photo?: File;
	category_id: number;
	category?: Category;
	author_id: number;
	author?: Author;
}

export interface Tag extends Model {
	name: string;
	books?: Array<Book>;
}
