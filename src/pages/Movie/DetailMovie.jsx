import { useLocation } from "react-router-dom";
import MovieInfo from "../../components/Movie/DetailMovie/MovieInfo";
import ShowtimeSchedule from "../../components/Movie/DetailMovie/ShowtimeSchedule";
import { useState} from "react";

import PromotionCard from "../../components/Home/PromotionCard";

function DetailMovie() {
  const { state } = useLocation();
  const [movie] = useState(state);

  return (
    <div className="movie-detail-page">
      <MovieInfo movieData={movie} />
      <ShowtimeSchedule movieData={movie} />
      <PromotionCard />
    </div>
  );
}

export default DetailMovie;
