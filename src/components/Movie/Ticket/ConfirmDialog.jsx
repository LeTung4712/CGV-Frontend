import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  keyframes,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const ShakingDialog = styled(Dialog)(({ theme }) => ({
  "&.shake": {
    animation: `${shakeAnimation} 0.5s ease-in-out`,
  },
  "& .MuiDialog-paper": {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    maxWidth: "450px",
    width: "95%",
    margin: theme.spacing(2),
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  },
}));

function ConfirmDialog({ open, onClose, onConfirm, buttonRef }) {
  const [isShaking, setIsShaking] = React.useState(false);
  const dialogRef = React.useRef(null);

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    onClose();
  };

  const buttonPosition = buttonRef?.current?.getBoundingClientRect();

  return (
    <ShakingDialog
      open={open}
      onClose={handleClose}
      className={isShaking ? "shake" : ""}
      ref={dialogRef}
      TransitionProps={{
        style: buttonPosition
          ? {
              transformOrigin: `${buttonPosition.x}px ${buttonPosition.y}px`,
            }
          : undefined,
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Typography
          variant="h5"
          fontWeight="700"
          textAlign="center"
          color="primary.main"
        >
          Xác nhận đặt vé
        </Typography>
      </DialogTitle>

      <Divider sx={{ mb: 3 }} />

      <DialogContent sx={{ p: 0, mb: 3 }}>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            fontSize: "1.1rem",
          }}
        >
          Quý khách vui lòng kiểm tra lại thông tin vé trước khi thanh toán. Vé
          đã mua sẽ không thể đổi, trả. Xin chân thành cảm ơn Quý khách.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            minWidth: "120px",
            textTransform: "none",
          }}
        >
          Kiểm tra thông tin
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            minWidth: "120px",
            textTransform: "none",
          }}
        >
          Thanh toán
        </Button>
      </DialogActions>
    </ShakingDialog>
  );
}

export default ConfirmDialog;
