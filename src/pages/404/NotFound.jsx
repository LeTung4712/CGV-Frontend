import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "12rem",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            404
          </Typography>

          <Typography variant="h4" sx={{ mb: 3, color: "#455a64" }}>
            Oops! Trang bạn đang tìm kiếm không tồn tại.
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: "#78909c" }}>
            Có vẻ như trang này đã bị xóa hoặc không tồn tại.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
              },
            }}
          >
            Trở về trang chủ
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
