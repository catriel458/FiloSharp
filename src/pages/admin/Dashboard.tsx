import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';

// Definimos las interfaces necesarias
interface Product {
  id: number;
  title: string;
  price: number;
  image1: string;
  image2?: string;
  category: string;
  material: string;
  type: string;
  description: string;
}

interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items?: OrderItem[];
}

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  title?: string;
  image1?: string;
}

const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Para depuración
    console.log('AdminDashboard - Usuario:', user);
    console.log('AdminDashboard - Es Admin:', isAdmin);
    
    const fetchStats = async () => {
      try {
        // Simulamos obtener productos
        const productsRes = await api.get('/products');
        const products: Product[] = productsRes.data;
        setProducts(products);
        
        // Simulamos ordenes de ejemplo (en un escenario real vendrían de la API)
        const mockOrders: Order[] = [
          {
            id: 1001,
            user_id: 1,
            total_amount: 120,
            status: 'pendiente',
            created_at: '2025-05-01T10:00:00.000Z',
          },
          {
            id: 1002,
            user_id: 2,
            total_amount: 240,
            status: 'completado',
            created_at: '2025-04-30T15:30:00.000Z',
          },
          {
            id: 1003,
            user_id: 3,
            total_amount: 180,
            status: 'procesando',
            created_at: '2025-05-02T09:15:00.000Z',
          }
        ];
        
        setOrders(mockOrders);
        
        const pendingOrders = mockOrders.filter(order => order.status === 'pendiente');
        const revenue = mockOrders.reduce((sum, order) => sum + order.total_amount, 0);
        
        setStats({
          totalProducts: products.length,
          totalOrders: mockOrders.length,
          pendingOrders: pendingOrders.length,
          totalUsers: 10, // Valor ficticio
          revenue,
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [user, isAdmin]);
  
  // Calculamos los productos más vendidos (simulado)
  const topProducts = products.slice(0, 2).map((product, index) => ({
    ...product,
    sales: index === 0 ? 24 : 18,
    revenue: index === 0 ? 2880 : 2700
  }));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
            
            {/* Contenido principal */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Tarjetas de estadísticas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-500 text-sm">Productos</p>
                          <h3 className="font-bold text-2xl">{stats.totalProducts}</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 14l2 2 4-4" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-500 text-sm">Pedidos</p>
                          <h3 className="font-bold text-2xl">{stats.totalOrders}</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-500 text-sm">Pendientes</p>
                          <h3 className="font-bold text-2xl">{stats.pendingOrders}</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-500 text-sm">Ingresos</p>
                          <h3 className="font-bold text-2xl">${stats.revenue.toLocaleString()}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pedidos recientes */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Pedidos Recientes</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fecha
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Estado
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map(order => {
                            // Simulamos la información del cliente
                            const customerNames = ['Juan Pérez', 'María López', 'Carlos Rodríguez'];
                            const customerIndex = (order.user_id - 1) % customerNames.length;
                            const customerName = customerNames[customerIndex];
                            
                            return (
                              <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  #{order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {customerName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    order.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'procesando' ? 'bg-blue-100 text-blue-800' :
                                    order.status === 'enviado' ? 'bg-purple-100 text-purple-800' :
                                    order.status === 'completado' ? 'bg-green-100 text-green-800' :
                                    order.status === 'cancelado' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ${order.total_amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <a href="#" className="text-accent hover:text-accent/90 mr-3">Ver</a>
                                  <a href="#" className="text-gray-500 hover:text-gray-700">Editar</a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="px-6 py-4 border-t border-gray-200">
                      <a href="#" className="text-accent hover:text-accent/90 font-medium">
                        Ver todos los pedidos
                      </a>
                    </div>
                  </div>
                  
                  {/* Productos más vendidos */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Productos Más Vendidos</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Producto
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Precio
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ventas
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ingresos
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {topProducts.map(product => (
                            <tr key={product.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                      src={product.image1}
                                      alt={product.title}
                                      className="h-10 w-10 rounded object-cover"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {product.title}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${product.price.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.sales}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${product.revenue.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="px-6 py-4 border-t border-gray-200">
                      <a href="#" className="text-accent hover:text-accent/90 font-medium">
                        Ver todos los productos
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;