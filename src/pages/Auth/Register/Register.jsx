import React, { useState } from "react";
import { registerUser } from "../../../api/userService";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "", 
    create_at: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Thêm thời gian hiện tại vào formData
    const create_at = new Date().toISOString();
    const userData = { ...formData, create_at };

    try {
      // Kiểm tra xác nhận mật khẩu
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Mật khẩu và xác nhận mật khẩu không khớp!");
      }

      // Thêm một số validate cơ bản
      if (!formData.email.includes("@")) {
        throw new Error("Email không hợp lệ!");
      }
      if (formData.phone.length < 10) {
        throw new Error("Số điện thoại không hợp lệ!");
      }

       const result = await registerUser(userData);


      setSuccess(result.message || "Đăng ký thành công!");
      navigate("/login");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        create_at: "",
      });
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="xs">
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Đăng Ký
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <TextField
            label="Họ và tên"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
