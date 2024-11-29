import { useState, useEffect } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { getMoviesNowShowing } from "../../api/movieService";
import { fakeDataManager } from '../../utils/fakeDataManager';

import BannerSlider from "../../components/Home/BannerSlider";
import MovieSelection from "../../components/Home/MovieSelection";
import EventSection from "../../components/Home/EventSection";
import PromotionCard from "../../components/Home/PromotionCard";
import PopcornAnimation from '../../components/Home/PopcornAnimation';

import homeBackground from "../../assets/images/home-background.jpg";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getMoviesNowShowing();
        if (isMounted) {
          setMovies(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        if (isMounted) {
          setError(error);
          setMovies(fakeDataManager.getMovies([]));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box 
      component="main"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        pt: 0,
        pb: { xs: 4, md: 6 }
      }}
    >
      <Container 
        maxWidth={false} 
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, md: 3 },
          backgroundImage: `url(${homeBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maxWidth: '1536px',
          mx: 'auto',
          width: '100%',
          position: 'relative'
        }}
      >
        <BannerSlider />
                
        {!isLoading && movies.length > 0 && (
          <MovieSelection movies={movies} />
        )}
        
        <EventSection />
        <PromotionCard />
      </Container>
      
      <PopcornAnimation />
    </Box>
  );
}
