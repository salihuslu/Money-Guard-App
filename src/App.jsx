import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { refreshUser } from './redux/Auth/operations';
import { selectToken } from './redux/Auth/selectors'

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));

const AppWrapper = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  console.log({ token })

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
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
