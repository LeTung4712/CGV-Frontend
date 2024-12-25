import { routes } from "./Routes";
import { useRoutes } from "react-router-dom";

const AppRouter = () => {
  return useRoutes(routes);
};

export default AppRouter;
