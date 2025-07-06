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

// Interface para los errores de validación
interface FormErrors {
  [key: string]: string;
}

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  
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

  const isEditing = Boolean(id);
  
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.getById(parseInt(id!));
      
      setFormData({
        title: response.data.title || '',
        description: response.data.description || '',
        price: response.data.price || 0,
        image1: response.data.image1 || '',
        image2: response.data.image2 || '',
        category: response.data.category || '',
        material: response.data.material || '',
        type: response.data.type || ''
      });
      
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      setError('Error al cargar el producto. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validación del título
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
    }

    // Validación de la descripción
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    // Validación del precio
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    // Validación de la imagen principal
    if (!formData.image1.trim()) {
      newErrors.image1 = 'La imagen principal es obligatoria';
    } else if (!isValidUrl(formData.image1)) {
      newErrors.image1 = 'Debe ser una URL válida';
    }

    // Validación de la imagen secundaria (opcional)
    if (formData.image2.trim() && !isValidUrl(formData.image2)) {
      newErrors.image2 = 'Debe ser una URL válida';
    }

    // Validación de la categoría
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es obligatoria';
    }

    // Validación del material
    if (!formData.material.trim()) {
      newErrors.material = 'El material es obligatorio';
    }

    // Validación del tipo
    if (!formData.type.trim()) {
      newErrors.type = 'El tipo es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));

    // Limpiar el error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpiar mensajes previos
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      setError('Por favor, corrige los errores en el formulario');
      return;
    }
    
    try {
      setSubmitting(true);
      
      if (isEditing) {
        // Actualizar producto existente
        await api.put(`/products/${id}`, {
          ...formData,
          id: parseInt(id!)
        });
        setSuccess('Producto actualizado exitosamente');
      } else {
        // Crear nuevo producto
        await api.post('/products', formData);
        setSuccess('Producto creado exitosamente');
      }
      
      // Redirigir después de un breve delay para mostrar el mensaje de éxito
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
      
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      setError(isEditing ? 'Error al actualizar el producto' : 'Error al crear el producto');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h1>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a productos
            </button>
          </div>

          {/* Mensajes de éxito y error */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
              <strong className="font-bold">¡Éxito! </strong>
              <span className="block sm:inline">{success}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
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
                    {isEditing ? 'Información del Producto' : 'Nuevo Producto'}
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Título */}
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Título *
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-accent focus:border-accent ${
                              errors.title ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Nombre del producto"
                          />
                          {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                          )}
                        </div>
                        
                        {/* Precio */}
                        <div>
                          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Precio *
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
                              className={`block w-full pl-7 pr-12 rounded-md shadow-sm focus:ring-accent focus:border-accent ${
                                errors.price ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="0.00"
                            />
                          </div>
                          {errors.price && (
                            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Descripción */}
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Descripción *
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleChange}
                          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-accent focus:border-accent ${
                            errors.description ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Descripción detallada del producto (mínimo 10 caracteres)"
                        />
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Imagen 1 */}
                        <div>
                          <label htmlFor="image1" className="block text-sm font-medium text-gray-700">
                            Imagen Principal (URL) *
                          </label>
                          <input
                            type="url"
                            id="image1"
                            name="image1"
                            value={formData.image1}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-accent focus:border-accent ${
                              errors.image1 ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="https://ejemplo.com/imagen.jpg"
                          />
                          {errors.image1 && (
                            <p className="mt-1 text-sm text-red-600">{errors.image1}</p>
                          )}
                        </div>
                        
                        {/* Imagen 2 */}
                        <div>
                          <label htmlFor="image2" className="block text-sm font-medium text-gray-700">
                            Imagen Secundaria (URL)
                          </label>
                          <input
                            type="url"
                            id="image2"
                            name="image2"
                            value={formData.image2}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-accent focus:border-accent ${
                              errors.image2 ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="https://ejemplo.com/imagen2.jpg (opcional)"
                          />
                          {errors.image2 && (
                            <p className="mt-1 text-sm text-red-600">{errors.image2}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Categoría */}
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Categoría *
                          </label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-accent focus:border-accent ${
                              errors.category ? 'border-red-300' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Cuchillos de cocina">Cuchillos de cocina</option>
                            <option value="Sets">Sets</option>
                            <option value="Accesorios">Accesorios</option>
                            <option value="Cuchillos especializados">Cuchillos especializados</option>
                            <option value="Utensilios">Utensilios</option>
                            <option value="Tablas de cortar">Tablas de cortar</option>
                          </select>
                          {errors.category && (
                            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                          )}
                        </div>
                        
                        {/* Material */}
                        <div>
                          <label htmlFor="material" className="block text-sm font-medium text-gray-700">
                            Material *
                          </label>
                          <input
                            type="text"
                            id="material"
                            name="material"
                            value={formData.material}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-accent focus:border-accent ${
                              errors.material ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Ej: Acero inoxidable, Madera, etc."
                          />
                          {errors.material && (
                            <p className="mt-1 text-sm text-red-600">{errors.material}</p>
                          )}
                        </div>
                        
                        {/* Tipo */}
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Tipo *
                          </label>
                          <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-accent focus:border-accent ${
                              errors.type ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Ej: Cuchillo chef, Pelador, etc."
                          />
                          {errors.type && (
                            <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                          )}
                        </div>
                      </div>

                      {/* Vista previa de la imagen */}
                      {formData.image1 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vista previa
                          </label>
                          <div className="flex space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                src={formData.image1}
                                alt="Vista previa principal"
                                className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://via.placeholder.com/96x96?text=Error';
                                }}
                              />
                              <p className="text-xs text-gray-500 mt-1 text-center">Principal</p>
                            </div>
                            {formData.image2 && (
                              <div className="flex-shrink-0">
                                <img
                                  src={formData.image2}
                                  alt="Vista previa secundaria"
                                  className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/96x96?text=Error';
                                  }}
                                />
                                <p className="text-xs text-gray-500 mt-1 text-center">Secundaria</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-3 pt-6">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={submitting}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {isEditing ? 'Actualizando...' : 'Creando...'}
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
                            </>
                          )}
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