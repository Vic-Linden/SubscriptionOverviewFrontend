import axios from 'axios';

const axiosInstance = axios.create({
    baseUrl: 'http://localhost:5044/api'
});

export default axiosInstance;