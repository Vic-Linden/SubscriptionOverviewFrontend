import axiosInstance from "../../api/axiosInstance";

export const getCategories = async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
};

export const createCategory = async (name) => {
    const response = await axiosInstance.post('/categories', {name});
    return response.data;
};