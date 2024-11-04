import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { getMoviesNowShowing } from "../../api/movieService";

import BannerSlider from "../../components/Home/BannerSlider";
import MovieSelection from "../../components/Home/MovieSelection";
import EventSection from "../../components/Home/EventSection";
import PromotionCard from "../../components/Home/PromotionCard";

import homeBackground from "../../assets/home-background.jpg";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await getMoviesNowShowing();
        setMovies(res);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (error) {
    return <Box>Error loading movies</Box>;
  }

  return (
    <Box 
      component="main"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        pt: { xs: 2, md: 3 },
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
          width: '100%'
        }}
      >
        <BannerSlider />
        
        {!isLoading && movies.length > 0 && (
          <MovieSelection movies={movies} />
        )}
        
        <EventSection />
        <PromotionCard />
      </Container>
    </Box>
  );
}
