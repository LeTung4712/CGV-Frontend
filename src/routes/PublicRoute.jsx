import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { animateScroll } from 'react-scroll';

export const handleScrollToTop = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 0) {
        animateScroll.scrollToTop({
            duration: 300
        });
    }
}


const PublicRoute = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        handleScrollToTop()
    }, [location.pathname])
    
    return (
        <>{children}</>
    )
}

export default PublicRoute