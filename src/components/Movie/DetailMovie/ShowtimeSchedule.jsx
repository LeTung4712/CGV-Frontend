import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { getMovieShowtimes } from '../../../api/movieService';
import MovieCalendar from './MovieCalendar';
import ShowtimeList from './ShowtimeList';

function ShowtimeSchedule({ movieData }) {
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(now);
  const [currentTime] = useState(now.format('HH:mm'));
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchShowtimes = async (date) => {
    try {
      setLoading(true);
      setError(null);
      const formattedDate = date.format('YYYY-MM-DD');

      // delay 2s
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await getMovieShowtimes(movieData.idmovies, formattedDate);
      
      const formattedShowtimes = response[0].cinemas.map(cinema => ({
        idcinemas: cinema.idcinemas,
        name: cinema.name,
        address: cinema.address,
        hall: cinema.halls.map(hall => ({
          idhalls: hall.idhalls,
          name: hall.name,
          showtimes: hall.showtimes.filter(showtime => {
            if (date.isSame(now, 'day')) {
              return showtime.start_time > currentTime;
            }
            return true;
          }).map(showtime => ({
            idshowtimes: showtime.idshowtimes,
            start_time: showtime.start_time,
            end_time: showtime.end_time,
            seatsAvailable: showtime.seatsAvailable,
            isAlmostFull: showtime.isAlmostFull,
            isSoldOut: showtime.isSoldOut
          }))
        })).filter(hall => hall.showtimes.length > 0)
      })).filter(cinema => cinema.hall.length > 0);

      console.log('day la formattedShowtimes',formattedShowtimes);
      setShowtimes(formattedShowtimes);
    } catch (err) {
      setError('Không có suất chiếu nào. Vui lòng chọn ngày khác.');
      setShowtimes([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowtimes(selectedDate);
  }, [selectedDate, movieData.idmovies]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setLoading(true);
  };

  const handleTimeSelect = (cinema, hall, showtime) => {
    if (showtime.isSoldOut) return;
    
    navigate('/ticket', {
      state: {
        movie: movieData,
        cinema: {
          id: cinema.idcinemas,
          name: cinema.name,
          address: cinema.address
        },
        hall: {
          id: hall.idhalls,
          name: hall.name
        },
        showtime: {
          id: showtime.idshowtimes,
          time: showtime.start_time,
          date: selectedDate.format('YYYY-MM-DD')
        }
      }
    });
  };

  return (
    <Box 
      id="showtimes-section"
      sx={{ 
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 1,
        mt: 3,
        mb: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        Lịch Chiếu
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          gap: 3,
          p: 3,
          scrollMarginTop: '80px',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          '& > :first-of-type': { 
            flex: { xs: '1 1 auto', md: '0 0 70%' }
          },
          '& > :last-child': { 
            flex: { xs: '1 1 auto', md: '0 0 28%' }
          }
        }}
      >
        <ShowtimeList
          loading={loading}
          error={error}
          showtimes={showtimes}
          selectedDate={selectedDate}
          onTimeSelect={handleTimeSelect}
        />
        <MovieCalendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      </Box>
    </Box>
  );
}

export default ShowtimeSchedule;