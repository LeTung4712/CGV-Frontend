import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import VideoDialog from "../VideoDialog/VideoDialog";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./MovieSelection.css";

export default function MovieSelection({ movies }) {
  const [currentTrailer, setCurrentTrailer] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleTrailerClick = (movie, e) => {
    e.stopPropagation();
    const trailerUrl = movie.trailer.replace("watch?v=", "embed/");
    setCurrentTrailer(trailerUrl);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentTrailer("");
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.title}`, { state: movie });
  };

  return (
    <section className="movie-selection">
      <div className="section-header">
        <h2>Phim Đang Chiếu</h2>
      </div>

      <div className="movie-slider">
        <Swiper
          modules={[Navigation, Pagination, Grid]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
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
            }
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="movie-card" onClick={() => handleMovieClick(movie)}>
                <div className="movie-poster">
                  <img src={movie.image} alt={movie.title} />
                  <div className="movie-overlay">
                    <button
                      type="button"
                      className="trailer-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrailerClick(movie, e);
                      }}
                    >
                      <span className="play-icon">►</span>
                    </button>
                    <button 
                      className="booking-btn" 
                      type="button" 
                      onClick={() => handleMovieClick(movie)}
                    >
                      Mua vé ngay <LocalActivityIcon />
                    </button>
                  </div>
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.name}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <VideoDialog
        open={isDialogOpen}
        handleClose={handleDialogClose}
        trailer={currentTrailer}
      />
    </section>
  );
}

