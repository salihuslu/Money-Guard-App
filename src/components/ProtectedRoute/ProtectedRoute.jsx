import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refreshUser } from '../../redux/auth/operations';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isLoggedIn, token, isRefreshing } = useSelector(state => state.auth);

    useEffect(() => {
        if (token && !isLoggedIn) {
            dispatch(refreshUser());
        }
    }, [dispatch, token, isLoggedIn]);

    if (isRefreshing) return <p>Loading...</p>;

    if (!token) return <Navigate to="/" replace />;

    if (!isLoggedIn) return <p>Loading...</p>;

    return children;
};

export default ProtectedRoute;
