import { ROUTE } from '../constants/routes';
import Layout from '../components/Layout';
import Home from '../pages/Home/Home';
import DetailMovie from '../pages/Movie/DetailMovie';
//import Test from '../pages/Home/test';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const routes = [
    {
        path: ROUTE.LAYOUT,
        element: <Layout />,
        isPrivate: false,
        children: [
            { path: ROUTE.HOME, element: <Home /> },
            { path: ROUTE.MOVIE_DETAIL, element: <DetailMovie /> },
        ]
    },
    {
        path: ROUTE.LAYOUT,
        element: <Layout />,
        isPrivate: true,
        children: [
            
        ]
    },
    
].map(route => {

    if (route.isPrivate) {
        return {
            ...route,
            element: <PrivateRoute>{route.element}</PrivateRoute>
        }
    }

    return {
        ...route,
        element: <PublicRoute>{route.element}</PublicRoute>
    }
})