import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import VideoDialog from "./VideoDialog";

const RATING_CONFIG = {
  P: {
    label: "Phổ biến với mọi độ tuổi",
    color: "#2196f3", // xanh dương
  },
  T13: {
    label: "Phim phổ biến đến người xem từ 13 tuổi trở lên",
    color: "#f44336", // đỏ
  },
  T16: {
    label: "Phim phổ biến đến người xem từ 16 tuổi trở lên",
    color: "#f44336", // đỏ
  },
  T18: {
    label: "Phim phổ biến đến người xem từ 18 tuổi trở lên",
    color: "#f44336", // đỏ
  },
};

export default function MovieCard({ movie }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleTrailerClick = (e) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleMovieClick = () => {
    navigate(`/movie/${movie.title}`, { state: movie });
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          minHeight: { xs: "380px", sm: "420px", md: "470px" },
          height: "fit-content",
          boxShadow: 3,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          backdropFilter: "blur(2px)",
          borderRadius: "12px",
        }}
        onClick={handleMovieClick}
      >
        {/* Phần ảnh và overlay */}
        <Box
          sx={{
            position: "relative",
            "&:hover .movie-overlay": {
              opacity: 1,
            },
            borderRadius: "12px",
            overflow: "hidden",
            height: 0,
            paddingTop: "150%",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            mb: 1.5,
          }}
        >
          <CardMedia
            component="img"
            image={movie.image_url}
            alt={movie.title}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />

          {/* Overlay chỉ cho phần ảnh */}
          <Box
            className="movie-overlay"
            sx={{
              borderRadius: "10px",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: 0,
              transition: "opacity 0.3s",
              padding: 2,
            }}
          >
            <Box />

            <IconButton
              onClick={handleTrailerClick}
              sx={{
                color: "white",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <PlayCircleOutlineIcon sx={{ fontSize: 50 }} />
            </IconButton>

            <Button
              variant="contained"
              startIcon={<LocalActivityIcon />}
              onClick={handleMovieClick}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                minWidth: { xs: "120px", sm: "140px" },
                fontSize: { xs: "0.9rem", sm: "1.1rem" },
                fontWeight: 600,
                padding: { xs: "6px 12px", sm: "8px 16px" },
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Mua vé ngay
            </Button>
          </Box>
        </Box>

        {/* Phần tên phim */}
        <CardContent
          sx={{
            p: 2,
            "&:last-child": { pb: 2 },
            height: { xs: "60px", sm: "70px", md: "80px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            color: "white",
          }}
        >
          <Box sx={{ textAlign: "left", width: "100%" }}>
            <Typography sx={{ pb: 1 }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  px: 0.2,
                  py: 0.2,
                  borderRadius: "4px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: RATING_CONFIG[movie.rated]?.color,
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                }}
              >
                {movie.rated}
              </Box>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  px: 0.2,
                  py: 0.2,
                  ml: 1,
                  borderRadius: "4px",
                  backgroundColor: "black",
                  border: "1px solid #FFD700",
                  color: "white",
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                }}
              >
                PHỤ ĐỀ/LỒNG TIẾNG
              </Box>
            </Typography>

            <Tooltip title={movie.title} placement="top">
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                  pb: 1,
                  color: "primary.main",
                }}
              >
                {movie.title}
              </Typography>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "primary.main"
              }}
            >
              <span style={{ color: "black" }}>Thể loại: </span>
              <span style={{ color: "primary.main" }}>
                {Array.isArray(movie.genre)
                  ? movie.genre.join(", ")
                  : movie.genre}
              </span>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <VideoDialog
        open={isDialogOpen}
        handleClose={handleDialogClose}
        trailer={movie.trailer_url?.replace("watch?v=", "embed/")}
      />
    </>
  );
}
