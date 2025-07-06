import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProductGrid from '../components/shop/ProductGrid';
import Filters from '../components/shop/Filters';
import { Product } from '../types'; // Importar el tipo compartido

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  
  const selectedCategory = searchParams.get('category');
  const selectedMaterial = searchParams.get('material');
  const selectedType = searchParams.get('type');
  
  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/products');
        const apiProducts: Product[] = response.data || [];
        
        setAllProducts(apiProducts);
        
        // Extraer valores únicos para filtros con tipado correcto
        const uniqueCategories: string[] = [...new Set(apiProducts.map((p: Product) => p.category))].filter(Boolean);
        const uniqueMaterials: string[] = [...new Set(apiProducts.map((p: Product) => p.material))].filter(Boolean);
        const uniqueTypes: string[] = [...new Set(apiProducts.map((p: Product) => p.type))].filter(Boolean);
        
        setCategories(uniqueCategories);
        setMaterials(uniqueMaterials);
        setTypes(uniqueTypes);
        
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('Error al cargar los productos. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Filtrar productos cuando cambien los parámetros de búsqueda
  useEffect(() => {
    if (allProducts.length === 0) return;
    
    let filteredProducts = [...allProducts];
    
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
    }
    
    if (selectedMaterial) {
      filteredProducts = filteredProducts.filter(p => p.material === selectedMaterial);
    }
    
    if (selectedType) {
      filteredProducts = filteredProducts.filter(p => p.type === selectedType);
    }
    
    setProducts(filteredProducts);
  }, [selectedCategory, selectedMaterial, selectedType, allProducts]);
  
  const handleCategoryChange = (category: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };
  
  const handleMaterialChange = (material: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (material) {
      newParams.set('material', material);
    } else {
      newParams.delete('material');
    }
    setSearchParams(newParams);
  };
  
  const handleTypeChange = (type: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (type) {
      newParams.set('type', type);
    } else {
      newParams.delete('type');
    }
    setSearchParams(newParams);
  };

  // Función para refrescar productos
  const refreshProducts = async () => {
    try {
      const response = await api.get('/products');
      const apiProducts: Product[] = response.data || [];
      setAllProducts(apiProducts);
    } catch (err) {
      console.error('Error al refrescar productos:', err);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Tienda</h1>
            
            {/* Botón para refrescar productos (opcional, para desarrollo) */}
            <button
              onClick={refreshProducts}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
              disabled={loading}
            >
              🔄 Actualizar productos
            </button>
          </div>

          {/* Mostrar mensaje de error si existe */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
              <button 
                onClick={refreshProducts}
                className="mt-2 text-sm underline hover:no-underline"
              >
                Intentar nuevamente
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filtros */}
            <div className="lg:col-span-1">
              <Filters
                categories={categories}
                materials={materials}
                types={types}
                selectedCategory={selectedCategory}
                selectedMaterial={selectedMaterial}
                selectedType={selectedType}
                onCategoryChange={handleCategoryChange}
                onMaterialChange={handleMaterialChange}
                onTypeChange={handleTypeChange}
              />
            </div>
            
            {/* Productos */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
                  <span className="ml-4 text-gray-600">Cargando productos...</span>
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="mb-4 text-sm text-gray-600">
                    Mostrando {products.length} de {allProducts.length} productos
                  </div>
                  <ProductGrid products={products} />
                </>
              ) : allProducts.length === 0 ? (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        No hay productos disponibles en este momento.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        No se encontraron productos con los filtros seleccionados.
                      </p>
                      <button
                        onClick={() => setSearchParams(new URLSearchParams())}
                        className="mt-2 text-sm underline hover:no-underline"
                      >
                        Limpiar filtros
                      </button>
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

export default Shop;