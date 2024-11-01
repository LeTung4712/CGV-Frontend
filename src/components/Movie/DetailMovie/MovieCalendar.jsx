import React from 'react';
import { 
  Paper, 
  Typography,
  Box 
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

function MovieCalendar({ selectedDate, onDateSelect }) {
  return (
    <Paper 
      elevation={3}
      sx={{ 
        height: 'fit-content',
        '& .MuiDateCalendar-root': {
          maxWidth: '100%',
          width: '100%'
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="h6" sx={{ 
          fontSize: '1.1rem',
          fontWeight: 600 
        }}>
          Chọn ngày
        </Typography>
      </Box>
      
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        <DateCalendar
          value={selectedDate}
          onChange={onDateSelect}
          minDate={dayjs()}
          maxDate={dayjs().add(7, 'day')}
          sx={{
            width: '100%',
            '& .MuiPickersDay-root': {
              fontSize: '0.875rem',
              width: 36,
              height: 36,
            },
            '& .MuiPickersDay-root.Mui-selected': {
              backgroundColor: 'primary.main',
            },
            '& .MuiDayCalendar-weekDayLabel': {
              fontSize: '0.875rem',
            },
            '& .MuiPickersCalendarHeader-label': {
              fontSize: '1rem',
            }
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
}

export default MovieCalendar; 