import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token || !role) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && !allowedRole.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
}
