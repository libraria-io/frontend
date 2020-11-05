import Axios from 'axios';

import { Model } from '../contracts/index';

export type FS = { [key: string]: any };

export abstract class BaseService<T extends Model, FS> {
	protected url = '';
	protected model: T;
	protected form = new FormData();
	isLoading = false;
	protected setState: any;

	constructor(setState?: any, model?: T) {
		this.model = model || ({} as T);
		this.setState = setState || (() => {});
	}

	getModel() {
		return this.model;
	}

	setModel(model: T) {
		this.model = model;
		return this;
	}

	getForm() {
		return this.form;
	}

	setEntry(key: string, value: any) {
		this.form.append(key, value);
		return this;
	}

	setForm(values: FS) {
		this.form = new FormData();
		Object.entries(values).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((v) => this.form.append(`${key}[]`, v));
			} else if (value) {
				this.form.append(key, value);
			}
		});
		return this;
	}

	all<R = Array<T>>() {
		this.setState({ isLoading: true });
		return Axios.get<R>(this.url)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error))
			.finally(() => this.setState({ isLoading: false }));
	}

	get(id: number | string) {
		this.setState({ isLoading: true });
		return Axios.get<T>(`${this.url}/${id}`)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error))
			.finally(() => this.setState({ isLoading: false }));
	}

	post<R = T>() {
		this.setState({ isLoading: true });
		return Axios.post<R>(this.url, this.form)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error))
			.finally(() => this.setState({ isLoading: false }));
	}

	put<R = T>() {
		this.setState({ isLoading: true });
		this.form.append('_method', 'PUT');
		return Axios.post<R>(`${this.url}/${this.model.id}`, this.form)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error))
			.finally(() => this.setState({ isLoading: false }));
	}

	patch<R = T>() {
		this.setState({ isLoading: true });
		this.form.append('_method', 'PATCH');
		return Axios.post<R>(`${this.url}/${this.model.id}`, this.form)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error))
			.finally(() => this.setState({ isLoading: false }));
	}

	delete() {
		this.setState({ isLoading: true });
		return Axios.delete(`${this.url}/${this.model.id}`)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error))
			.finally(() => this.setState({ isLoading: false }));
	}
}
