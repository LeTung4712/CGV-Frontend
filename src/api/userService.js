import apiClient from './apiClient';

const PREFIX = '';

// API đăng nhập
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post(`${PREFIX}/login`, {
      email,
      password,
    });

    return response.data; 
  } catch (error) {
    if (error.response) {
      console.error("Lỗi server:", error.response.data);
      throw new Error(error.response.data.message || "Đăng nhập thất bại");
    } else if (error.request) {
      console.error("Không nhận được phản hồi từ server", error.request);
      throw new Error("Không nhận được phản hồi từ server");
    } else {
      console.error("Lỗi:", error.message);
      throw new Error("Đã xảy ra lỗi, vui lòng thử lại");
    }
  }
};

//API đăng kí
export const registerUser = async (userData) => {
    try {
      const response = await apiClient.post(`${PREFIX}/register`, userData);
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      throw new Error(error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký");
    }
  };
