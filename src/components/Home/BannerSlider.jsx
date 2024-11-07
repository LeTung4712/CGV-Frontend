import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import banner images
import banner1 from "../../assets/images/banner-slides/banner-01.jpg";
import banner2 from "../../assets/images/banner-slides/banner-02.jpg";
import banner3 from "../../assets/images/banner-slides/banner-03.jpg";
import banner4 from "../../assets/images/banner-slides/banner-04.jpg";
import banner5 from "../../assets/images/banner-slides/banner-05.jpg";
import banner6 from "../../assets/images/banner-slides/banner-06.jpg";
import banner7 from "../../assets/images/banner-slides/banner-07.jpg";

export default function BannerSlider() {
  const slides = [
    {
      imgSrc: banner1,
      href: "/collection/new-arrivals"
    },
    {
      imgSrc: banner2, 
      href: "/collection/best-seller"
    },
    {
      imgSrc: banner3,
      href: "/collection/sale"
    },
    {
      imgSrc: banner4,
      href: "/collection/sale"
    },
    {
      imgSrc: banner5,
      href: "/collection/sale"
    },
    {
      imgSrc: banner6,
      href: "/collection/sale"
    },
    {
      imgSrc: banner7,
      href: "/collection/sale"
    }
  ];

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          position: "relative",
          "& .swiper": {
            width: "100%",
          },
          "& .swiper-slide": {
            width: "100%",
            height: "auto",
            "& img": {
              display: "block",
              width: "100%",
              height: "auto",
            },
          },
          "& .swiper-button-next, & .swiper-button-prev": {
            color: "white",
            width: { xs: "30px", md: "40px" },
            height: { xs: "30px", md: "40px" },
            "&::after": {
              fontSize: { xs: "20px", md: "30px" },
            },
          },
          "& .swiper-pagination-bullet": {
            width: "10px",
            height: "10px",
            backgroundColor: "white",
            opacity: 0.5,
            "&-active": {
              opacity: 1,
              backgroundColor: "primary.main",
            },
          },
          "& .swiper-pagination": {
            bottom: "20px",
            display: { xs: 'none', md: 'block' }
          },
        }}
      >
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <img src={slide.imgSrc} alt={`Banner ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}
