import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.tsx';

// Páginas públicas
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Checkout from '../pages/Checkout';
import CustomKnife from '../pages/CustomKnife';
import About from '../pages/About';
import Contact from '../pages/Contact';
import KnifeTypes from '../pages/KnifeTypes';
import Profile from '../pages/Profile';
import Orders from '../pages/Orders';
import NotFound from '../pages/NotFound';

// Páginas de administrador
import AdminProducts from '../pages/admin/Products';
import ProductForm from '../pages/admin/ProductForm';


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
      <Route path="/shop" element={<Shop />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/custom" element={<CustomKnife />} />
      <Route path="/personalizar" element={<CustomKnife />} />
      <Route path="/about" element={<About />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/knife-types" element={<KnifeTypes />} />
      <Route path="/tipos-de-cuchillos" element={<KnifeTypes />} />
       
      {/* Rutas protegidas - requieren autenticación */}
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/pedidos" 
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } 
      />
       
      {/* Rutas de administrador (protegidas, requieren rol admin) */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <Navigate to="/admin/products" replace />
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
      
     
      

      
      {/* Redirecciones adicionales para URLs en español */}
      <Route path="/tienda" element={<Navigate to="/shop" replace />} />
      <Route path="/carrito" element={<Navigate to="/cart" replace />} />
      <Route path="/iniciar-sesion" element={<Navigate to="/login" replace />} />
      <Route path="/registrarse" element={<Navigate to="/register" replace />} />
      
      {/* Ruta 404 - debe ir al final */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;