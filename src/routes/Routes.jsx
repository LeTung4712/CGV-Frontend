import { ROUTE } from "../constants/routes";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import DetailMovie from "../pages/Movie/DetailMovie";
import Ticket from "../pages/Movie/Ticket";
import PaymentPage from "../pages/Payment/PaymentPage";
//import Test from '../pages/Home/test';
import Login from "../pages/Auth/Login/Login"
import Logout from "../pages/Auth/logout/logout"
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


export const routes = [
  {
    path: ROUTE.LAYOUT,
    element: <Layout />,
    isPrivate: false,
    children: [
      { path: ROUTE.HOME, element: <Home /> },
      { path: ROUTE.MOVIE_DETAIL, element: <DetailMovie /> },
      { path: ROUTE.TICKET, element: <Ticket /> },
      { path: ROUTE.LOGIN, element: <Login/>},
      { path: ROUTE.REGISTER, element: <Register/>},
      { path: ROUTE.AUTH_PAYMENT, element: <PaymentPage />},
      { path:ROUTE.LOGOUT,element: <Logout/>}

    ],
  },
  {
    path: ROUTE.LAYOUT,
    element: <Layout />,
    isPrivate: true,
    children: [

    ],
  },
].map((route) => {
  if (route.isPrivate) {
    return {
      ...route,
      element: <PrivateRoute>{route.element}</PrivateRoute>,
    };
  }

  return {
    ...route,
    element: <PublicRoute>{route.element}</PublicRoute>,
  };
});
