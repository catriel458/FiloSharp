import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Determinar qué enlace está activo según la ruta actual
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Clase para enlaces activos
  const activeClass = "bg-accent text-white";
  // Clase para enlaces inactivos
  const inactiveClass = "text-gray-800 hover:bg-gray-100";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Panel de Administración</h2>
      </div>

      <div className="p-4">
        <nav className="space-y-2">


          <Link
            to="/admin/products"
            className={`block px-4 py-2 rounded-md transition-colors ${isActive('/admin/products') ? activeClass : inactiveClass}`}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Productos
            </div>
          </Link>

        </nav>
      </div>
    </div>
  );
};

export default Sidebar;