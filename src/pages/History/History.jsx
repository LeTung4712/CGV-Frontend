import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getBookingHistory } from "../../api/apiHistory";



function BookingHistory() {
  const [booking, setBooking] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const user = JSON.parse(localStorage.getItem("data"));



      try {
        console.log("user",user)
        const response = await getBookingHistory(user.id);
        console.log("Dữ liệu từ API:", response);
        if (Array.isArray(response.data)) {
          setBooking(response.data);
        } else {
          console.warn("Dữ liệu trả về không phải mảng:", response);
        }
        console.log("booking",booking)
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

  if (booking.length === 0) {
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
        Chi Tiết Lịch Sử Đặt Vé
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
              <TableCell><b>Ngày đặt vé</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.showtime_id?.movie_id?.title || "N/A"}</TableCell>
                <TableCell>{item.showtime_id?.hall_id?.cinema_id?.name || "N/A"}</TableCell>
                <TableCell>
                  {item.seat_ids
                    ? item.seat_ids.map((seat) => seat.seatNumber).join(", ")
                    : "N/A"}
                </TableCell>
                <TableCell>{(item.price || 0).toLocaleString("vi-VN")} đ</TableCell>
                <TableCell>
                  {item.showtime_id?.start_time
                    ? `${new Date(item.showtime_id.start_time).toLocaleString(
                        "vi-VN"
                      )} - ${new Date(item.showtime_id.end_time).toLocaleString("vi-VN")}`
                    : "N/A"}
                </TableCell>
                <TableCell>{new Date(item.booking_date).toLocaleString("vi-VN")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default BookingHistory;
