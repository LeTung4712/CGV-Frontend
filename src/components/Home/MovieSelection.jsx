import { Box, Typography, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import MovieCard from "../MovieCard/MovieCard";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function MovieSelection({ movies }) {
  if (!movies || !movies.length) return null;

  return (
    <Box 
      component="section" 
      sx={{ 
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'primary.main',
            backgroundColor: 'white',
            borderRadius: 2,
            border: 2,
            borderColor: 'primary.main',
            py: 1,
            px: 3,
            width: 'fit-content',
            mx: 'auto',
            fontSize: { xs: '1.5rem', md: '2rem' },
            textTransform: 'uppercase',
          }}
        >
          Phim Đang Chiếu
        </Typography>

        <Box sx={{ 
          position: 'relative',
          '& .swiper-wrapper': {
            pb: 3,
          }
        }}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={5}
            navigation
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 15
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 20
              }
            }}
            sx={{
              '& .swiper-button-next, & .swiper-button-prev': {
                color: 'white',
                '&:hover': {
                  color: 'primary.main',
                },
                '&::after': {
                  fontSize: { xs: '20px', md: '24px' }
                },
                display: { xs: 'none', md: 'flex' }
              },
              '& .swiper-pagination': {
                bottom: 0,
                position: 'relative',
                marginTop: 2,
                display: { xs: 'none', md: 'block' }
              },
              '& .swiper-pagination-bullet': {
                bgcolor: 'white',
                width: '8px',
                height: '8px',
                margin: '0 8px',
                opacity: 0.5,
                transition: 'all 0.3s',
                '&-active': {
                  opacity: 1,
                  transform: 'scale(1.2)',
                  bgcolor: 'primary.main'
                }
              },
              px: { xs: 2, md: 4 }
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.idmovie}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
}