import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://subir-colne-tis-backend.onrender.com/api',
    headers: {
        token: localStorage.getItem('token'),
    },
});

export default instance;
