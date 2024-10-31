// VideoDialog.js
import React from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const VideoDialog = ({ open, handleClose, trailer }) => {
  //console.log("trailer-link", trailer);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: { position: "relative" },
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); // Ngăn chặn sự kiện propagating
          handleClose(); // Đóng dialog
        }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "black",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <iframe
          width="100%"
          height="450"
          src={trailer}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Trailer"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
