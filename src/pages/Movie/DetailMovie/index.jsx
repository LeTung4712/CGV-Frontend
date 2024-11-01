import { useLocation } from "react-router-dom";
import MovieInfo from "../../../components/Movie/DetailMovie/MovieInfo";
import ShowtimeSchedule from "../../../components/Movie/DetailMovie/ShowtimeSchedule";
import "./style.css";
import { getDetailMovie } from "../../../api/movieService";
import { useState, useEffect } from "react";

function DetailMovie() {
  const { state } = useLocation();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchMovieData = async () => {
      const res = await getDetailMovie(state.title);
      setMovieData(res);
    };
    fetchMovieData();
  }, []);

  return (
    <div className="movie-detail-page">
      <MovieInfo movieData={state} />
      <ShowtimeSchedule movieData={movieData} />
    </div>
  );
}

export default DetailMovie;
