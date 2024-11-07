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
  Tooltip
} from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import VideoDialog from "./VideoDialog";

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
          width: '100%',
          height: { xs: '360px', sm: '420px', md: '460px' },
          boxShadow: 3,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(2px)',
          borderRadius: '12px',
        }}
        onClick={handleMovieClick}
      >
        {/* Phần ảnh và overlay */}
        <Box
          sx={{
            position: 'relative',
            '&:hover .movie-overlay': {
              opacity: 1
            },
            borderRadius: '12px',
            overflow: 'hidden',
            height: 0,
            paddingTop: '150%',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            mb: 1,
          }}
        >
          <CardMedia
            component="img"
            image={movie.image_url}
            alt={movie.title}
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          
          {/* Overlay chỉ cho phần ảnh */}
          <Box
            className="movie-overlay"
            sx={{
              borderRadius: '10px',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: 0,
              transition: 'opacity 0.3s',
              padding: 2
            }}
          >
            <Box />
            
            <IconButton
              onClick={handleTrailerClick}
              sx={{
                color: 'white',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              <PlayCircleOutlineIcon sx={{ fontSize: 50 }} />
            </IconButton>

            <Button
              variant="contained"
              startIcon={<LocalActivityIcon />}
              onClick={handleMovieClick}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                minWidth: { xs: '120px', sm: '140px' },
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                fontWeight: 600,
                padding: { xs: '6px 12px', sm: '8px 16px' },
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
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
            '&:last-child': { pb: 2 },
            height: { xs: '60px', sm: '70px', md: '80px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            color: 'white'
          }}
        >
          <Box sx={{ textAlign: 'left', width: '100%', px: 1 }}>
            <Tooltip title={movie.name} placement="top">
              <Typography 
                variant="h6" 
                component="h3"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.2,
                  mb: 0.5,
                  color: 'primary.main'
                }}
              >
                {movie.name}
              </Typography>
            </Tooltip>
            <Typography 
              variant="body2" 
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ color: 'black' }}>Thể loại: </span>
              <span style={{ color: 'primary.main' }}>{movie.genre}</span>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <VideoDialog
        open={isDialogOpen}
        handleClose={handleDialogClose}
        trailer={movie.trailer?.replace("watch?v=", "embed/")}
      />
    </>
  );
}