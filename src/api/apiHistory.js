import apiClient from './apiClient';

const PREFIX = '';

// API lấy lịch sử đặt vé
export const getBookingHistory = async (customerId) => {
  try {
    const response = await apiClient.get(`${PREFIX}/tickets/customer/${customerId}`);

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    if (error.response) {
      console.error("Lỗi server:", error.response.data);
      throw new Error(error.response.data.message || "Không thể tải lịch sử đặt vé");
    } else if (error.request) {
      console.error("Không nhận được phản hồi từ server", error.request);
      throw new Error("Không nhận được phản hồi từ server");
    } else {
      console.error("Lỗi:", error.message);
      throw new Error("Đã xảy ra lỗi, vui lòng thử lại");
    }
  }
};
