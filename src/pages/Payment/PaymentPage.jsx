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
  const [payUrl, setPayUrl] = useState(null);
  const [searchParams] = useSearchParams();
  const [paymentResult, setPaymentResult] = useState(null);

  // Thêm state để track nguồn gốc navigation
  const [isFromSandbox, setIsFromSandbox] = useState(false);

  const paymentData = location.state;
  const customerInfo = {
    idcustomer: "6745e15e6ed1ebf9126196e2",
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
//amount=1120000&appid=2553&apptransid=241223_CGV241223211404&bankcode=&checksum=4e75ab1f51a0a46e49564b2d1ed4a9738ad518cf15b37d22bb92829c9dafc682&discountamount=0&pmcid=0&status=-49
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
              //message: searchParams.get("return_message"),
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
        // 1. Validate data
        const dataPayment = {
          amount: paymentData.totalAmount,
          paymentMethod: paymentData.selectedPaymentMethod,
          returnUrl: `${window.location.origin}/payment`,
          idcustomer: customerInfo.idcustomer,
          idshowtime: paymentData.showtimeInfo.idshowtime,
          seatsByType: paymentData.seatsByType,
        };

        // 2. Gọi API payment tương ứng
        const callPaymentAPI = async () => {
          switch (dataPayment.paymentMethod) {
            case "momo":
              return await createPaymentMomo(dataPayment);
            case "zalopay":
              return await createPaymentZalopay(dataPayment);
            case "vnpay":
              return await createPaymentVNpay(dataPayment);
            default:
              throw new Error("Phương thức thanh toán không hợp lệ");
          }
        };

        try {
          // 3. Xử lý response và lấy payUrl
          let payUrl;
          try {
            const response = await callPaymentAPI();
            //console.log('res', response.data)
            payUrl = response.data.payUrl
          } catch (apiError) {
            console.error("API call failed:", apiError);
            payUrl = fakeDataManager.getPayUrl([])[0].payUrl;
          }
          // 4. Set state và return payUrl
          setPayUrl(payUrl);
          return payUrl;

        } catch (error) {
          console.error("Lỗi xử lý thanh toán:", error);
          throw error;
        }
      };

      // 5. Xử lý payment flow
      processPayment()
        .then(payUrl => {
          if (payUrl) {
            window.location.replace(payUrl);
          } else {
            throw new Error("Không lấy được URL thanh toán");
          }
        })
        .catch(error => {
          console.error("Lỗi thanh toán:", error);
          // Có thể thêm xử lý UI thông báo lỗi ở đây
        });
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
