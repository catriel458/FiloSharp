import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useContext(CartContext);
  const { isAuthenticated } = useAuth();
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow container-custom py-12 flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">
            Parece que aún no has añadido productos a tu carrito.
          </p>
          <Link
            to="/shop"
            className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
          >
            Ir a la Tienda
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Productos en el carrito */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Productos ({totalItems})</h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {items.map(item => (
                    <li key={item.id} className="p-6 flex flex-col sm:flex-row">
                      {/* Imagen */}
                      <div className="sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      
                      {/* Información */}
                      <div className="sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900">
                              <Link to={`/product/${item.id}`} className="hover:text-accent transition-colors">
                                {item.title}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Precio: ${item.price.toLocaleString()}
                            </p>
                          </div>
                          
                          {/* Precio total */}
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          {/* Control de cantidad */}
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => updateQuantity(Number(item.id), item.quantity - 1)}
                              className="text-gray-500 focus:outline-none focus:text-accent"
                              aria-label="Decrementar cantidad"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="mx-2 text-gray-700">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(Number(item.id), item.quantity + 1)}
                              className="text-gray-500 focus:outline-none focus:text-accent"
                              aria-label="Incrementar cantidad"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Botón eliminar */}
                          <button
                            type="button"
                            onClick={() => removeItem(Number(item.id))}
                            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Resumen de compra */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-6">Resumen de Compra</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">Calculado en el checkout</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-accent">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                
                {isAuthenticated ? (
                  <Link
                    to="/checkout"
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-4 rounded transition-colors block text-center"
                  >
                    Proceder al Pago
                  </Link>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      state={{ from: '/checkout' }}
                      className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-4 rounded transition-colors block text-center"
                    >
                      Iniciar Sesión para Continuar
                    </Link>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Debes iniciar sesión para completar tu compra
                    </p>
                  </div>
                )}
                
                <Link
                  to="/shop"
                  className="w-full mt-4 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded transition-colors block text-center"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;