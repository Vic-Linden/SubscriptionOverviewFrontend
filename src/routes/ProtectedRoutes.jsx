import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../features/auth/AuthContext';

function ProtectedRoutes({ children, requiredRole }) {
    const { token } = useContext(AuthContext);

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole) {
        const decoded = jwtDecode(token);
        const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (userRole !== requiredRole) {
            return <Navigate to="/dashboard" />;
        }
    }

    return children;
}

export default ProtectedRoutes;