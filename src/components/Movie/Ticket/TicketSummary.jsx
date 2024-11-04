import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Divider, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';

const SEAT_PRICES = {
  NORMAL: 90000,
  VIP: 120000,
  COUPLE: 200000
};

const SEAT_TYPES = {
  NORMAL: 'thường',
  VIP: 'VIP',
  COUPLE: 'Sweetbox'
};

// Thêm component Timer
const Timer = ({ onExpired }) => {
  const [timeLeft, setTimeLeft] = useState(6 * 60); // 6 phút

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExpired]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      fontSize: '1.1rem'
    }}>
      <TimerIcon color="action" sx={{ fontSize: '1.3rem' }} />
      <Typography variant="body1" sx={{ fontSize: 'inherit' }}>
        Còn lại{' '}
        <Box component="span" sx={{ 
          color: 'error.main',
          fontWeight: 'bold' 
        }}>
          {minutes} phút, {seconds < 10 ? `0${seconds}` : seconds} giây
        </Box>
      </Typography>
    </Box>
  );
};

function TicketSummary({ 
  selectedSeats, 
  cinemaInfo, 
  hallInfo, 
  showtimeInfo,
  onExpired
}) {
  const navigate = useNavigate();

  // Nhóm ghế theo loại
  const groupedSeats = selectedSeats.reduce((acc, seat) => {
    if (!acc[seat.type]) {
      acc[seat.type] = [];
    }
    acc[seat.type].push(seat);
    return acc;
  }, {});

  // Tính tổng tiền
  const totalAmount = selectedSeats.reduce((sum, seat) => {
    return sum + SEAT_PRICES[seat.type];
  }, 0);

  // Hàm format số ghế đôi
  const formatCoupleSeatNumber = (seatNumber) => {
    const row = seatNumber.charAt(0);
    const number = parseInt(seatNumber.slice(1));
    return `${row}${number}-${number + 1}`;
  };

  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 24
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Thông tin đặt vé
        </Typography>
      </Box>

      <Stack spacing={1.5} sx={{ flex: 1 }}>
        <Box>
          <Typography variant="body2">Rạp: {cinemaInfo?.name}</Typography>
          <Typography variant="body2">Phòng chiếu: {hallInfo?.name}</Typography>
          <Typography variant="body2">
            Suất chiếu: {showtimeInfo?.time} - {showtimeInfo?.date}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ flex: 1 }}>
          {selectedSeats.length === 0 ? (
            <Typography color="error" variant="body2">
              Bạn chưa chọn ghế. Vui lòng chọn ghế.
            </Typography>
          ) : (
            <>
              {Object.entries(groupedSeats).map(([type, seats]) => (
                <Box key={type} sx={{ py: 0.5 }}>
                  <Typography variant="body2">
                    Ghế {SEAT_TYPES[type]}: 
                    {seats.map(seat => 
                      type === 'COUPLE' 
                        ? ` ${formatCoupleSeatNumber(seat.number)}`
                        : ` ${seat.number}`
                    ).join(', ')}
                  </Typography>
                  <Typography variant="body2">
                    {seats.length} x {SEAT_PRICES[type].toLocaleString()}đ = {
                      (seats.length * SEAT_PRICES[type]).toLocaleString()
                    }đ
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </Box>

        {selectedSeats.length > 0 && (
          <>
            <Divider />
            <Box>
              <Typography variant="h6" sx={{ 
                color: 'primary.main',
                fontWeight: 'bold',
                mb: 1
              }}>
                Tổng tiền: {totalAmount.toLocaleString()}đ
              </Typography>

              <Button 
                variant="contained" 
                fullWidth
                onClick={() => navigate('/payment')}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 1
                }}
              >
                Thanh toán
              </Button>
            </Box>
          </>
        )}

        <Divider />
        <Timer onExpired={onExpired} />
      </Stack>
    </Box>
  );
}

export default TicketSummary; 