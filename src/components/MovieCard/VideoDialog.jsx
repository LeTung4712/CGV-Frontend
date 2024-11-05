// VideoDialog.js
import React, { useCallback } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from 'prop-types';

const VideoDialog = ({ open, handleClose, trailer }) => {
  const isValidTrailerUrl = trailer && (trailer.includes('youtube.com') || trailer.includes('youtu.be'));

  const handleIconClick = useCallback((e) => {
    e.stopPropagation();
    handleClose();
  }, [handleClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          position: "relative",
          borderRadius: "12px",
          overflow: "visible",
          backgroundColor: "#000",
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <IconButton
        onClick={handleIconClick}
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
          padding: "8px",
          '&:hover': {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          },
        }}
        size="medium"
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        style={{
          minHeight: "450px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0",
          backgroundColor: "#000",
        }}
      >
        {isValidTrailerUrl ? (
          <iframe
            width="100%"
            height="450"
            src={trailer}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
            style={{ border: 'none' }}
          />
        ) : (
          <div style={{ 
            padding: "20px", 
            textAlign: "center",
            color: "#fff",
            backgroundColor: "#000",
          }}>
            Không tìm thấy trailer hoặc URL không hợp lệ
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

VideoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  trailer: PropTypes.string.isRequired
};

export default VideoDialog;
