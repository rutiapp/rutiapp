import { Navigate } from 'react-router-dom';
import AuthService from "../../services/auth.service";

export { PrivateRoute };

function PrivateRoute({ children }) {
    const auth = AuthService.getCurrentUser()
    
        if (!auth) {
            // not logged in so redirect to login page with the return url
            return <Navigate to="/" state={{ from: window.location }} />
        }
    
        // authorized so return child components
        return children;
}