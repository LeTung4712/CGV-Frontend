import { ROUTE } from "../constants/routes";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import DetailMovie from "../pages/Movie/DetailMovie";
import Ticket from "../pages/Movie/Ticket";
import PaymentPage from "../pages/Payment/PaymentPage";
import Login from "../pages/Auth/Login/Login";
import Logout from "../pages/Auth/logout/logout";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import History from "../pages/History/History";
import NotFound from "../pages/404/NotFound";

export const routes = [
  {
    path: ROUTE.LAYOUT,
    element: <Layout />,
    isPrivate: false,
    children: [
      { path: ROUTE.HOME, element: <Home /> },
      { path: ROUTE.MOVIE_DETAIL, element: <DetailMovie /> },
      { path: ROUTE.LOGIN, element: <Login /> },
      { path: ROUTE.REGISTER, element: <Register /> },
      { path: ROUTE.LOGOUT, element: <Logout /> },
    ],
  },
  {
    path: ROUTE.LAYOUT,
    element: <Layout />,
    isPrivate: true,
    children: [
      { path: ROUTE.TICKET, element: <Ticket /> },
      { path: ROUTE.HISTORY, element: <History /> },
      { path: ROUTE.AUTH_PAYMENT, element: <PaymentPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    is404: true,
  },
].map((route) => {
  if (route.is404) return route;

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
