import axiosInstance from '../../api/axiosInstance';

export const getAllUsers = async () => {
  const response = await axiosInstance.get('/admin/users');
  return response.data;
};