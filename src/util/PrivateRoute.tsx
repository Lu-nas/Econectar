import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


function PrivateRoute() {
  const { usuario, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading){
    return <div className="p-4">Carregando...</div>;
  }

  if (!usuario?.token) {
    return(<Navigate to="/login" 
    state={{ from: location }} 
    replace/>
  );
}  
return <Outlet />; 
} 
export default PrivateRoute;
