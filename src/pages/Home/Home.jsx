import { useState, useEffect } from "react";
import { getMoviesNowShowing } from "../../api/movieService";
import PersonSection from "../../components/Home/PersonSection/PersonSection";
import BannerSlider from "../../components/Home/BannerSlider/BannerSlider";
import MovieSelection from "../../components/Home/MovieSelection/MovieSelection";
import EventSection from "../../components/Home/EventSection/EventSection";
import PromotionCard from "../../components/Home/PromotionCard/PromotionCard";
import "./home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMoviesNowShowing();
        setMovies(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="main-container">
      <div className="main">
        <PersonSection />
        <BannerSlider />
        <MovieSelection movies={movies} />
        <EventSection />
        <PromotionCard />
      </div>
    </div>
  );
}