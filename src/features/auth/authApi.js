import axiosInstance from '../../api/axiosInstance';

export const register = async (email, password, displayUsername) => {
    const response = await axiosInstance.post('/auth/register', {email, password, displayUsername});
    return response.data;
};

export const login = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {email, password});
    return response.data;
};