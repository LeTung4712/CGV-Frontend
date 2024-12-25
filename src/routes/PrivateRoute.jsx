import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../constants/routes";
import { handleScrollToTop } from "./PublicRoute";

const PrivateRoute = ({ children }) => {
  const isLogin = localStorage.getItem("data");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      navigate(ROUTE.LOGIN, {
        state: { from: location.pathname },
      });
    }
  }, [isLogin, navigate, location]);

  useEffect(() => {
    handleScrollToTop();
  }, [location.pathname]);

  return <>{children}</>;
};

export default PrivateRoute;
