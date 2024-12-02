import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Divider, Stack, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmDialog from './ConfirmDialog';

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
  movieInfo,
  onExpired,
  showPayment,
  selectedPaymentMethod,
  onPaymentClick,
  onBackClick,
}) {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const paymentButtonRef = useRef(null);

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

  const handlePaymentClick = () => {
    if (!showPayment) {
      onPaymentClick();
      // Thêm timeout nhỏ để đảm bảo component PaymentMethod đã render
      setTimeout(() => {
        const paymentElement = document.getElementById('payment-method-section');
        if (paymentElement) {
          const offset = 100; // Điều chỉnh offset nếu cần
          const elementPosition = paymentElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      setOpenConfirm(true);
    }
  };

  const handleConfirmClose = () => {
    setOpenConfirm(false);
  };

  const handleConfirmPayment = () => {
    setOpenConfirm(false);
    
    // Nhóm ghế theo loại
    const seatsByType = selectedSeats.reduce((acc, seat) => {
      if (!acc[seat.type]) {
        acc[seat.type] = [];
      }
      acc[seat.type].push(seat.number);
      return acc;
    }, {});

    navigate('/payment', { 
      state: {  
        totalAmount, 
        selectedPaymentMethod,
        cinemaInfo, 
        hallInfo, 
        showtimeInfo, 
        movieInfo,
        seatsByType
      } 
    });

  };

  const handleBackToMovie = () => {
    navigate(`/movie/${movieInfo.title}`, { state: movieInfo });
  };

  return (
    <Box sx={{ 
      p: 2.5,
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: { xs: 24, md: 88 },
      transition: 'top 0.3s ease',
      zIndex: 10,
    }}>
      

      <Stack spacing={2}>
        {/* Thông tin phim */}
        <Box>
          <Typography 
            variant="h5" 
            color="primary.main"
            fontWeight="700"
            sx={{ 
              mb: 1.5,
              lineHeight: 1.3,
              fontSize: { xs: '1.5rem', md: '1.7rem' }
            }}
          >
            {movieInfo?.title}
          </Typography>
          <Typography 
            variant="h5" 
            fontWeight="700"
            sx={{ 
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 500,
              mb: 1.5
            }}
          >
            {movieInfo?.language}
          </Typography>

          <Divider />
          <Stack spacing={0.5} sx={{ mt: 1.5 }}>
            <Typography 
              variant="body1"
              color="text.secondary"
              sx={{ 
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 500
              }}
            >
              {cinemaInfo?.name}
            </Typography>
            <Typography 
              variant="body1"
              color="text.secondary"
              sx={{ 
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              {hallInfo?.name} - {showtimeInfo?.date} - Suất chiếu: {showtimeInfo?.time}
            </Typography>
          </Stack>
        </Box>

        <Divider />

        {/* Thông tin ghế */}
        <Box>
          <Typography 
            variant="h6"
            fontWeight="600"
            sx={{ mb: 1 }}
          >
            Ghế đã chọn
          </Typography>
          {selectedSeats.length === 0 ? (
            <Typography 
              color="error.main" 
              sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
            >
              Vui lòng chọn ghế
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {Object.entries(groupedSeats).map(([type, seats]) => (
                <Box key={type}>
                  <Typography 
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      color: 'text.primary',
                      mb: 0.5
                    }}
                  >
                    Ghế {SEAT_TYPES[type]}: 
                    {seats.map(seat => 
                      type === 'COUPLE' 
                        ? ` ${formatCoupleSeatNumber(seat.number)}`
                        : ` ${seat.number}`
                    ).join(', ')}
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      color: 'text.secondary'
                    }}
                  >
                    {seats.length} x {SEAT_PRICES[type].toLocaleString()}đ = {
                      (seats.length * SEAT_PRICES[type]).toLocaleString()
                    }đ
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        {selectedSeats.length > 0 && (
          <>
            <Divider />
            
            {/* Tổng tiền và thanh toán */}
            <Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}>
                <Typography 
                  variant="h6"
                  fontWeight="600"
                >
                  Tổng tiền:
                </Typography>
                <Typography 
                  variant="h5"
                  color="primary.main"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '1.5rem', md: '1.7rem' } }}
                >
                  {totalAmount.toLocaleString()}đ
                </Typography>
              </Box>

              {showPayment && selectedPaymentMethod && (
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      size="medium"
                    />
                  }
                  label={
                    <Typography 
                      sx={{ 
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        color: 'text.secondary',
                        '&:hover': { 
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      Tôi đã đọc và đồng ý với Điều khoản thanh toán
                    </Typography>
                  }
                  sx={{ mb: 2 }}
                />
              )}

              <Stack spacing={1.5}>
                <Button 
                  ref={paymentButtonRef}
                  variant="contained" 
                  fullWidth
                  onClick={handlePaymentClick}
                  disabled={showPayment && (!selectedPaymentMethod || !termsAccepted)}
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 1,
                    py: 1.5,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 600
                  }}
                >
                  {showPayment ? 'Thanh toán' : 'Chọn hình thức thanh toán'}
                </Button>

                <ConfirmDialog
                  open={openConfirm}
                  onClose={handleConfirmClose}
                  onConfirm={handleConfirmPayment}
                  buttonRef={paymentButtonRef}
                />

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={showPayment ? onBackClick : handleBackToMovie}
                    sx={{ 
                      width: 'fit-content',
                      textTransform: 'none',
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: 'transparent',
                        color: 'primary.main'
                      },
                      p: 0,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      mt: 1
                    }}
                  >
                    Trở lại
                  </Button>
                </Box>
              </Stack>
            </Box>
          </>
        )}

        <Divider />
        
        {/* Timer */}
        <Timer onExpired={onExpired} />
      </Stack>
    </Box>
  );
}

export default TicketSummary; 