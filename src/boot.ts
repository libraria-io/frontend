import Axios from 'axios';

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;
Axios.defaults.headers['Accept'] = 'application/json';

Axios.options('/visit').then(console.log).catch(console.error);
