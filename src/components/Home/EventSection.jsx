import { Box, Typography, Container } from "@mui/material";
import { Link } from 'react-router-dom';

const events = [
  {
    id: 1,
    title: "COMBO “ÁO THUN BHDS x SAIGONINK” SIÊU CHẤT",
    description:
      "Công nghệ in hiện đại mang lại những sản phẩm áo thun BST Halloween của BHDS & SaigonInk có hình in sắc nét, màu sắc sinh động",
    image:
      "https://www.bhdstar.vn/wp-content/uploads/2024/10/Ao-thun-Sai-gon-ink-vuong-2.jpg",
    url: "https://www.bhdstar.vn/mon-an/combo-ao-thun-bhds-x-saigonink-sieu-chat/",
  },
  {
    id: 2,
    title: "COMBO “TÚI TOLE & QUAI XÁCH LY”",
    description:
      "Mua combo bắp nước kèm túi tole hoặc quai xách ly siêu xinh với giá siêu ưu đãi",
    image:
      "https://www.bhdstar.vn/wp-content/uploads/2024/09/tui-tote-1x1-1.png",
    url: "https://www.bhdstar.vn/mon-an/combo-tui-tole-quai-xach-ly/",
  },
  {
    id: 3,
    title: "COMBO “CONAN – THÁM TỬ LỪNG DANH”",
    description:
      "Mua combo bắp nước kèm 1 sản phẩm Conan với giá cực hời",
    image:
      "https://www.bhdstar.vn/wp-content/uploads/2024/09/combo-conan-moi.jpg",
    url: "https://www.bhdstar.vn/mon-an/combo-conan-tham-tu-lung-danh/",
  },
];

export default function EventSection() {
  return (
    <Box
      component="section"
      sx={{
        py: 2,
        backgroundColor: "transparent",
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
          COMBO SIÊU HỜI
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {events.map((event) => (
            <Link 
              key={event.id}
              to={event.url}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  backgroundColor: "transparent",
                  transition: "transform 0.3s ease-in-out",
                  cursor: 'pointer',
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={event.image}
                  alt={event.title}
                  sx={{
                    width: '100%',
                    height: { xs: 400, sm: 350, md: 415 },
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "primary.main",
                      fontSize: { xs: '0.9rem', md: '1.1rem' },
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#000",
                      display: '-webkit-box',
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {event.description}
                  </Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
