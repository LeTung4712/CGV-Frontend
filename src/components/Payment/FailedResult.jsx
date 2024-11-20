import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FailedResult({ paymentStatus }) {
    const navigate = useNavigate();

    return (
        <Box sx={{ 
            textAlign: 'center',
            p: { xs: 2, sm: 3 },
            maxWidth: '500px',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1
        }}>
            <Typography 
                variant="h4" 
                color="error.main" 
                gutterBottom
                sx={{ 
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    fontWeight: 600,
                    mb: 3
                }}
            >
                Thanh toán thất bại!
            </Typography>
            
            <Box sx={{ 
                my: 2,
                p: 2,
                borderRadius: 1,
                opacity: 0.8
            }}>
                <Typography sx={{ mb: 2, color: 'error.dark' }}>
                    Mã đơn hàng: {paymentStatus.orderId}
                </Typography>
                <Typography sx={{ color: 'error.dark', fontWeight: 500 }}>
                    Lỗi: {paymentStatus.message}
                </Typography>
            </Box>

            <Button 
                variant="contained" 
                color="primary"
                size="large"
                onClick={() => navigate('/')}
                sx={{ 
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: '24px',
                    textTransform: 'none',
                    fontSize: '1.1rem'
                }}
            >
                Thử lại
            </Button>
        </Box>
    );
} 