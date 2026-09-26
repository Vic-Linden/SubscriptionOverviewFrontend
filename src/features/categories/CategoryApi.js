import axiosInstance from "../../api/axiosInstance";

export const getCategories = async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
};

export const getCategoryById = async (id) => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
};

export const createCategory = async (name) => {
    const response = await axiosInstance.post('/categories', {name});
    return response.data;
};

export const updateCategory = async (id, name) => {
    const response = await axiosInstance.put(`/categories/${id}`, {name});
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
};