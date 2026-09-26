import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../features/auth/AuthContext';

function ProtectedRoutes({children}) {
    const {token} = useContext(AuthContext);

    if(!token){
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoutes;