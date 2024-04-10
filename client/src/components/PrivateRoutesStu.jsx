import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {
  const { newUser } = useSelector((state) => state.user);

  // Check if newUser exists and its category is equal to 1
  const shouldRenderOutlet = newUser && newUser.category === 2;

  return shouldRenderOutlet ? <Outlet /> : <Navigate to="/studentsigin" />;
}

export default PrivateRoutes;
