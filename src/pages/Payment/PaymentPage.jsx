import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import {
  createPaymentMomo,
  createPaymentVNpay,
  createPaymentZalopay,
} from "../../api/paymentService";
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

  const [isProcessing, setIsProcessing] = useState(false);

  const paymentData = location.state;
  const id_customer = JSON.parse(localStorage.getItem("data")).id;
  const isReturnUrl =
    searchParams.get("errorCode") ||
    searchParams.get("vnp_ResponseCode") ||
    searchParams.get("status");

  useEffect(() => {
    // Xử lý kết quả thanh toán từ returnUrl callback
    if (isReturnUrl) {
      const processPaymentResult = () => {
        const paymentProcessors = {
          momo: () => {
            const errorCode = searchParams.get("errorCode");
            if (errorCode === null) return null;

            return {
              success: errorCode === "0",
              paymentStatus: {
                orderId: searchParams.get("orderId") || "Unknown",
                message: searchParams.get("message") || "Giao dịch thất bại",
                payment_method: "MOMO",
                amount: parseInt(searchParams.get("amount")) || 0,
                payment_time:
                  searchParams.get("responseTime") || new Date().toISOString(),
              },
            };
          },
          vnpay: () => {
            const responseCode = searchParams.get("vnp_ResponseCode");
            if (!responseCode) return null;

            return {
              success: responseCode === "00",
              paymentStatus: {
                orderId: searchParams.get("vnp_TxnRef"),
                amount: parseInt(searchParams.get("vnp_Amount")) / 100,
                payment_method: "VNPAY",
                payment_time: new Date().toISOString(),
                message: searchParams.get("vnp_Message"),
              },
            };
          },
          zalopay: () => {
            const status = searchParams.get("status");
            if (status === null) return null;

            return {
              success: status === "1",
              paymentStatus: {
                orderId: searchParams.get("apptransid"),
                amount: parseInt(searchParams.get("amount")),
                payment_method: "ZALOPAY",
                payment_time: new Date().toISOString(),
                //message: searchParams.get("return_message"),
              },
            };
          },
        };

        // Thực thi từng processor cho đến khi có kết quả
        for (const processor of Object.values(paymentProcessors)) {
          const result = processor();
          if (result) return result;
        }

        return null;
      };

      const result = processPaymentResult();
      if (result) {
        setPaymentResult(result);
      }
    }
    // Xử lý thanh toán mới
    else if (paymentData) {
      const processPayment = async () => {
        setIsProcessing(true);
        try {
          // 1. Validate data
          const dataPayment = {
            amount: paymentData.totalAmount,
            paymentMethod: paymentData.selectedPaymentMethod,
            returnUrl: `${window.location.origin}/payment`,
            idcustomer: id_customer,
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

          // 3. Xử lý response và lấy payUrl
          let payUrl;
          try {
            const response = await callPaymentAPI();
            //console.log('res', response.data)
            payUrl = response.data.payUrl;
          } catch (apiError) {
            console.error("API call failed:", apiError);
            //payUrl = fakeDataManager.getPayUrl([])[0].payUrl;
          }
          // 4. Set state và return payUrl
          setPayUrl(payUrl);
          return payUrl;
        } catch (error) {
          console.error("Lỗi xử lý thanh toán:", error);
          throw error;
        } finally {
          setIsProcessing(false);
        }
      };

      // 5. Xử lý payment flow
      processPayment()
        .then((payUrl) => {
          if (payUrl) {
            window.location.replace(payUrl);
          } else {
            throw new Error("Không lấy được URL thanh toán");
          }
        })
        .catch((error) => {
          console.error("Lỗi thanh toán:", error);
          // Có thể thêm xử lý UI thông báo lỗi ở đây
        });
    }
    // Nếu không có payment data và không phải returnUrl, redirect về /ticket
    else {
      navigate("/ticket", { replace: true });
    }
  }, [paymentData, navigate, searchParams, isReturnUrl, isFromSandbox]);

  // Hiển thị kết quả thanh toán
  if (paymentResult) {
    return (
      <Box
        sx={{
          minHeight: "45vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
          pt: { xs: 1, md: 2 },
          pb: { xs: 1, md: 2 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            flex: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            mt: { xs: 1, md: 2 },
          }}
        >
          {paymentResult.success ? (
            <SuccessResult paymentStatus={paymentResult.paymentStatus} />
          ) : (
            <FailedResult paymentStatus={paymentResult.paymentStatus} />
          )}
        </Box>
      </Box>
    );
  } else {
    // Hiển thị loading khi đang xử lý
    return (
      <Box
        sx={{
          minHeight: { xs: "35vh", sm: "45vh" },
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
          pt: { xs: 1, md: 2 },
          pb: { xs: 1, md: 2 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            flex: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            mt: { xs: 0.5, md: 2 },
            width: "100%",
          }}
        >
          <LoadingPayment message="Bạn đang được chuyển hướng đến trang thanh toán ..." />
        </Box>
      </Box>
    );
  }
}

export default PaymentPage;
