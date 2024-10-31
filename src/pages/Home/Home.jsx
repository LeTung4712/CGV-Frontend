import { Swiper, SwiperSlide } from "swiper/react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slidesData } from "../../constants/slidesData";
import VideoDialog from "../../components/Home/VideoDialog";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMediaQuery } from "react-responsive";
import "./home.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import api service
import { getMoviesNowShowing, getDetailMovie } from "../../api/movieService";

export default function Home() {
  const isScreen = useMediaQuery({ query: "(max-width: 770px)" });
  const isPhone = useMediaQuery({ query: "(max-width: 600px)" });
  const [movie, setMovie] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(""); // Lưu trữ bộ phim hiện tại cho trailer
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = (movie) => {
    setCurrentMovie(movie.trailer.replace("watch?v=", "embed/")); // Lấy link trailer từ bộ phim
    setOpen(true); // Mở dialog
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chooseMovie = (movie) => {
    return () => {
      navigate(`/movie/${movie.title}`, { state: movie });
    };
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMoviesNowShowing();
        //console.log('movies', res);
        setMovie(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="main-container">
      <div className="main">
        {/* Section person */}
        <div className="sect-person">
          <ul>
            <li>
              <a
                className="threater"
                href="https://www.cgv.vn/default/cinox/site/"
              >
                cgv threater
              </a>
            </li>
            <li>
              <a
                className="now-sh"
                href="https://www.cgv.vn/default/movies/now-showing.html/"
              >
                now showing
              </a>
            </li>
            <li>
              <a
                className="special"
                href="https://www.cgv.vn/default/theaters/special/gold-class"
              >
                cgv special
              </a>
            </li>
            <li>
              <a
                className="event"
                href="https://www.cgv.vn/default/cinemas/sale/"
              >
                mua voucher, thẻ quà tặng CGV
              </a>
            </li>
            <li>
              <a
                className="ticket requied-login"
                href="https://www.cgv.vn/default/contacts/"
              >
                my ticket infor
              </a>
            </li>
            <li>
              <a className="dc" href="https://www.cgv.vn/default/newsoffer/">
                discount infor
              </a>
            </li>
            <li>
              <a
                className="login-header"
                href="https://www.cgv.vn/default/customer/account/create/"
              >
                create account quick
              </a>
            </li>
          </ul>
        </div>

        {/* Slide show banner */}
        <div className="slideshow-container">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {/* Sử dụng vòng lặp để render SwiperSlide */}
            {slidesData.map((slide, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <a href={slide.href}>
                  <img src={slide.imgSrc} alt={`Slide ${index + 1}`} />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Movie selection */}
        <div className="home-movie-selection">
          <div className="home-title">
            <h2>movie selection</h2>
          </div>
          <Swiper
            slidesPerView={isScreen ? (isPhone ? 2 : 3) : 4}
            spaceBetween={15}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            id="slider2"
          >
            {movie.map((Movie, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onClick={chooseMovie(Movie)} // Chuyển đến trang chi tiết khi click vào slide
                  className="film-lists"
                  title={Movie.title}
                >
                  <img
                    src={Movie.image}
                    alt=""
                    style={{ borderRadius: "12px" }}
                  />
                  <div className="play-trailer">
                    <button
                      type="button"
                      className="play-trailer-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn chặn sự kiện nhấp chuột từ đi lên slide
                        handleClickOpen(Movie); // Mở dialog với thông tin đúng bộ phim
                      }}
                    >
                      <span className="play-icon">►</span> {/* Icon Play */}
                    </button>
                  </div>
                  <div className="feature_film_content">
                    <h3>{Movie.name}</h3>

                    <button
                      type="button"
                      title="Mua vé"
                      className="button btn-booking"
                      onClick={(e) => {
                        //e.stopPropagation(); // Ngăn chặn sự kiện nhấp chuột từ đi lên slide
                        chooseMovie(Movie); // Chuyển đến trang chi tiết
                      }}
                    >
                      <span>
                        <span>Mua vé ngay</span>
                      </span>
                    </button>
                  </div>
                  <VideoDialog
                    open={open}
                    handleClose={handleClose}
                    trailer={currentMovie} 
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Movie event */}
        <div className="product-collateral toggle-content tabs home-event">
          <div className="home-title">
            <h2>event</h2>
          </div>
        </div>

        {/* Promotion card */}
        <div className="home-promotion-card">
          <ul className="promos">
            <li className="col-ad">
              <div className="format-border">
                <a href="https://www.cgv.vn/default/newsoffer/dream-party-package/">
                  <img
                    alt=""
                    src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/2024_Sep_U22_496x267.jpg"
                  />
                </a>
              </div>
            </li>
            <li className="col-hd">
              <div className="format-border">
                <a href="https://www.cgv.vn/default/newsoffer/u22-vn/">
                  <img
                    src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/2024_Sep_U22_496x267.jpg"
                    alt=""
                  />
                </a>
              </div>
            </li>
            <li className="col-ad">
              <div className="format-border">
                <a
                  href="https://www.cgv.vn/default/newsoffer/hall-rental-cgv/"
                  target="_blank"
                >
                  <img
                    src="https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/2024_Sep_U22_496x267.jpg"
                    alt=""
                  />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
