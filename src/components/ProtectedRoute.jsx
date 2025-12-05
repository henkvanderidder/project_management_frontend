
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  // If token exists, render the children components; otherwise, redirect to login  
  return token ? children : <Navigate to="/login" replace />;

}

export default ProtectedRoute;
