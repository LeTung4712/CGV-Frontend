import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Chip,
  styled,
  Divider,
  alpha,
  Button
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import TheatersIcon from '@mui/icons-material/Theaters';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LanguageIcon from '@mui/icons-material/Language';

const MoviePoster = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  }
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: '1.2rem'
  },
  '& .MuiTypography-root': {
    color: theme.palette.text.primary
  },
  '& strong': {
    marginRight: theme.spacing(0.5)
  }
}));

const MovieDetail = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.8,
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  }
}));

const BlurredBackground = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url(${props => props.bgimage}) center/cover no-repeat`,
    filter: 'blur(50px)',
    opacity: 0.3,
    zIndex: -1,
  }
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  width: '100%',
}));

const BookingButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: '30px',
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  }
}));

function MovieInfo({ movieData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const videoUrl = movieData.trailer?.replace("watch?v=", "embed/");

  const scrollToShowtimes = () => {
    const showtimesElement = document.getElementById('showtimes-section');
    if (showtimesElement) {
      showtimesElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <BlurredBackground bgimage={movieData.image}>
      <Box sx={{ 
        py: { xs: '24px 2px', md: '48px 2px' },
        px: 0,
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        width: '100%',
      }}>
        <GlassPaper elevation={0} sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          pb: '2px',
          borderRadius: 0,
          height: '100%',
          width: '100%',
        }}>
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Phần poster */}
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                maxWidth: { xs: '100%', sm: '500px', md: '100%' },
                mx: 'auto',
                px: { xs: 1, md: 2 }
              }}>
                <MoviePoster 
                  src={movieData.image_url} 
                  alt={movieData.name}
                  loading="lazy"
                />
              </Box>
            </Grid>

            {/* Phần thông tin chi tiết */}
            <Grid item xs={12} md={8}>
              <Box sx={{ px: { xs: 1, md: 2 } }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 700,
                    color: 'primary.main',
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  {movieData.name}
                </Typography>

                <Box sx={{ position: 'relative' }}>
                  <MovieDetail 
                    sx={{ 
                      mb: 3,
                      maxHeight: { 
                        xs: isExpanded ? 'none' : '100px',
                        md: 'none' 
                      },
                      overflow: { 
                        xs: 'hidden',
                        md: 'visible' 
                      },
                      position: 'relative'
                    }}
                  >
                    {movieData.description}
                  </MovieDetail>

                  <Box
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      textAlign: 'center',
                      mt: 1,
                      mb: 2,
                      // Gradient overlay khi chưa expand
                      ...((!isExpanded) && {
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          bottom: '100%',
                          left: 0,
                          right: 0,
                          height: '50px',
                          background: 'linear-gradient(transparent, rgba(255,255,255,0.8))'
                        }
                      })
                    }}
                  >
                    <Button
                      onClick={() => setIsExpanded(!isExpanded)}
                      sx={{
                        color: 'primary.main',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.04)'
                        }
                      }}
                    >
                      {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                  </Box>
                </Box>

                <Divider sx={{ my: 3, opacity: 0.6 }} />

                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1.5, 
                  mb: 3 
                }}>
                  <Chip 
                    icon={<StarIcon />} 
                    label={`Phân loại: ${movieData.rated}`} 
                    color="primary" 
                    variant="outlined"
                    sx={{ borderWidth: 2 }}
                  />
                  <Chip 
                    icon={<AccessTimeIcon />} 
                    label={`${movieData.duration} phút`}
                    variant="outlined"
                    sx={{ borderWidth: 2 }}
                  />
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <InfoItem>
                      <CalendarMonthIcon />
                      <Typography>
                        <strong>Khởi chiếu:</strong> {movieData.release_date}
                      </Typography>
                    </InfoItem>

                    <InfoItem>
                      <CategoryIcon />
                      <Typography>
                        <strong>Thể loại:</strong> {movieData.genre}
                      </Typography>
                    </InfoItem>

                    <InfoItem>
                      <PersonIcon />
                      <Typography>
                        <strong>Đạo diễn:</strong> {movieData.director}
                      </Typography>
                    </InfoItem>

                    <InfoItem>
                      <TheatersIcon />
                      <Typography>
                        <strong>Diễn viên:</strong> {movieData.actor}
                      </Typography>
                    </InfoItem>

                    <InfoItem>
                      <LanguageIcon />
                      <Typography>
                        <strong>Ngôn ngữ:</strong> {movieData.language}
                      </Typography>
                    </InfoItem>
                  </Grid>

                  
                    
                 
                </Grid>

                <Box sx={{ 
                  mt: 4,
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <BookingButton
                    variant="contained"
                    startIcon={<LocalActivityIcon />}
                    onClick={scrollToShowtimes}
                  >
                    Mua vé ngay
                  </BookingButton>
                </Box>
              </Box>
            </Grid>

            {/* Phần trailer */}
            {movieData.trailer && (
              <Grid item xs={12}>
                <GlassPaper 
                  elevation={0} 
                  sx={{ 
                    mt: 4,
                    p: { xs: 2, md: 3 },
                    borderRadius: 3
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      fontWeight: 600,
                      color: 'primary.main'
                    }}
                  >
                    Trailer
                  </Typography>
                  <Box sx={{ 
                    position: 'relative',
                    paddingTop: '56.25%',
                    borderRadius: 2,
                    overflow: 'hidden',
                    '& iframe': {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }
                  }}>
                    <iframe
                      src={videoUrl}
                      allowFullScreen
                      title={movieData.name}
                      frameBorder="0"
                    />
                  </Box>
                </GlassPaper>
              </Grid>
            )}
          </Grid>
        </GlassPaper>
      </Box>
    </BlurredBackground>
  );
}

export default MovieInfo;