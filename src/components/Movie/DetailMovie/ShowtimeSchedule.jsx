import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { getMovieShowtimes } from '../../../api/movieService';
import MovieCalendar from './MovieCalendar';
import ShowtimeList from './ShowtimeList';

function ShowtimeSchedule({ movieId }) {
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
      const response = await getMovieShowtimes(movieId, formattedDate);
      
      const filteredShowtimes = response.data.movieTypes.map(type => ({
        ...type,
        cinemas: type.cinemas.map(cinema => ({
          ...cinema,
          showtimes: cinema.showtimes.filter(showtime => {
            if (date.isSame(now, 'day')) {
              return showtime.time > currentTime;
            }
            return true;
          })
        })).filter(cinema => cinema.showtimes.length > 0)
      })).filter(type => type.cinemas.length > 0);

      setShowtimes(filteredShowtimes);
    } catch (err) {
      setError('Không thể tải lịch chiếu. Vui lòng thử lại sau.');
      setShowtimes([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowtimes(selectedDate);
  }, [selectedDate, movieId]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (movieType, cinema, showtime) => {
    if (showtime.isSoldOut) return;
    
    navigate('/booking', {
      state: {
        movieId,
        movieType: {
          id: movieType.id,
          name: movieType.name,
          price: movieType.price
        },
        cinema: {
          id: cinema.id,
          name: cinema.name,
          address: cinema.address
        },
        showtime: {
          id: showtime.id,
          time: showtime.time,
          room: showtime.room,
          date: selectedDate.format('YYYY-MM-DD')
        }
      }
    });
  };

  return (
    <Box 
      id="showtimes-section"
      sx={{ 
        display: 'flex', 
        gap: 3,
        p: 3,
        scrollMarginTop: '80px',
        '& > :first-of-type': { flex: '0 0 70%' },
        '& > :last-child': { 
          flex: '0 0 28%',
          mr: 2
        }
      }}
    >
      <ShowtimeList
        loading={loading}
        error={error}
        showtimes={showtimes}
        selectedDate={selectedDate}
        currentTime={currentTime}
        onTimeSelect={handleTimeSelect}
      />
      <MovieCalendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </Box>
  );
}

export default ShowtimeSchedule;