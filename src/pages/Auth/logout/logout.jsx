import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    // Xóa dữ liệu khỏi localStorage
    localStorage.removeItem("data");
    localStorage.removeItem("user");

    // Chuyển hướng sau 5 giây
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    color: "#333",
    fontSize: "24px",
    margin: "10px 0",
    fontWeight: "bold",
  };

  const subTextStyle = {
    color: "#555",
    fontSize: "16px",
    textAlign: "center",
    lineHeight: "1.5",
  };

  return (
    <div style={containerStyle}>
      <h6 style={headingStyle}>Thoát khỏi hệ thống thành công</h6>
      <h6 style={subTextStyle}>
        Bạn đã thoát khỏi tài khoản thành công. Hệ thống sẽ chuyển về trang chủ
        trong 5 giây, bạn vui lòng đợi.
      </h6>
    </div>
  );
}

export default Logout;
