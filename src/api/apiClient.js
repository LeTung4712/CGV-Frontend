import axios from 'axios';

const apiClient = axios.create({
    baseURL:  import.meta.env.VITE_API_URL, // Sử dụng biến môi trường
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;