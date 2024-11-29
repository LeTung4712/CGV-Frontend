import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress, 
  Alert, 
  Divider,
  styled,
  Grid
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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px',
        p: 3 
      }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>
          Đang tải lịch chiếu...
        </Typography>
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
      {showtimes.map((cinema) => (
        <Paper key={cinema.idcinema} sx={{ mb: 3, p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
              {cinema.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}
            >
              <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
              {cinema.address}
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          {cinema.halls.map((hall) => (
            <Box key={hall.idhalls} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5 }}>
                {hall.name}
              </Typography>
              
              <Grid container spacing={1}>
                {hall.showtimes.map((showtime) => (
                  <Grid item xs={6} md={3} key={showtime.idshowtimes}>
                    <ShowtimeButton
                      fullWidth
                      variant="outlined"
                      onClick={() => onTimeSelect(cinema, hall, showtime)}
                      disabled={showtime.isSoldOut}
                      almostfull={showtime.isAlmostFull ? 1 : 0}
                      soldout={showtime.isSoldOut ? 1 : 0}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body1">{showtime.start_time}</Typography>
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
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
}

export default ShowtimeList; 