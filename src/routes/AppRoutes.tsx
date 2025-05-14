import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.tsx';

// Páginas públicas
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Checkout from '../pages/Checkout';
import NotFound from '../pages/NotFound';

// Páginas de administrador
import AdminDashboard from '../pages/admin/Dashboard';
import AdminProducts from '../pages/admin/Products';
import ProductForm from '../pages/admin/ProductForm';
import AdminOrders from '../pages/admin/Orders';

// HOC para rutas protegidas
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  
  // Verificar si el usuario está autenticado
  if (!isAuthenticated) {
    // Redirigir a login con la ruta actual como "from"
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Verificar si se requiere el rol de administrador
  if (requiredRole === 'admin' && !isAdmin) {
    // Redirigir a la página principal si no es admin
    return <Navigate to="/" replace />;
  }
  
  // Si pasa todas las verificaciones, renderizar el componente hijo
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Ruta de checkout (protegida, requiere autenticación) */}
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } 
      />
      
      {/* Rutas de administrador (protegidas, requieren rol admin) */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/products" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminProducts />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/products/create" 
        element={
          <ProtectedRoute requiredRole="admin">
            <ProductForm />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/products/edit/:id" 
        element={
          <ProtectedRoute requiredRole="admin">
            <ProductForm />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/orders" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminOrders />
          </ProtectedRoute>
        } 
      />
      
      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;