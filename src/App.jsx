import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { refreshUser } from './redux/auth/operations';
import { selectToken } from './redux/auth/selectors'

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn, isRefreshing } = useSelector(state => state.auth);

  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [dispatch, token, isLoggedIn]);

  if (isRefreshing) return <p>Loading...</p>;

  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <RegistrationPage />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
};

export default App;
