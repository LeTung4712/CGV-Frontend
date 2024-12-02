import apiClient from './apiClient';

const PREFIX = 'payment';

export const createPaymentMomo = async (data) => {
    try {
        console.log('data momo:', data);
        const response = await apiClient.post(`${PREFIX}/momo`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPaymentVNpay = async (data) => {
    try {
        console.log('data vnpay:', data);
        const response = await apiClient.post(`${PREFIX}/vnpay`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPaymentZalopay = async (data) => {
    try {
        console.log('data zl:', data);
        const response = await apiClient.post(`${PREFIX}/zalopay`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

