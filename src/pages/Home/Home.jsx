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

        
      </div>
    </div>
  );
}
