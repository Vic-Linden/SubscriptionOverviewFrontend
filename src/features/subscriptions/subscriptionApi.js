import axiosInstance from "../../api/axiosInstance";

export const getSubscriptions = async () => {
    const response = await axiosInstance.get('/subscriptions');
    return response.data;
};

export const getSubscriptionById = async (id) => {
    const response = await axiosInstance.get(`/subscriptions/${id}`);
    return response.data;
};

export const createSubscription = async (name, price, billingInterval, categoryId) => {
    const response = await axiosInstance.post('/subscriptions', {name, price, billingInterval, categoryId});
    return response.data;
};

export const updateSubscription = async (id, name, price, billingInterval, categoryId) => {
    const response = await axiosInstance.put(`/subscriptions/${id}`, {name, price, billingInterval, categoryId});
    return response.data;
};

export const deleteSubscription = async (id) => {
    const response = await axiosInstance.delete(`/subscriptions/${id}`);
    return response.data;
};