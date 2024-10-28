import { routes } from './Routes'
import { useRoutes } from 'react-router-dom'

const AppRouter = () => {
    const isLogin = localStorage.getItem('isLogin');

    const filterRoutes = routes.filter(route => {

        if(route.is404){
            return true;
        }

        if(route.isPrivate && isLogin){
            return true;
        }

        return !route.isPrivate;
    })

    return useRoutes(filterRoutes)
}

export default AppRouter