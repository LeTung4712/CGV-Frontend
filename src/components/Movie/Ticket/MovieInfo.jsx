import React from 'react';
import { Box, Typography, Grid, Chip, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import TheatersIcon from '@mui/icons-material/Theaters';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function MovieInfo({ movieData }) {
  const navigate = useNavigate();

  if (!movieData) return null;

  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: 'white',
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <Grid container spacing={3}>
        {/* Poster phim */}
        <Grid item xs={12} sm={3}>
          <Box
            component="img"
            src={movieData.image_url}
            alt={movieData.name}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 3
            }}
          />
        </Grid>

        {/* Thông tin phim */}
        <Grid item xs={12} sm={9}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            {movieData.name}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<StarIcon />}
              label={`Phân loại: ${movieData.rated}`} 
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 1 }}
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={`${movieData.duration} phút`}
              variant="outlined"
              sx={{ borderRadius: 1 }}
            />
            
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CategoryIcon color="action" />
              <Typography variant="body2">
                <strong>Thể loại:</strong> {movieData.genre}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon color="action" />
              <Typography variant="body2">
                <strong>Đạo diễn:</strong> {movieData.director}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TheatersIcon color="action" />
              <Typography variant="body2">
                <strong>Diễn viên:</strong> {movieData.actor}
              </Typography>
            </Box>
          </Box>

          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2,
              mb: 2,
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {movieData.description}
          </Typography>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/movie/nowshowing`)}
            sx={{
              mt: 1,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                bgcolor: 'primary.main',
                color: 'white'
              }
            }}
          >
            Chọn phim khác
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MovieInfo; 