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
}
