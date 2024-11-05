import { Box } from '@mui/material';
import bannerImage from '../../assets/images/banner-top-website-giang-sinh.jpg';

export default function BannerTop() {
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        height: { 
          xs: '60px',
          sm: '90px',
          md: '120px'
        },
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
} 