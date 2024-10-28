import { Swiper, SwiperSlide } from "swiper/react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slidesData } from "../../constants/slidesData";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMediaQuery } from "react-responsive";
import "./home.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Home() {
  const isScreen = useMediaQuery({ query: "(max-width: 770px)" });
  const isPhone = useMediaQuery({ query: "(max-width: 600px)" });
  const [movie, setMovie] = useState([]);

  const navigate = useNavigate();
  const showDetailMovie = (e) => {
    const name = e.target.title;
    fetch("http://localhost:3001/movie/getdetailnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/movie/${data.data.movie.title}`, { state: data.data.movie });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3001/movie/now-showing")
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.data.moviesNowShowing);
      })
      .catch((err) => {
        console.log(err);
      });
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
