import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

function PrivateRoute() {
  const { usuario } = useContext(AuthContext);

  return usuario?.token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
