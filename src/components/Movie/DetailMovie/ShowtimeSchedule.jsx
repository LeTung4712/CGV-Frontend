import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { getMovieShowtimes } from '../../../api/movieService';
import MovieCalendar from './MovieCalendar';
import ShowtimeList from './ShowtimeList';
import { useLocation } from '../../../contexts/LocationContext';
import { fakeDataManager } from '../../../utils/fakeDataManager';

function ShowtimeSchedule({ movieData }) {
  const { location } = useLocation();
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
      
      const response = await getMovieShowtimes(
        movieData.idmovie, 
        location,
        formattedDate
      );
      
      if (!response || !response.data.cinemas) {
        setShowtimes(fakeDataManager.getShowtimes([]));
        return;
      }
      console.log("response", response.data.cinemas);
      const formattedShowtimes = response.data.cinemas.map((cinema) => ({
        idcinema: cinema.idcinema,
        name: cinema.name,
        address: cinema.address,
        halls: cinema.halls.map(hall => ({
          idhall: hall.idhall,
          name: hall.name,
          showtimes: hall.showtimes.filter(showtime => {
            if (date.isSame(now, 'day')) {
              return showtime.start_time > currentTime;
            }
            return true;
          }).map(showtime => ({
            idshowtime: showtime.idshowtime,
            start_time: dayjs(showtime.start_time).format('HH:mm'),
            end_time: dayjs(showtime.end_time).format('HH:mm'),
            seatsAvailable: showtime.seatsAvailable,
            isAlmostFull: showtime.isAlmostFull,
            isSoldOut: showtime.isSoldOut
          }))
        })).filter(hall => hall.showtimes.length > 0)
      })).filter(cinema => cinema.halls.length > 0);

      setShowtimes(formattedShowtimes);
    } catch (err) {
      console.error("Error fetching showtimes:", err);
      setShowtimes(fakeDataManager.getShowtimes([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowtimes(selectedDate);
  }, [selectedDate, movieData.idmovie, location]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (cinema, hall, showtime) => {
    if (showtime.isSoldOut) return;
    
    navigate('/ticket', {
      state: {
        movie: movieData,
        cinema: {
          idcinema: cinema.idcinema,
          name: cinema.name,
          address: cinema.address
        },
        hall: {
          idhall: hall.idhall,
          name: hall.name
        },
        showtime: {
          idshowtime: showtime.idshowtime,
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
        borderRadius: 0,
        boxShadow: 1,
        mt: 3,
        mb: 3,
        width: '100%',
        margin: '0 auto',
        mx: 0,
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