import React, { useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Divider
} from '@mui/material';
import vnpayIcon from '../../../assets/images/vnpay.png';
import momoIcon from '../../../assets/images/momo.png';
import zaloPayIcon from '../../../assets/images/zalopay.png';

const PAYMENT_METHODS = [
  {
    id: 'vnpay',
    name: 'VNPay',
    icon: vnpayIcon,
  },
  {
    id: 'momo',
    name: 'Momo',
    icon: momoIcon,
  },
  {
    id: 'zalopay',
    name: 'ZaloPay',
    icon: zaloPayIcon,
  }
];

function PaymentMethod({ selectedMethod, onMethodChange, shouldScroll }) {
  const paymentRef = useRef(null);

  useEffect(() => {
    if (shouldScroll && paymentRef.current) {
      paymentRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [shouldScroll]);

  return (
    <Box 
      ref={paymentRef}
      sx={{ 
        p: 3, 
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Chọn hình thức thanh toán
      </Typography>

      <RadioGroup
        value={selectedMethod}
        onChange={(e) => onMethodChange(e.target.value)}
      >
        <Stack divider={
          <Divider 
            sx={{ 
              borderStyle: 'dashed',
              borderColor: 'rgba(0, 0, 0, 0.12)'
            }} 
          />
        }>
          {PAYMENT_METHODS.map((method) => (
            <FormControlLabel
              key={method.id}
              value={method.id}
              control={<Radio />}
              label={
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 2,
                  py: 1
                }}>
                  <Box
                    component="img"
                    src={method.icon}
                    alt={method.name}
                    sx={{
                      height: 40,
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                  <Typography variant="body1">
                    {method.name}
                  </Typography>
                </Box>
              }
              sx={{
                m: 0,
                width: '100%',
                py: 1.5,
                px: 1,
                '& .MuiFormControlLabel-label': {
                  flex: 1,
                },
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)'
                },
                ...(selectedMethod === method.id && {
                  bgcolor: 'rgba(25, 118, 210, 0.08)'
                })
              }}
            />
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
}

export default PaymentMethod; 