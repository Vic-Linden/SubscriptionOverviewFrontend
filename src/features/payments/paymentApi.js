import axiosInstance from '../../api/axiosInstance';

export const getPayments = async () => {
    const response = await axiosInstance.get('/payments');
    return response.data;
};

export const getPaymentById = async (id) => {
    const response = await axiosInstance.get(`/payments/${id}`);
    return response.data;
};

export const createPayment = async (subscriptionId, paidAt, amount) => {
    const response = await axiosInstance.post('/payments', {subscriptionId, paidAt, amount});
    return response.data;
};

export const updatePayment = async (id, paidAt, amount) => {
    const response = await axiosInstance.put(`/payments/${id}`, {paidAt, amount});
    return response.data;
};

export const deletePayment = async (id) => {
    const response = await axiosInstance.delete(`/payments/${id}`);
    return response.data;
};