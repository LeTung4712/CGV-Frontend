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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import { getBookingHistory } from "../../api/apiHistory";
import { QRCodeSVG } from "qrcode.react";
import CloseIcon from "@mui/icons-material/Close";

function BookingHistory() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openQR, setOpenQR] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const user = JSON.parse(localStorage.getItem("data"));
      try {
        //console.log("user",user)
        const response = await getBookingHistory(user.id);
        //console.log("Dữ liệu từ API:", response);
        if (Array.isArray(response.data)) {
          setBooking(response.data);
        } else {
          console.warn("Dữ liệu trả về không phải mảng:", response);
        }
        //console.log("booking",booking)
      } catch (err) {
        console.error("Error fetching booking history:", err.message || err);
        setError("Không thể tải lịch sử đặt vé. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  const handleOpenQR = (orderId) => {
    setSelectedOrder(orderId);
    setOpenQR(true);
  };

  const handleCloseQR = () => {
    setOpenQR(false);
    setSelectedOrder(null);
  };

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
    <Container sx={{ mt: 2, mb: 2}}>
      <Typography variant="h4" gutterBottom>
        Chi Tiết Lịch Sử Đặt Vé
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Mã đơn</b></TableCell>
              <TableCell><b>Phim</b></TableCell>
              <TableCell><b>Rạp</b></TableCell>
              <TableCell><b>Ghế</b></TableCell>
              <TableCell><b>Giá</b></TableCell>
              <TableCell><b>Suất chiếu</b></TableCell>
              <TableCell><b>Ngày đặt vé</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Tooltip title={item.payment_id.orderId || "N/A"} arrow>
                    <span
                      onClick={() => handleOpenQR(item.payment_id.orderId)}
                      style={{ cursor: "pointer", color: "#1976d2" }}
                    >
                      {item.payment_id.orderId
                        ? item.payment_id.orderId.length > 12
                          ? `${item.payment_id.orderId.slice(0, 12)}...`
                          : item.payment_id.orderId
                        : "N/A"}
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {item.showtime_id?.movie_id?.title || "N/A"}
                </TableCell>
                <TableCell>
                  {item.showtime_id?.hall_id?.cinema_id?.name || "N/A"}
                </TableCell>
                <TableCell>
                  {item.seat_ids
                    ? item.seat_ids.map((seat) => seat.seatNumber).join(", ")
                    : "N/A"}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {(item.price || 0).toLocaleString("vi-VN")} đ
                </TableCell>
                <TableCell>
                  {item.showtime_id?.hall_id?.name} -{" "}
                  {item.showtime_id?.start_time
                    ? `${new Date(item.showtime_id.start_time).toLocaleString(
                        "vi-VN"
                      )}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {new Date(item.booking_date).toLocaleString("vi-VN")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openQR} onClose={handleCloseQR} maxWidth="xs" fullWidth>
        <DialogTitle>
          Mã QR Đơn Hàng
          <IconButton
            aria-label="close"
            onClick={handleCloseQR}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            {selectedOrder && (
              <>
                <QRCodeSVG
                  value={selectedOrder}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
                <Typography sx={{ mt: 2, textAlign: "center" }}>
                  Mã đơn: {selectedOrder}
                </Typography>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default BookingHistory;
