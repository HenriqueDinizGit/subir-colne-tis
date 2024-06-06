import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        token: localStorage.getItem('token'),
    },
});

export default instance;
