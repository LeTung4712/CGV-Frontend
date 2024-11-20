import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingPayment({ message }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem" },
          fontWeight: 600,
          color: "primary.main",
          textAlign: "center",
          mb: 3,
        }}
      >
        Thanh Toán
      </Typography>
      <CircularProgress size={50} thickness={4} sx={{ mb: 2 }} />
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontWeight: 500,
          color: "text.secondary",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}
