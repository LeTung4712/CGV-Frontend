import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { getSeatStatus } from '../../api/movieService';
import MovieInfo from '../../components/Movie/Ticket/MovieInfo';
import SeatSelection from '../../components/Movie/Ticket/SeatSelection';
import TicketSummary from '../../components/Movie/Ticket/TicketSummary';

const SEAT_PRICES = {
  NORMAL: 90000,
  VIP: 120000,
  COUPLE: 200000,
};

function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatStatus, setSeatStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const ticketData = location.state;
  console.log('ticketData', ticketData);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const fetchSeatStatus = async () => {
      try {
        const response = await getSeatStatus(ticketData?.showtime?.id);
        console.log('seat status', response);
        setSeatStatus(response[0].bookedSeats);
      } catch (error) {
        console.error('Error fetching seat status:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ticketData?.showtime?.id) {
      fetchSeatStatus();
    }
  }, [ticketData?.showtime?.id]);

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      return total + SEAT_PRICES[seat.type];
    }, 0);
  };

  const handleBack = () => {
    navigate(`/movie/${ticketData.movie.title}`, { 
      state:  ticketData.movie  // Truyền lại thông tin phim
    });
  };

  const handleExpired = () => {
    setIsExpired(true);
  };

  if (!ticketData) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box sx={{ 
      bgcolor: '#f5f5f5',
      minHeight: '100vh',
      pt: { xs: 2, md: 3 },
      pb: { xs: 4, md: 6 }
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: { xs: 2, md: 3 }
        }}>
          <MovieInfo movieData={ticketData.movie} />
          
          {isExpired ? (
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
          ) : (
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 2, md: 3 },
              flexDirection: { xs: 'column', md: 'row' }
            }}>
              <Box sx={{ 
                flex: { xs: '1', md: '0 0 calc(70% - 12px)' },
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, md: 3 }
              }}>
                <SeatSelection 
                  selectedSeats={selectedSeats}
                  onSeatsChange={setSelectedSeats}
                  seatStatus={seatStatus}
                  loading={loading}
                />
              </Box>

              <Box sx={{ 
                flex: { xs: '1', md: '0 0 calc(30% - 12px)' }
              }}>
                <TicketSummary 
                  selectedSeats={selectedSeats}
                  totalAmount={calculateTotal()}
                  cinemaInfo={ticketData.cinema}
                  hallInfo={ticketData.hall}
                  showtimeInfo={ticketData.showtime}
                  onExpired={handleExpired}
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
