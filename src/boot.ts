import Axios from 'axios';
import state from './state';

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;
Axios.defaults.headers['Accept'] = 'application/json';

if (state.has('token')) {
	Axios.defaults.headers['Authorization'] = `Bearer ${state.get('token')}`;
}

state.listen('token', (token) => {
	Axios.defaults.headers['Authorization'] = `Bearer ${token}`;
});

Axios.options('/visit').then(console.log).catch(console.error);
