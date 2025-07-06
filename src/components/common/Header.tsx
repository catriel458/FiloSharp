import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Header: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  const { items, totalItems, totalPrice, removeItem } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Debugging
  console.log('Header - Auth State:', { isAuthenticated, isAdmin, user });
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (profileMenuOpen) setProfileMenuOpen(false);
    if (cartMenuOpen) setCartMenuOpen(false);
  };
  
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
    if (cartMenuOpen) setCartMenuOpen(false);
    if (mobileMenuOpen && window.innerWidth < 768) setMobileMenuOpen(false);
  };

  // Función para abrir o cerrar manualmente el menú del carrito
  const toggleCartMenu = () => {
    setCartMenuOpen(!cartMenuOpen);
    if (profileMenuOpen) setProfileMenuOpen(false);
    if (mobileMenuOpen && window.innerWidth < 768) setMobileMenuOpen(false);
  };
  
  // Manejador para ir al panel de admin - CORREGIDO
  const handleAdminPanel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Verificar permisos
    if (isAuthenticated && isAdmin) {
       navigate('/admin/products');
    } else {
      console.log('No tiene permisos para acceder al panel de admin');
      navigate('/login');
    }
  };
  
  return (
    <header className="bg-primary text-white">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            FILO
            <span className="text-accent ml-1">SHARP</span>
          </Link>
          
          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-accent transition-colors">Inicio</Link>
            <Link to="/shop" className="hover:text-accent transition-colors">Tienda</Link>
            <Link to="/knife-types" className="hover:text-accent transition-colors">Tipos de Cuchillos</Link>
            <Link to="/about" className="hover:text-accent transition-colors">Nosotros</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contacto</Link>
            {isAuthenticated && isAdmin && (
              <button 
                type="button"
                onClick={handleAdminPanel}
                className="hover:text-accent transition-colors font-medium"
              >
                Panel Admin
              </button>
            )}
          </nav>
          
          {/* Acciones */}
          <div className="flex items-center space-x-4">
            {/* Carrito */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleCartMenu}
                className="relative hover:text-accent transition-colors flex items-center"
                aria-expanded={cartMenuOpen ? 'true' : 'false'}
                aria-haspopup="true"
                aria-label="Carrito de compras"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              
              {/* Vista previa del carrito */}
              {cartMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-primary rounded shadow-lg z-20">
                  <div className="py-3 px-4 border-b border-gray-100">
                    <p className="font-medium">Tu Carrito ({totalItems})</p>
                  </div>

                  {items.length === 0 ? (
                    <div className="py-6 px-4 text-center">
                      <p className="text-gray-500 text-sm">Tu carrito está vacío</p>
                      <Link 
                        to="/shop" 
                        className="mt-4 block text-accent hover:underline text-sm font-medium"
                        onClick={() => setCartMenuOpen(false)}
                      >
                        Ir a la tienda
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                        {items.map(item => (
                          <div key={item.id} className="py-3 px-4 flex items-start">
                            <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="h-full w-full object-cover" 
                              />
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between">
                                <Link 
                                  to={`/product/${item.id}`}
                                  className="text-sm font-medium text-gray-900 hover:text-accent truncate"
                                  onClick={() => setCartMenuOpen(false)}
                                >
                                  {item.title}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.id)}
                                  className="text-xs text-red-500 hover:text-red-700 ml-2"
                                  aria-label={`Eliminar ${item.title} del carrito`}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-gray-500">{item.quantity} x ${item.price.toLocaleString()}</p>
                                <p className="text-xs font-medium">${(item.quantity * item.price).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 border-t border-gray-100">
                        <div className="flex justify-between font-medium text-sm mb-2">
                          <span>Total:</span>
                          <span>${totalPrice.toLocaleString()}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            to="/cart"
                            className="bg-gray-800 hover:bg-gray-900 text-white text-center py-2 px-4 rounded text-sm font-medium"
                            onClick={() => setCartMenuOpen(false)}
                          >
                            Ver Carrito
                          </Link>
                          <Link
                            to="/checkout"
                            className="bg-accent hover:bg-accent/90 text-white text-center py-2 px-4 rounded text-sm font-medium"
                            onClick={() => setCartMenuOpen(false)}
                          >
                            Checkout
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Usuario */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-1"
                  aria-expanded={profileMenuOpen ? 'true' : 'false'}
                  aria-haspopup="true"
                  aria-label="Menú de usuario"
                >
                  <span>{user?.username}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-primary rounded shadow-lg z-20">
                    <div className="py-1">
                      {/* Info del usuario */}
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium">{user?.username}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      
                     
                      
                      {isAdmin && (
                        <>
                          <div className="border-t border-gray-100 my-1"></div>
                      
                          
                  
                        </>
                      )}
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="hover:text-accent transition-colors">
                  Iniciar Sesión
                </Link>
                <span>/</span>
                <Link to="/register" className="hover:text-accent transition-colors">
                  Registrarse
                </Link>
              </div>
            )}
            
            {/* Menú móvil */}
            <button
              type="button"
              className="md:hidden focus:outline-none"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen ? 'true' : 'false'}
              aria-controls="mobile-menu"
              aria-label="Abrir menú de navegación"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Inicio
              </Link>
              <Link to="/shop" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Tienda
              </Link>
              <Link to="/knife-types" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Tipos de Cuchillos
              </Link>
              <Link to="/about" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Nosotros
              </Link>
              <Link to="/contact" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contacto
              </Link>
              
          
              
              {!isAuthenticated && (
                <div className="pt-2 border-t border-gray-700">
                  <Link to="/login" className="block py-2 hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="block py-2 hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Registrarse
                  </Link>
                </div>
              )}
              
              {isAuthenticated && (
                <div className="pt-2 border-t border-gray-700">
                  <Link to="/profile" className="block py-2 hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Mi Perfil
                  </Link>
                  <Link to="/orders" className="block py-2 hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Mis Pedidos
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block py-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;