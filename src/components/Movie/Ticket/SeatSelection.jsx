import React, { useMemo, useState, useEffect } from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery, Snackbar, Alert, LinearProgress } from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import WeekendIcon from '@mui/icons-material/Weekend';
import ChairIcon from '@mui/icons-material/Chair';
import PropTypes from 'prop-types';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const SEATS_PER_ROW = 16;
const MAX_SEATS = 10;

const SEAT_COLORS = {
  BOOKED: '#f44336',
  SELECTED: '#32CD32',
  NORMAL: '#bdbdbd',
  VIP: '#FFC107',
  COUPLE: '#ffb6c1'
};

const SEAT_TYPES = {
  NORMAL: 'NORMAL',
  VIP: 'VIP',
  COUPLE: 'COUPLE'
};

const LEFT_SECTION_SEATS = SEATS_PER_ROW / 2;  // Số ghế section bên trái
const RIGHT_SECTION_SEATS = SEATS_PER_ROW / 2; // Số ghế section bên phải

const SeatLegend = React.memo(({ seatSize }) => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    mb: { xs: 1, sm: 2, md: 3 },
    flexDirection: 'column',
    gap: { xs: 0.5, sm: 1 }
  }}>
    <Grid container spacing={1} sx={{ 
      maxWidth: { xs: '280px', sm: '400px', md: '500px' },
      justifyContent: 'center'
    }}>
      <Grid item xs={3.5}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EventSeatIcon sx={{ color: SEAT_COLORS.NORMAL, mr: 0.5, fontSize: seatSize }} />
          <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>
            Thường
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3.5}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChairIcon sx={{ color: SEAT_COLORS.VIP, mr: 0.5, fontSize: seatSize }} />
          <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>
            VIP
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3.5}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <WeekendIcon sx={{ color: SEAT_COLORS.COUPLE, mr: 0.5, fontSize: seatSize }} />
          <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>
            Sweetbox
          </Typography>
        </Box>
      </Grid>
    </Grid>

    <Grid container spacing={1} sx={{ 
      maxWidth: { xs: '300px', sm: '400px', md: '500px' },
      justifyContent: 'center'
    }}>
      <Grid item xs={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EventSeatIcon sx={{ color: SEAT_COLORS.BOOKED, mr: 0.5, fontSize: seatSize }} />
          <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>
            Ghế đã bán
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EventSeatIcon sx={{ color: SEAT_COLORS.SELECTED, mr: 0.5, fontSize: seatSize }} />
          <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>
            Ghế đã chọn
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
));

function SeatSelection({ selectedSeats, onSeatsChange, seatStatus }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [openAlert, setOpenAlert] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer;
    if (openAlert) {
      setProgress(100);
      const duration = 3000; // 3 giây
      const interval = 50; // Cập nhật mỗi 50ms để animation mượt hơn
      const step = (100 * interval) / duration;

      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - step;
          if (newProgress <= 0) {
            clearInterval(timer);
            setTimeout(() => {
              setOpenAlert(false);
            }, 100);
            return 0;
          }
          return newProgress;
        });
      }, interval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
      setProgress(100);
    };
  }, [openAlert]);

  const handleCloseAlert = () => {
    setProgress(0);
    setTimeout(() => {
      setOpenAlert(false);
    }, 100);
  };

  const getSeatSize = () => {
    if (isMobile) return 18;
    if (isTablet) return 24;
    return 32;
  };

  const getCoupleSeatSize = () => {
    if (isMobile) return 36;
    if (isTablet) return 48;
    return 64;
  };

  const getSeatType = (rowIndex, seatIndex) => {
    if (rowIndex === ROWS.length - 1) return SEAT_TYPES.COUPLE;
    if (rowIndex < 3) return SEAT_TYPES.NORMAL;
    if (seatIndex <= 2 || seatIndex >= SEATS_PER_ROW - 1) return SEAT_TYPES.NORMAL;
    return SEAT_TYPES.VIP;
  };

  const getSeatColor = (isBooked, isSelected, rowIndex, seatIndex) => {
    if (isBooked) return SEAT_COLORS.BOOKED;
    if (isSelected) return SEAT_COLORS.SELECTED;
    return SEAT_COLORS[getSeatType(rowIndex, seatIndex)];
  };

  const handleSeatClick = (seatNumber, rowIndex, seatIndex) => {
    const isLastRow = rowIndex === ROWS.length - 1;
    
    let seat;
    if (isLastRow) {
      const baseIndex = Math.floor((seatIndex - 1) / 2) * 2;
      const coupleSeatNumber = `${ROWS[rowIndex]}${baseIndex}-${baseIndex + 1}`;
      seat = { number: coupleSeatNumber, type: SEAT_TYPES.COUPLE };
    } else {
      seat = { 
        number: seatNumber, 
        type: getSeatType(rowIndex, seatIndex)
      };
    }
    
    const isSelected = selectedSeats.some(s => s.number === seat.number);
    
    if (!isSelected && selectedSeats.length >= MAX_SEATS) {
      setOpenAlert(true);
      return;
    }
    
    const newSelectedSeats = isSelected
      ? selectedSeats.filter(s => s.number !== seat.number)
      : [...selectedSeats, seat];
    
    onSeatsChange(newSelectedSeats);
  };

  const isSeatBooked = (seatNumber, rowIndex, seatIndex) => {
    if (!seatStatus) return false;
    
    if (rowIndex === ROWS.length - 1) {
      const baseIndex = Math.floor((seatIndex - 1) / 2) * 2;
      const coupleSeatNumber = `${ROWS[rowIndex]}${baseIndex}-${baseIndex + 1}`;
      return seatStatus.includes(coupleSeatNumber);
    }
    
    return seatStatus.includes(seatNumber);
  };

  const seatSize = useMemo(() => getSeatSize(), [isMobile, isTablet]);
  const coupleSeatSize = useMemo(() => getCoupleSeatSize(), [isMobile, isTablet]);

  // Hàm kiểm tra ghế đã được chọn
  const isSeatSelected = (seatNumber, rowIndex, seatIndex) => {
    if (rowIndex === ROWS.length - 1) {
      // Với ghế couple, kiểm tra theo format "I0-1"
      const baseIndex = Math.floor((seatIndex - 1) / 2) * 2;
      const coupleSeatNumber = `${ROWS[rowIndex]}${baseIndex}-${baseIndex + 1}`;
      return selectedSeats.some(seat => seat.number === coupleSeatNumber);
    }
    
    return selectedSeats.some(seat => seat.number === seatNumber);
  };

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      width: '100%',
      overflow: 'auto'
    }}>
      <Box sx={{ 
        textAlign: 'center', 
        mb: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2 }
      }}>
        <Typography variant="subtitle1" sx={{ 
          color: 'text.secondary', 
          mb: 1,
          fontWeight: 500,
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}>
          Màn hình
        </Typography>
        <Box sx={{ 
          height: { xs: '3px', sm: '4px' },
          background: 'linear-gradient(to right, transparent 0%, #666 50%, transparent 100%)',
          width: '100%',
          maxWidth: { xs: '280px', sm: '400px', md: '600px' },
          margin: '0 auto'
        }} />
      </Box>

      <SeatLegend seatSize={seatSize} />

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: { xs: 0.25, sm: 0.5, md: 1 },
        mt: { xs: 1, sm: 2 }
      }}>
        {ROWS.map((row, rowIndex) => (
          <Box key={row} sx={{ 
            display: 'flex', 
            gap: { xs: 0.25, sm: 0.5, md: 1 },
            alignItems: 'center',
            minWidth: 'fit-content'
          }}>
            <Typography sx={{ 
              width: { xs: 16, sm: 20, md: 30 },
              textAlign: 'center',
              fontSize: { xs: 11, sm: 12, md: 14 },
              color: 'text.secondary'
            }}>
              {row}
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 0.25, sm: 0.5, md: 1 } }}>
              {Array.from({ length: LEFT_SECTION_SEATS }, (_, i) => {
                const seatNumber = `${row}${i + 1}`;
                const isLastRow = rowIndex === ROWS.length - 1;
                const isEvenSeat = i % 2 === 0;
                
                if (isLastRow && !isEvenSeat) return null;
                
                const isBooked = isSeatBooked(seatNumber, rowIndex, i + 1);
                const isSelected = isSeatSelected(seatNumber, rowIndex, i + 1);
                const seatType = getSeatType(rowIndex, i + 1);
                const seatColor = getSeatColor(isBooked, isSelected, rowIndex, i + 1);
                
                let SeatIcon = EventSeatIcon;
                if (isLastRow) {
                  SeatIcon = WeekendIcon;
                } else if (seatType === SEAT_TYPES.VIP) {
                  SeatIcon = ChairIcon;
                }

                return (
                  <SeatIcon
                    key={seatNumber}
                    sx={{
                      color: seatColor,
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      '&:hover': {
                        '@media (hover: hover)': {
                          color: isBooked ? seatColor : SEAT_COLORS.SELECTED
                        }
                      },
                      WebkitTapHighlightColor: 'transparent',
                      fontSize: isLastRow ? coupleSeatSize : seatSize,
                      ...(seatType === SEAT_TYPES.VIP && {
                        transform: 'scale(1.1)',
                      })
                    }}
                    onClick={() => !isBooked && handleSeatClick(seatNumber, rowIndex, i + 1)}
                  />
                );
              })}
            </Box>
            <Box sx={{ 
              width: { xs: 12, sm: 20, md: 40 },
              borderLeft: '1px dashed rgba(0,0,0,0.1)',
              borderRight: '1px dashed rgba(0,0,0,0.1)',
              height: '100%'
            }} />
            <Box sx={{ display: 'flex', gap: { xs: 0.25, sm: 0.5, md: 1 } }}>
              {Array.from({ length: RIGHT_SECTION_SEATS }, (_, i) => {
                const actualIndex = i + LEFT_SECTION_SEATS + 1;
                const seatNumber = `${row}${actualIndex}`;
                const isLastRow = rowIndex === ROWS.length - 1;
                const isEvenSeat = actualIndex % 2 === 0;
                
                if (isLastRow && !isEvenSeat) return null;
                
                const isBooked = isSeatBooked(seatNumber, rowIndex, actualIndex);
                const isSelected = isSeatSelected(seatNumber, rowIndex, actualIndex);
                const seatType = getSeatType(rowIndex, actualIndex);
                const seatColor = getSeatColor(isBooked, isSelected, rowIndex, actualIndex);
                
                let SeatIcon = EventSeatIcon;
                if (isLastRow) {
                  SeatIcon = WeekendIcon;
                } else if (seatType === SEAT_TYPES.VIP) {
                  SeatIcon = ChairIcon;
                }

                return (
                  <SeatIcon
                    key={seatNumber}
                    sx={{
                      color: seatColor,
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      '&:hover': {
                        '@media (hover: hover)': {
                          color: isBooked ? seatColor : SEAT_COLORS.SELECTED
                        }
                      },
                      WebkitTapHighlightColor: 'transparent',
                      fontSize: isLastRow ? coupleSeatSize : seatSize,
                      ...(seatType === SEAT_TYPES.VIP && {
                        transform: 'scale(1.1)',
                      })
                    }}
                    onClick={() => !isBooked && handleSeatClick(seatNumber, rowIndex, actualIndex)}
                  />
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ 
        overflowX: 'auto',
        width: '100%',
        '&::-webkit-scrollbar': {
          height: '6px'
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.1)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '3px'
        }
      }}>
      </Box>

      <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionProps={{
          onExited: () => setProgress(100)
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Alert 
            onClose={handleCloseAlert}
            severity="warning" 
            sx={{ width: '100%', mb: 0.5 }}
          >
            Bạn chỉ có thể chọn tối đa {MAX_SEATS} ghế
          </Alert>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 2,
              backgroundColor: 'rgba(255, 152, 0, 0.3)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#ff9800',
                transition: 'transform 0.05s linear'
              }
            }} 
          />
        </Box>
      </Snackbar>
    </Box>
  );
}

SeatLegend.propTypes = {
  seatSize: PropTypes.number.isRequired
};

SeatSelection.propTypes = {
  selectedSeats: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(SEAT_TYPES)).isRequired
    })
  ).isRequired,
  onSeatsChange: PropTypes.func.isRequired,
  seatStatus: PropTypes.arrayOf(PropTypes.string)
};

export default SeatSelection;