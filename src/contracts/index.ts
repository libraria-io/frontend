export type Theme = 'dark' | 'light';

export interface Model {
	id: number;
	created_at: Date | string;
	updated_at: Date | string;
}

export interface User extends Model {
	name: string;
	email: string;
	password?: string;
	remember_token?: string;
	email_verified_at: Date | string;
	authors?: Array<Author>;
}

export interface File extends Model {
	type: string;
	name: string;
	size: number;
	public: boolean;
}

export interface Category extends Model {
	name: string;
	books?: Array<Book>;
}

export interface Author extends Model {
	address: string;
	website: string;
	email: string;
	user_id: number;
	user?: User;
	books?: Array<Book>;
}

export interface Book extends Model {
	title: string;
	description: string;
	tag_ids: Array<number>;
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
