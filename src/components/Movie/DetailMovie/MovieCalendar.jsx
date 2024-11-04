import React from 'react';
import PropTypes from 'prop-types';
import { 
  Paper, 
  Typography,
  Box,
  alpha
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

// Tùy chỉnh locale cho tiếng Việt
const viLocale = {
  ...dayjs.Ls.vi,
  weekdays: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  weekdaysShort: ['CN', '2', '3', '4', '5', '6', '7'],
  weekdaysMin: ['CN', '2', '3', '4', '5', '6', '7'],
};
dayjs.locale('vi', viLocale);

const styles = {
  paper: {
    height: 'fit-content',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: 'grey.300',
    '& .MuiDateCalendar-root': {
      maxWidth: '100%',
      width: '100%',
      backgroundColor: 'grey.300'
    }
  },
  headerBox: {
    p: 2, 
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: alpha('#fff', 0.7)
  },
  headerText: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'text.primary'
  },
  calendar: {
    width: '100%',
    '& .MuiPickersDay-root': {
      fontSize: '0.875rem',
      width: 36,
      height: 36,
      backgroundColor: 'background.paper',
      '&:hover': {
        backgroundColor: alpha('#fff', 0.9)
      }
    },
    '& .MuiPickersDay-root.Mui-selected': {
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
      '&:hover': {
        backgroundColor: 'primary.dark'
      }
    },
    '& .MuiDayCalendar-weekDayLabel': {
      fontSize: '0.875rem',
      color: 'text.secondary',
      fontWeight: 600,
      width: 36
    },
    '& .MuiPickersCalendarHeader-label': {
      fontSize: '1rem',
      fontWeight: 500,
      color: 'text.primary'
    },
    '& .MuiPickersArrowSwitcher-button': {
      color: 'text.secondary',
      '&:hover': {
        backgroundColor: alpha('#fff', 0.1)
      }
    }
  }
};

function MovieCalendar({ selectedDate, onDateSelect }) {
  return (
    <Paper elevation={3} sx={styles.paper}>
      <Box sx={styles.headerBox}>
        <Typography variant="h6" sx={styles.headerText}>
          Chọn ngày
        </Typography>
      </Box>
      
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        <DateCalendar
          value={selectedDate}
          onChange={onDateSelect}
          sx={styles.calendar}
        />
      </LocalizationProvider>
    </Paper>
  );
}

MovieCalendar.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  onDateSelect: PropTypes.func.isRequired,
};

export default MovieCalendar; 