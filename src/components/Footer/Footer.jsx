import { Box, Container, Grid, Typography, Link, Stack, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

import _4xd from "../../img/1.png";
import imax from "../../img/6.png";
import sturium from "../../img/8.png";
import goldclass from "../../img/7.png";
import lamour from "../../img/9.png";
import sweetbox from "../../img/5.png";
import premium from "../../img/10.png";
import screenX from "../../img/11.png";
import cineF from "../../img/3.png";
import cineL from "../../img/4.png";
import cineS from "../../img/2.png";
import suit from "../../img/12.png";
import cgvFoot from "../../img/cgv-foot.png";

const BrandImage = styled('img')(({ isMobile }) => ({
  height: 'auto',
  maxWidth: '120%',
  objectFit: 'contain',
  filter: 'brightness(0.8)',
  ...(isMobile ? {
    transform: 'scale(1)',
  } : {
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(0.9)',
  })
}));

const BrandContainer = styled(Box)(({ isMobile }) => ({
  ...(isMobile ? {
    // Không có hiệu ứng trên mobile
  } : {
    '&:hover': {
      '& img': {
        filter: 'brightness(0.6)',
        transform: 'scale(0.8)',
      }
    },
    '&:hover img:hover': {
      filter: 'brightness(1.2)',
      transform: 'scale(1.3)',
      zIndex: 3,
    },
    '&:hover + div img': {
      transform: 'scale(0.85)',
    },
    '& + div:hover img': {
      transform: 'scale(0.85)',
    }
  })
}));

const SocialImage = styled('img')({
  maxWidth: '120%',
  height: 'auto'
});

const BRAND_IMAGES = [
  { src: _4xd, name: '4DX' },
  { src: imax, name: 'IMAX' },
  { src: sturium, name: 'Starium' },
  { src: goldclass, name: 'Gold Class' },
  { src: lamour, name: "L'amour" },
  { src: sweetbox, name: 'Sweetbox' },
  { src: cineS, name: 'CineS' },
  { src: premium, name: 'Premium' },
  { src: screenX, name: 'ScreenX' },
  { src: cineF, name: 'CineF' },
  { src: cineL, name: 'CineL' },
  { src: suit, name: 'Suit' }
];

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component="footer" sx={{ 
      bgcolor: '#fff',
      color: '#333',
      pt: 2,
    }}>
      {/* Brand Slider Section */}
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ 
          mb: 0,
          pb: 1,
          position: 'relative',
          overflow: 'visible'
        }}>
          {BRAND_IMAGES.map((brand, index) => (
            <Grid item xs={4} sm={3} md={1} key={index}>
              <BrandContainer isMobile={isMobile} sx={{ 
                p: 1.5,
                position: 'relative',
                '&:hover': {
                  zIndex: 2
                }
              }}>
                <Link 
                  href={`https://www.cgv.vn/default/theaters/special/${brand.name.toLowerCase()}`}
                  target="_blank"
                  sx={{
                    display: 'block',
                    textAlign: 'center'
                  }}
                >
                  <BrandImage isMobile={isMobile} src={brand.src} alt={brand.name} />
                </Link>
              </BrandContainer>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Main Footer Content */}
      <Box sx={{ 
        bgcolor: '#111',
        width: '100%',
        color: '#fff',
        py: 4,
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* CGV Vietnam Section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ 
                mb: 2,
                fontWeight: 'bold',
                color: '#fff'
              }}>
                CGV Việt Nam
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Giới Thiệu
                </Link>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Tiện Ích Online
                </Link>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Thẻ Quà Tặng
                </Link>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Tuyển Dụng
                </Link>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Liên Hệ Quảng Cáo
                </Link>
              </Stack>
            </Grid>

            {/* Terms Section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ 
                mb: 2,
                fontWeight: 'bold',
                color: '#fff'
              }}>
                Điều Khoản Sử Dụng
              </Typography>
              <Stack spacing={1}>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Điều Khoản Chung
                </Link>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Điều Khoản Giao Dịch
                </Link>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Chính Sách Thanh Toán
                </Link>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Chính Sách Bảo Mật
                </Link>
                <Link href="#" underline="hover" sx={{ color: '#999', '&:hover': { color: '#fff' } }}>
                  Câu Hỏi Thường Gặp
                </Link>
              </Stack>
            </Grid>

            {/* Connect With Us Section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ 
                mb: 2,
                fontWeight: 'bold',
                color: '#fff'
              }}>
                Kết nối với chúng tôi
              </Typography>
              <Stack spacing={2}>
                <SocialImage src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-social-footer-40.png" alt="social" />
                <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/cong-thuong.PNG" alt="certification" style={{ maxWidth: '150px' }} />
              </Stack>
            </Grid>

            {/* Customer Service Section */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ 
                mb: 2,
                fontWeight: 'bold',
                color: '#fff'
              }}>
                Chăm sóc khách hàng
              </Typography>
              <Stack spacing={1} sx={{ color: '#999' }}>
                <Typography>Hotline: 1900 6017</Typography>
                <Typography>
                  Giờ làm việc: 8:00 - 22:00
                  (Tất cả các ngày bao gồm cả ngày Lễ Tết)
                </Typography>
                <Typography>Email hỗ trợ: hoidap@cgv.vn</Typography>
              </Stack>
            </Grid>
          </Grid>

          {/* Company Info Section */}
          <Box sx={{ 
            mt: 4,
            pt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <img src={cgvFoot} alt="cgv footer logo" style={{ maxWidth: '100%', filter: 'brightness(0) invert(1)' }} />
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                  CÔNG TY TNHH CJ CGV VIETNAM
                </Typography>
                <Typography variant="body2" paragraph sx={{ color: '#999' }}>
                  Giấy CNĐKDN: 0303675393, đăng ký lần đầu ngày 31/7/2008, đăng ký thay đổi lần thứ 5 ngày 14/10/2015, cấp bởi Sở KHĐT thành phố Hồ Chí Minh.
                </Typography>
                <Typography variant="body2" paragraph sx={{ color: '#999' }}>
                  Địa Chỉ: Tầng 2, Rivera Park Saigon - Số 7/28 Thành Thái, P.14, Q.10, TPHCM.
                </Typography>
                <Typography variant="body2" sx={{ color: '#999' }}>
                  Hotline: 1900 6017
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, color: '#999' }}>
                  COPYRIGHT 2017 CJ CGV. All RIGHTS RESERVED.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
