import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { getSeatStatus } from '../../api/movieService';
import MovieInfo from '../../components/Movie/Ticket/MovieInfo';
import SeatSelection from '../../components/Movie/Ticket/SeatSelection';
import TicketSummary from '../../components/Movie/Ticket/TicketSummary';
import PaymentMethod from '../../components/Movie/Ticket/PaymentMethod';
import { fakeDataManager } from '../../utils/fakeDataManager';

const SEAT_PRICES = {
  NORMAL: 90000,
  VIP: 120000,
  COUPLE: 200000,
};

function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketData = location.state;
  const seatSelectionRef = useRef(null);
  
  // Các state cần thiết
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatStatus, setSeatStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Kiểm tra ticketData ngay từ đầu
  if (!ticketData) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    let mounted = true; // Để kiểm tra xem component còn mounted không
    console.log('ticketData', ticketData);
    const fetchSeatStatus = async () => {
      try {
        setLoading(true);
        const response = await getSeatStatus(ticketData?.showtime?.idshowtime);
        console.log('response ticket', response);
        if (mounted) {
          setSeatStatus(fakeDataManager.getSeatStatus(response.data.bookedSeats));
        }
      } catch (error) {
        console.error('Error fetching seat status:', error);
        if (mounted) {
          setSeatStatus(fakeDataManager.getSeatStatus([])[0].bookedSeats);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (ticketData?.showtime?.idshowtime) {
      fetchSeatStatus();
    }

    return () => {
      mounted = false;
    };
  }, [ticketData?.showtime?.idshowtime]);

  // Xử lý scroll sau khi load
  useEffect(() => {
    if (!loading && seatStatus && seatSelectionRef.current) {
      // Đợi một frame để đảm bảo layout đã được tính toán
      requestAnimationFrame(() => {
        setPageLoaded(true);
        
        const scrollTimeout = setTimeout(() => {
          const yOffset = -80;
          const element = seatSelectionRef.current;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }, 300);

        return () => clearTimeout(scrollTimeout);
      });
    }
  }, [loading, seatStatus]);

  // Tách các handlers ra
  const handleBack = () => {
    navigate(`/movie/${ticketData.movie.title}`, { 
      state: ticketData.movie
    });
  };

  const handleExpired = () => {
    setIsExpired(true);
  };

  const handlePaymentClick = () => {
    setShowPayment(true);
  };

  const handlePaymentSubmit = (paymentMethod) => {
    // Xử lý submit payment method ở đây
    console.log('Selected payment method:', paymentMethod);
    // Có thể chuyển hướng đến trang thanh toán tương ứng
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleBackToSeats = () => {
    setShowPayment(false);
    setSelectedPaymentMethod('');
  };


  // Tách phần UI khi expired ra component riêng
  const renderExpiredContent = () => (
    <Box sx={{
      p: 4,
      bgcolor: 'white',
      borderRadius: 2,
      textAlign: 'center',
      maxWidth: 500,
      mx: 'auto',
      mt: 4
    }}>
      <Typography variant="h6" color="error" gutterBottom>
        Hết thời gian mua vé
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Rất tiếc, phiên giao dịch của bạn đã hết hạn. Bạn có thể bắt đầu lại bằng cách nhấn vào nút bên dưới.
      </Typography>
      <Button
        variant="contained"
        onClick={handleBack}
        sx={{ 
          textTransform: 'none',
          minWidth: 120
        }}
      >
        Trở lại
      </Button>
    </Box>
  );

  return (
    <Box sx={{ 
      bgcolor: '#f5f5f5',
      minHeight: '100vh',
      pt: { xs: 2, md: 3 },
      pb: { xs: 4, md: 6 },
      opacity: pageLoaded ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
    }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: { xs: 2, md: 3 }
        }}>
          <MovieInfo movieData={ticketData.movie} />
          
          {isExpired ? renderExpiredContent() : (
            <Box 
              ref={seatSelectionRef}
              sx={{ 
                display: 'flex', 
                gap: { xs: 2, md: 3 },
                flexDirection: { xs: 'column', md: 'row' },
                scrollMarginTop: '80px',
                transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              <Box sx={{ flex: { xs: '1', md: '0 0 calc(65% - 12px)' } }}>
                {!loading && !showPayment && (
                  <SeatSelection 
                    selectedSeats={selectedSeats}
                    onSeatsChange={setSelectedSeats}
                    seatStatus={seatStatus}
                  />
                )}
                {showPayment && (
                  <PaymentMethod 
                    selectedMethod={selectedPaymentMethod}
                    onMethodChange={handlePaymentMethodChange}
                    shouldScroll={showPayment}
                  />
                )}
              </Box>

              <Box sx={{ flex: { xs: '1', md: '0 0 calc(35% - 12px)' } }}>
                <TicketSummary 
                  selectedSeats={selectedSeats}
                  movieInfo={ticketData.movie}
                  cinemaInfo={ticketData.cinema}
                  hallInfo={ticketData.hall}
                  showtimeInfo={ticketData.showtime}
                  onExpired={handleExpired}
                  onPaymentClick={handlePaymentClick}
                  showPayment={showPayment}
                  selectedPaymentMethod={selectedPaymentMethod}
                  onBackClick={handleBackToSeats}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Ticket;
