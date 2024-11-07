import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function PopcornAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 20, md: 30 },
        right: { xs: 20, md: 30 },
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <IconButton
        onClick={() => setIsVisible(false)}
        sx={{
          padding: '4px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          mb: 0.5,
          width: '24px',
          height: '24px',
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <Box
        component="img"
        src="https://newtwb.s3.amazonaws.com/images/develcgv/V3_Popcorn-min.gif"
        alt="Popcorn Animation"
        sx={{
          width: { xs: '80px', md: '120px' },
          height: 'auto',
          filter: 'drop-shadow(0px 0px 8px rgba(0,0,0,0.2))',
        }}
      />
    </Box>
  );
} 