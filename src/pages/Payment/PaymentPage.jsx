import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import {createPaymentMomo,createPaymentVNpay,createPaymentZalopay} from "../../api/paymentService";
import LoadingPayment from "../../components/Payment/LoadingPayment";
import SuccessResult from "../../components/Payment/SuccessResult";
import FailedResult from "../../components/Payment/FailedResult";
import { fakeDataManager } from "../../utils/fakeDataManager";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentResult, setPaymentResult] = useState(null);

  // Thêm state để track nguồn gốc navigation
  const [isFromSandbox, setIsFromSandbox] = useState(false);

  const paymentData = location.state;
  const customerInfo = {
    idcustomers: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0909090909",
  };
  const isReturnUrl =
    searchParams.get("errorCode") ||
    searchParams.get("vnp_ResponseCode") ||
    searchParams.get("status");

  // Thêm useEffect để detect navigation từ sandbox
  useEffect(() => {
    if (document.referrer.includes('momo') || 
        document.referrer.includes('vnpay') || 
        document.referrer.includes('zalopay')) {
      setIsFromSandbox(true);
    }
  }, []);

  useEffect(() => {
    // Nếu đang quay lại từ sandbox, redirect về /ticket
    if (isFromSandbox) {
      navigate('/ticket', { replace: true });
      return;
    }

    // Xử lý kết quả thanh toán từ returnUrl callback
    if (isReturnUrl) {
      const processPaymentResult = () => {
        // Xử lý response callback từ Momo
        const momoResult = searchParams.get("errorCode");
        if (momoResult !== null) {
          const isSuccess = momoResult === "0";
          setPaymentResult({
            success: isSuccess,
            paymentStatus: {
              orderId: searchParams.get("orderId") || "Unknown",
              message: searchParams.get("message") || "Giao dịch thất bại",
              payment_method: searchParams.get("partnerCode") || "MOMO",
              amount: parseInt(searchParams.get("amount")) || 0,
              payment_time: searchParams.get("responseTime") || new Date().toISOString(),
            },
            additionalInfo: {
              accessKey: searchParams.get("accessKey"),
              requestId: searchParams.get("requestId"),
              payType: searchParams.get("payType"),
            }
          });
          return;
        }

        // Xử lý response từ VNPay
        const vnpayResult = searchParams.get("vnp_ResponseCode");
        if (vnpayResult) {
          const isSuccess = vnpayResult === "00";
          setPaymentResult({
            success: isSuccess,
            paymentStatus: {
              orderId: searchParams.get("vnp_TxnRef"),
              amount: parseInt(searchParams.get("vnp_Amount")) / 100,
              payment_method: "VNPAY",
              payment_time: new Date().toISOString(),
              message: searchParams.get("vnp_Message"),
            },
          });
          return;
        }

        // Xử lý response từ ZaloPay
        const zalopayResult = searchParams.get("status");
        if (zalopayResult) {
          const isSuccess = zalopayResult === "1";
          setPaymentResult({
            success: isSuccess,
            paymentStatus: {
              orderId: searchParams.get("apptransid"),
              amount: parseInt(searchParams.get("amount")),
              payment_method: "ZALOPAY",
              payment_time: new Date().toISOString(),
              message: searchParams.get("description"),
            },
          });
          return;
        }
      };

      processPaymentResult();
    }
    // Xử lý thanh toán mới
    else if (paymentData) {
      const processPayment = async () => {
        try {
          const dataPayment = {
            amount: paymentData.totalAmount,
            paymentMethod: paymentData.selectedPaymentMethod,
            returnUrl: `${window.location.origin}/payment`,
            //http://localhost:5173/payment?partnerCode=MOMOXYZ2024&accessKey=ABCD1234&requestId=REQ0011223344&orderId=CGV23112013361912&errorCode=0&message=Success&amount=50000&responseTime=2024-11-21T12%3A34%3A56.789Z&payType=qr
            //http://localhost:5173/payment?partnerCode=MOMOXYZ2024&accessKey=ABCD1234&requestId=REQ0011223344&orderId=CGV23112013361912&errorCode=49&message=Transaction+declined&amount=50000&responseTime=2024-11-21T12%3A34%3A56.789Z&payType=qr
            idcustomers: customerInfo.idcustomers,
            idcinemas: paymentData.cinemaInfo.idcinemas,
            idhalls: paymentData.hallInfo.idhalls,
            idshowtimes: paymentData.showtimeInfo.idshowtimes,
            idmovies: paymentData.movieInfo.name,
            seatsByType: paymentData.seatsByType,
          };

          // gọi API 
          let response;
          try {
            switch (paymentData.selectedPaymentMethod) {
              case "momo":
                response = await createPaymentMomo(dataPayment);
                break;
              case "zalopay":
                response = await createPaymentZalopay(dataPayment);
                break;
              case "vnpay":
                response = await createPaymentVNpay(dataPayment);
                break;
              default:
                throw new Error("Phương thức thanh toán không hợp lệ");
            }
          } catch (apiError) {
            console.error("API call failed:", apiError);
            
          }

          // Nếu API thất bại, sử dụng fakeDataManager
          const payUrl = fakeDataManager.getPayUrl(response?.payUrl);
          
          if (payUrl) {
            window.location.replace(typeof payUrl === 'string' ? payUrl : payUrl[0].payUrl);
          } else {
            throw new Error("Không thể lấy được URL thanh toán");
          }
          
        } catch (error) {
          console.error("Lỗi xử lý thanh toán:", error);
        }
      };

      processPayment();
    } 
    // Nếu không có payment data và không phải returnUrl, redirect về /ticket
    else {
      navigate('/ticket', { replace: true });
    }
  }, [paymentData, navigate, searchParams, isReturnUrl, isFromSandbox]);

  // Thêm useEffect mới để handle browser back button
  useEffect(() => {
    const handlePopState = (event) => {
      // Nếu người dùng bấm nút back của browser và không có payment data
      if (!paymentData && !isReturnUrl) {
        navigate('/ticket', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate, paymentData, isReturnUrl]);

  // Hiển thị kết quả thanh toán
  if (paymentResult) {
    return (
      <Box
        sx={{
          minHeight: '45vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f5f5f5',
          pt: { xs: 1, md: 2 },
          pb: { xs: 1, md: 2 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            flex: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            mt: { xs: 1, md: 2 },
          }}
        >
          {paymentResult.success ? (
            <SuccessResult
              paymentStatus={paymentResult.paymentStatus}
            />
          ) : (
            <FailedResult paymentStatus={paymentResult.paymentStatus} />
          )}
        </Box>
      </Box>
    );
  }

  // Hiển thị loading khi đang xử lý
  return (
    <Box
      sx={{
        minHeight: { xs: '35vh', sm: '45vh' },
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f5f5f5',
        pt: { xs: 1, md: 2 },
        pb: { xs: 1, md: 2 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          flex: 0,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          mt: { xs: 0.5, md: 2 },
          width: '100%',
        }}
      >
        <LoadingPayment 
          message={
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', sm: '1.2rem' },
                fontWeight: 500,
                color: 'text.secondary',
                textAlign: 'center',
                mt: 2
              }}
            >
              Bạn đang được chuyển hướng đến trang thanh toán ...
            </Typography>
          }
        />
      </Box>
    </Box>
  );
}

export default PaymentPage;
