import { Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  role: string;
}

function ProtectedRoute({ role }: ProtectedRouteProps) {
  return <Outlet></Outlet>;
}

export default ProtectedRoute;
