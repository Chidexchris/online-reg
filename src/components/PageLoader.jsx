import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

const PageLoader = () => {
    const location = useLocation();
    const { triggerLoading } = useLoading();

    useEffect(() => {
        triggerLoading(1000); // Show loader for 1 second on navigation
    }, [location.pathname]); // Trigger whenever the path changes

    return null;
};

export default PageLoader;
