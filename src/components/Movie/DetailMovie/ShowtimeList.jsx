import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress, 
  Alert, 
  Chip, 
  Divider,
  styled 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventSeatIcon from '@mui/icons-material/EventSeat';

const ShowtimeButton = styled(Button)(({ theme, almostfull, soldout }) => ({
  margin: theme.spacing(0.5),
  minWidth: '85px',
  padding: '8px 16px',
  backgroundColor: soldout ? '#f5f5f5' : 'white',
  color: soldout ? '#999' : theme.palette.text.primary,
  border: `1px solid ${soldout ? '#ddd' : theme.palette.primary.main}`,
  '&:hover': {
    backgroundColor: soldout ? '#f5f5f5' : theme.palette.primary.main,
    color: soldout ? '#999' : 'white',
  },
  '& .seats-info': {
    fontSize: '11px',
    color: almostfull ? '#ff9800' : (soldout ? '#999' : '#666'),
  },
}));

function ShowtimeList({ 
  loading, 
  error, 
  showtimes, 
  selectedDate, 
  onTimeSelect 
}) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!showtimes || showtimes.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          Không có suất chiếu cho ngày {selectedDate.format('DD/MM/YYYY')}. Vui lòng chọn ngày khác.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%',
      '& .MuiPaper-root': {
        height: 'fit-content'
      }
    }}>
      {showtimes.map((type) => (
        <Paper key={type.id} sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              {type.name}
            </Typography>
            <Chip 
              label={`${type.price.toLocaleString('vi-VN')}đ`}
              color="primary"
              variant="outlined"
            />
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          {type.cinemas.map((cinema) => (
            <Box key={cinema.id} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {cinema.name}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ mb: 1.5, display: 'flex', alignItems: 'center', color: 'text.secondary' }}
              >
                <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                {cinema.address}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {cinema.showtimes.map((showtime) => (
                  <ShowtimeButton
                    key={showtime.id}
                    variant="outlined"
                    onClick={() => onTimeSelect(type, cinema, showtime)}
                    disabled={showtime.isSoldOut}
                    almostfull={showtime.isAlmostFull ? 1 : 0}
                    soldout={showtime.isSoldOut ? 1 : 0}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body1">{showtime.time}</Typography>
                      <Typography className="seats-info">
                        <EventSeatIcon sx={{ fontSize: 12, mr: 0.5 }} />
                        {showtime.isSoldOut 
                          ? 'Hết vé' 
                          : showtime.isAlmostFull 
                            ? 'Sắp hết' 
                            : `${showtime.seatsAvailable} ghế`}
                      </Typography>
                    </Box>
                  </ShowtimeButton>
                ))}
              </Box>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
}

export default ShowtimeList; 