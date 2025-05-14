import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  
  return context;
};