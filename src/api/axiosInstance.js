import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5044/api'
});

export default axiosInstance;