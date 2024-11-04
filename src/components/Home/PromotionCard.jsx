import { Box, Container, Grid } from "@mui/material";

const promotions = [
  {
    id: 1,
    href: "https://www.cgv.vn/default/newsoffer/dream-party-package/",
    imgSrc: "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/2024_Sep_U22_496x267.jpg",
    alt: "Dream Party Package"
  },
  {
    id: 2,
    href: "https://www.cgv.vn/default/newsoffer/u22-vn/",
    imgSrc: "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/2024_Sep_U22_496x267.jpg",
    alt: "U22 Promotion"
  },
  {
    id: 3,
    href: "https://www.cgv.vn/default/newsoffer/hall-rental-cgv/",
    imgSrc: "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/2024_Sep_U22_496x267.jpg",
    alt: "Hall Rental"
  }
];

export default function PromotionCard() {
  return (
    <Box 
      component="section"
      sx={{ 
        py: { xs: 2, md: 4 },
        backgroundColor: 'background.default'
      }}
    >
      <Container maxWidth="xl">
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
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
                  href={promo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <Box
                    component="img"
                    src={promo.imgSrc}
                    alt={promo.alt}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 2
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 