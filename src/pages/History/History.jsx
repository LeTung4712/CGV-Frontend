import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from "@mui/material";
import { getBookingHistory } from "../../api/apiHistory";

function decodeJWT(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
        setLoading(false);
        return;
      }

      try {
        const decodedToken = decodeJWT(token);
        console.log("Decoded Token:", decodedToken);
        const customerId = decodedToken.id?.trim();

        console.log("Customer ID gửi lên API:", customerId);

        if (!customerId) {
          throw new Error("Token không hợp lệ. Không tìm thấy ID khách hàng.");
        }

        // Gọi API lấy lịch sử đặt vé
        const response = await getBookingHistory(customerId);

        
        console.log("Dữ liệu từ API:", response);
        setBookings(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Error fetching booking history:", err.message || err);
        setError("Không thể tải lịch sử đặt vé. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Đang tải lịch sử đặt vé...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: "50px" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (bookings.length === 0) {
    return (
      <Container sx={{ marginTop: "50px" }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Không có lịch sử đặt vé.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Lịch Sử Đặt Vé
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Phim</b></TableCell>
              <TableCell><b>Rạp</b></TableCell>
              <TableCell><b>Ghế</b></TableCell>
              <TableCell><b>Giá</b></TableCell>
              <TableCell><b>Thời gian chiếu</b></TableCell>
              <TableCell><b>Trạng thái</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow key={index}>
                <TableCell>{booking.movie_title || "N/A"}</TableCell>
                <TableCell>{booking.cinema_name || "N/A"}</TableCell>
                <TableCell>{booking.seat_number || "N/A"}</TableCell>
                <TableCell>{(booking.price || 0).toLocaleString("vi-VN")} đ</TableCell>
                <TableCell>
                  {booking.start_time
                    ? `${new Date(booking.start_time).toLocaleString("vi-VN")} - ${new Date(booking.end_time).toLocaleString("vi-VN")}`
                    : "N/A"}
                </TableCell>
                <TableCell>{booking.ticket_status || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default BookingHistory;
