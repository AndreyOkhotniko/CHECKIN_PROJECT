import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

interface ProtectedRouteProps {
  role: 'subj' | 'obj';
}

function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { user } = useAuthStore();

  if (user === null) return <Navigate to="/login" replace />;

  if (role === user.role) {
    return <Outlet></Outlet>;
  }
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
