import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refreshUser } from '../../redux/Auth/operations';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isLoggedIn, token, isRefreshing } = useSelector(state => state.auth);

    useEffect(() => {
        if (token && !isLoggedIn) {
            dispatch(refreshUser());
        }
    }, [dispatch, token, isLoggedIn]);

    if (isRefreshing) return <p>Loading...</p>;

    if (!isLoggedIn && !token) return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;
