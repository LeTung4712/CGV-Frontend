import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SuccessResult({ paymentStatus }) {
    const navigate = useNavigate();

    return (
        <Box sx={{ 
            textAlign: 'center',
            p: { xs: 2, sm: 3 },
            maxWidth: '600px',
            margin: '0 auto',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: { xs: 0, sm: 1 },
        }}>
            <Typography 
                variant="h4" 
                color="success.main" 
                gutterBottom
                sx={{ 
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    fontWeight: 600 
                }}
            >
                Thanh toán thành công!
            </Typography>
            
            <Box sx={{ 
                my: 3,
                p: { xs: 2, sm: 3 },
                bgcolor: 'grey.50',
                borderRadius: 1,
            }}>
                {[
                    { label: 'Mã đơn hàng', value: paymentStatus.orderId },
                    { label: 'Số tiền', value: `${paymentStatus.amount} VNĐ` },
                    { label: 'Phương thức', value: paymentStatus.payment_method },
                    { label: 'Thời gian', value: new Date(paymentStatus.payment_time).toLocaleString('vi-VN') }
                ].map((item, index) => (
                    <Box key={index} sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: index !== 3 ? '1px solid' : 'none',
                        borderColor: 'grey.200'
                    }}>
                        <Typography sx={{ 
                            color: 'text.secondary',
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}>
                            {item.label}:
                        </Typography>
                        <Typography sx={{ 
                            fontWeight: 500,
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}>
                            {item.value}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/')}
                sx={{ 
                    mt: 2,
                    px: { xs: 4, sm: 6 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    borderRadius: '24px'
                }}
            >
                Về trang chủ
            </Button>
        </Box>
    );
} 