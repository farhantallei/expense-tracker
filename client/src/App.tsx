import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AuthProvider, { useAuthContext } from './context/AuthContext';
import { Dashboard, Login } from './pages';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<RestrictedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function AuthRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated == null) return null;
  if (isAuthenticated) return <Navigate to="/" />;
  return <Outlet />;
}

function RestrictedRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated == null) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Outlet />;
}

export default App;
