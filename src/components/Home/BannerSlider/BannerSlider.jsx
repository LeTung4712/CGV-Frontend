import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { slidesData } from "../../../constants/slidesData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./BannerSlider.css";

export default function BannerSlider() {
  return (
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
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <a href={slide.href}>
              <img src={slide.imgSrc} alt={`Slide ${index + 1}`} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 