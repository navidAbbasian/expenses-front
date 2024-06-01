import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import FetchLoading from '../components/shared/loadings/FetchLoading';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = ({ redirectPath = '/login', children }) => {
    const { isLoading } = useAuthContext();

    const token = Cookies.get('access_token');

    if (isLoading) {
        return <FetchLoading open={isLoading} />;
    }

    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default PrivateRoute;
