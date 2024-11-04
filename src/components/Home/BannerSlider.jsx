import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { slidesData } from "../../constants/slidesData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BannerSlider() {
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
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                component="a"
                href={slide.href}
                sx={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}
