import React, { createContext, useState, useEffect } from 'react';

// Interfaz para un item del carrito
interface CartItem {
  id: number | string; // ✅ Permitir string para productos personalizados
  title: string;
  price: number;
  quantity: number;
  image: string;
  isCustom?: boolean; // ✅ AGREGAR: Identificar si es personalizado
  customSummary?: string; // ✅ AGREGAR: Descripción de la personalización
}

// Interfaz para el contexto del carrito
interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Crear el contexto con valores por defecto
export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    // Cargar carrito desde localStorage al inicializar
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);
  
  useEffect(() => {
    // Actualizar totalItems y totalPrice cuando cambian los items
    const newTotalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const newTotalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
    
    // Guardar carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Si el item ya existe, incrementar cantidad
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      // Si es un nuevo item, agregarlo con cantidad 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      updateQuantity, 
      removeItem, 
      clearCart, 
      totalItems, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};