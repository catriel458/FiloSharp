import React, { createContext, useState, useEffect } from 'react';
// Removido import de api ya que no se usa actualmente
// import api from '../services/api.ts';

// Interfaz para el usuario
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

// Interfaz para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crear el contexto con valores por defecto
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Comprobar si el usuario ya está logueado
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.role === 'admin');
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      // Simulamos la autenticación con credenciales hardcodeadas
      if (email === 'admin' && password === 'admin') {
        // Usuario administrador hardcodeado
        const mockUser = {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        // Token simulado
        const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        
        // Guardar en localStorage
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Actualizar estado
        setToken(mockToken);
        setUser(mockUser);
        setIsAuthenticated(true);
        setIsAdmin(true);
        
        return;
      }
      
      // Si llega aquí, las credenciales son incorrectas
      throw new Error('Credenciales incorrectas');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      throw error;
    }
  };
  
  const register = async (username: string, email: string, _password: string) => {
    try {
      // En un entorno real, esto enviaría los datos al servidor
      // Aquí creamos un usuario simulado
      // Nota: _password prefijado con _ para indicar que no se usa actualmente
      const mockUser = {
        id: new Date().getTime(), // ID único basado en timestamp
        username,
        email,
        role: 'user' // Por defecto, los nuevos usuarios son regulares, no admin
      };
      
      // Token simulado
      const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
      
      // Guardar en localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Actualizar estado
      setToken(mockToken);
      setUser(mockUser);
      setIsAuthenticated(true);
      setIsAdmin(false); // No es admin
      
    } catch (error) {
      console.error('Error de registro:', error);
      throw error;
    }
  };
  
  const logout = () => {
    // Eliminar datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Actualizar estado
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };
  
  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;