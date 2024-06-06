import axios from 'axios';  

export const base = axios.create({
    baseURL: 'https://subir-colne-tis-backend.onrender.com',
});

export default base;