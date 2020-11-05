import Axios from 'axios';

import { Model } from '../contracts/index';

export type FS = { [key: string]: any };

export abstract class BaseService<T extends Model, FS> {
	protected url = '';
	protected model: T;
	protected form: FS;
	isLoading = false;
	protected setState: any;

	constructor(setState: any, model?: T) {
		this.model = model || ({} as T);
		this.form = {} as FS;
		this.setState = setState;
	}

	getModel() {
		return this.model;
	}

	setModel(model: T) {
		this.model = model;
		return this;
	}

	setForm(values: FS) {
		Object.entries(values).forEach(([key, value]) => {
			(this.form as any)[key] = value;
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

	get() {
		this.setState({ isLoading: true });
		return Axios.get<T>(`${this.url}/${this.model.id}`)
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
		return Axios.put<R>(`${this.url}/${this.model.id}`, this.form)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error))
			.finally(() => this.setState({ isLoading: false }));
	}

	patch<R = T>() {
		this.setState({ isLoading: true });
		return Axios.patch<R>(`${this.url}/${this.model.id}`, this.form)
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
