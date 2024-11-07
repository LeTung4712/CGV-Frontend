import { Box, Container, Grid, Typography } from "@mui/material";
import backgroundImage from "../../assets/images/promotionBg.jpg";

const promotions = [
  {
    id: 1,
    title: "Cơ hội sở hữu LABUBU FLIP WITH ME 40cm tại BHDS !",
    description:
      "SỞ HỮU LABUBU FLIP WITH ME TẠI BHD STAR Trời ơi LABUBU đến với BHD Star rồi đây!! Để có thể sở hữu bé LABUBU siu hot này bạn chỉ cần mua 1 combo bất kì thôi đóoo :33 Đến BHD Star mua combo để có cơ hội sở hữu LABUBU miễn phí ngay nhéee",
    image:
      "https://www.bhdstar.vn/wp-content/uploads/2024/10/poster-labubu-web-1-1536x864.jpg",
    url: "https://www.bhdstar.vn/khuyen-mai/co-hoi-so-huu-labubu-flip-with-me-40cm-tai-bhds/",
  },
  {
    id: 2,
    title: "Tháng 10 – Deal siêu hời khi mua qua Web/App BHDS",
    description:
      "COMBO YÊU THƯƠNG NHÂN ĐÔI ĐIỂM THƯỞNG Khi đặt 2 Combo bắp nước trên Web/App BHD Star, bạn sẽ được nhân đôi điểm thành viên nè!!! OL Single Combo 1: 1 bắp + 1 nước = 89k OL Couple Combo 2: 1 bắp + 2 nước = 119k Ngoài ra bạn còn được áp dụng",
    image:
      "https://www.bhdstar.vn/wp-content/uploads/2024/10/Combo-online-web-1536x857.jpg",
    url: "https://www.bhdstar.vn/khuyen-mai/thang-10-deal-sieu-hoi-khi-mua-qua-web-app-bhds/",
  },
  {
    id: 3,
    title: "Tháng quà tặng – Ưu đãi từ BHDS",
    description:
      "3 THÁNG LIÊN TỤC TẶNG 1 BẮP + 1 NƯỚC KHI XEM PHIM Ai ai cũng có thể tham gia, thời gian tặng thì thoải mái bạt ngàn để các bạn chờ cho dịp xem những bộ phim mình yêu thích nè Tặng 1 bắp + 1 nước tại quầy (sử dụng cho lần sau)",
    image:
      "https://www.bhdstar.vn/wp-content/uploads/2024/10/1920x1080-1536x864.jpg",
    url: "https://www.bhdstar.vn/khuyen-mai/thang-qua-tang-uu-dai-tu-bhds/",
  },
];

export default function PromotionCard() {
  return (
    <Box 
      component="section"
      sx={{ 
        py: { xs: 2, md: 4 },
        backgroundColor: 'background.default',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: "bold",
            textAlign: "center",
            color: "primary.main",
            backgroundColor: "white",
            borderRadius: 2,
            border: 2,
            borderColor: "primary.main",
            py: 1,
            px: 3,
            width: "fit-content",
            mx: "auto",
            fontSize: { xs: "1.5rem", md: "2rem" },
            textTransform: "uppercase",
          }}
        >
          Khuyến Mãi
        </Typography>
        
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          {promotions.map((promo) => (
            <Grid item xs={12} sm={6} md={4} key={promo.id}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <Box
                  component="a"
                  href={promo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <Box
                    component="img"
                    src={promo.image}
                    alt={promo.title}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                      borderRadius: 2
                    }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ 
                      typography: 'h6',
                      mb: 1,
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      color: 'primary.main'
                    }}>
                      {promo.title}
                    </Box>
                    <Box sx={{ 
                      typography: 'body2',
                      color: '#000'
                    }}>
                      {promo.description}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 