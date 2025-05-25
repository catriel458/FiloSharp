import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from './Sidebar';

// Interface para los datos del formulario
interface FormData {
  title: string;
  description: string;
  price: number;
  image1: string;
  image2: string;
  category: string;
  material: string;
  type: string;
}

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: 0,
    image1: '',
    image2: '',
    category: '',
    material: '',
    type: ''
  });
  
  useEffect(() => {
    // Si hay un ID, estamos editando un producto existente
    if (id) {
      const fetchProduct = async () => {
        try {
          // Usamos getById para obtener el producto por su ID
          const response = await api.getById(parseInt(id));
          
          // Actualizamos el estado del formulario con los datos del producto
          setFormData({
            title: response.data.title,
            description: response.data.description,
            price: response.data.price,
            image1: response.data.image1,
            image2: response.data.image2 || '',
            category: response.data.category,
            material: response.data.material,
            type: response.data.type
          });
          
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener el producto:', error);
          setLoading(false);
        }
      };
      
      fetchProduct();
    }
  }, [id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (id) {
        // Actualizar producto existente
        await api.put(`/products/${id}`, {
          ...formData,
          id: parseInt(id)
        });
      } else {
        // Crear nuevo producto
        await api.post('/products', formData);
      }
      
      // Redirigir a la lista de productos
      navigate('/admin/products');
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">
            {id ? 'Editar Producto' : 'Crear Nuevo Producto'}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
            
            {/* Contenido principal */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold mb-4">
                    {id ? 'Información del Producto' : 'Nuevo Producto'}
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Título */}
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Título
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                          />
                        </div>
                        
                        {/* Precio */}
                        <div>
                          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Precio
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              id="price"
                              name="price"
                              min="0"
                              step="0.01"
                              value={formData.price}
                              onChange={handleChange}
                              required
                              className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-accent focus:ring-accent"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Descripción */}
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Descripción
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Imagen 1 */}
                        <div>
                          <label htmlFor="image1" className="block text-sm font-medium text-gray-700">
                            Imagen Principal (URL)
                          </label>
                          <input
                            type="text"
                            id="image1"
                            name="image1"
                            value={formData.image1}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                          />
                        </div>
                        
                        {/* Imagen 2 */}
                        <div>
                          <label htmlFor="image2" className="block text-sm font-medium text-gray-700">
                            Imagen Secundaria (URL)
                          </label>
                          <input
                            type="text"
                            id="image2"
                            name="image2"
                            value={formData.image2}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Categoría */}
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Categoría
                          </label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Cuchillos de cocina">Cuchillos de cocina</option>
                            <option value="Sets">Sets</option>
                            <option value="Accesorios">Accesorios</option>
                            <option value="Cuchillos especializados">Cuchillos especializados</option>
                          </select>
                        </div>
                        
                        {/* Material */}
                        <div>
                          <label htmlFor="material" className="block text-sm font-medium text-gray-700">
                            Material
                          </label>
                          <input
                            type="text"
                            id="material"
                            name="material"
                            value={formData.material}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                          />
                        </div>
                        
                        {/* Tipo */}
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Tipo
                          </label>
                          <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => navigate('/admin/products')}
                          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent/90 focus:outline-none"
                        >
                          {id ? 'Actualizar' : 'Crear'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductForm;