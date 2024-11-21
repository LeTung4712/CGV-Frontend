import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Chuyển hướng sau 5 giây
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h4>Thoát khỏi hệ thống thành công</h4>
      <p>
        Bạn đã thoát khỏi tài khoản thành công. Hệ thống sẽ chuyển về trang chủ
        trong 5 giây, bạn vui lòng đợi.
      </p>
    </div>
  );
};

export default Logout;
