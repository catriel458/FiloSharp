import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import api from '../services/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProductGrid from '../components/shop/ProductGrid';
import Filters from '../components/shop/Filters';
import { Product } from '../types';

// Componente de paginación
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <nav 
      className="flex items-center justify-center space-x-2 mt-12"
      role="navigation"
      aria-label="Navegación de páginas de productos"
    >
      {/* Botón Anterior */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={`Ir a la página anterior (página ${currentPage - 1})`}
        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-accent hover:text-white border border-gray-300 hover:border-accent'
        }`}
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Números de página */}
      <div className="flex items-center space-x-1" role="group" aria-label="Páginas disponibles">
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500" aria-hidden="true">...</span>
            ) : (
              <button
                type="button"
                onClick={() => onPageChange(page as number)}
                aria-label={`Ir a la página ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Botón Siguiente */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={`Ir a la página siguiente (página ${currentPage + 1})`}
        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-accent hover:text-white border border-gray-300 hover:border-accent'
        }`}
      >
        <span className="hidden sm:inline">Siguiente</span>
        <svg 
          className="w-4 h-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  
  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // Puedes ajustar este número
  
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
    
    let filtered = [...allProducts];
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (selectedMaterial) {
      filtered = filtered.filter(p => p.material === selectedMaterial);
    }
    
    if (selectedType) {
      filtered = filtered.filter(p => p.type === selectedType);
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando cambien los filtros
  }, [selectedCategory, selectedMaterial, selectedType, allProducts]);
  
  // Calcular productos para la página actual
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setProducts(filteredProducts.slice(startIndex, endIndex));
  }, [currentPage, filteredProducts, productsPerPage]);
  
  // Calcular total de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave hacia arriba cuando cambies de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <>
      <SEO
        title="Tienda de Cuchillos Artesanales | FiloSharp"
        description="Explora nuestra colección completa de cuchillos artesanales. Cuchillos de chef, santoku, mondadores y más."
        keywords="tienda cuchillos, comprar cuchillos, cuchillos chef, cuchillería artesanal"
      />  
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-8" role="main">
          <div className="container-custom">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Tienda</h1>
              
              {/* Botón para refrescar productos (opcional, para desarrollo) */}
              <button
                type="button"
                onClick={refreshProducts}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
                disabled={loading}
                aria-label="Actualizar lista de productos"
              >
                🔄 Actualizar productos
              </button>
            </header>

            {/* Mostrar mensaje de error si existe */}
            {error && (
              <div 
                className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
                role="alert"
                aria-live="polite"
              >
                <p>{error}</p>
                <button 
                  type="button"
                  onClick={refreshProducts}
                  className="mt-2 text-sm underline hover:no-underline"
                  aria-label="Intentar cargar productos nuevamente"
                >
                  Intentar nuevamente
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filtros */}
              <aside className="lg:col-span-1" aria-label="Filtros de productos">
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
              </aside>
              
              {/* Productos */}
              <section 
                className="lg:col-span-3"
                aria-label="Lista de productos"
                aria-live="polite"
                
              >
                {loading ? (
                  <div 
                    className="flex justify-center items-center h-64"
                    role="status"
                    aria-label="Cargando productos"
                  >
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent" aria-hidden="true"></div>
                    <span className="ml-4 text-gray-600">Cargando productos...</span>
                    <span className="sr-only">Cargando productos de la tienda...</span>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <>
                    {/* Información de productos y paginación */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div 
                        className="text-sm text-gray-600 mb-2 sm:mb-0"
                        role="status"
                        aria-live="polite"
                      >
                        Mostrando {((currentPage - 1) * productsPerPage) + 1} - {Math.min(currentPage * productsPerPage, filteredProducts.length)} de {filteredProducts.length} productos
                        {allProducts.length !== filteredProducts.length && (
                          <span className="text-accent"> (filtrado de {allProducts.length} total)</span>
                        )}
                      </div>
                      
                      {totalPages > 1 && (
                        <div className="text-sm text-gray-600" aria-label={`Página actual ${currentPage} de ${totalPages}`}>
                          Página {currentPage} de {totalPages}
                        </div>
                      )}
                    </div>
                    
                    {/* Grid de productos */}
                    <div role="region" aria-label={`Productos página ${currentPage}`}>
                      <ProductGrid products={products} />
                    </div>
                    
                    {/* Componente de paginación */}
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : allProducts.length === 0 ? (
                  <div 
                    className="bg-blue-50 border-l-4 border-blue-400 p-4"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg 
                          className="h-5 w-5 text-blue-400" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          aria-hidden="true"
                        >
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
                  <div 
                    className="bg-yellow-50 border-l-4 border-yellow-400 p-4"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg 
                          className="h-5 w-5 text-yellow-400" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          No se encontraron productos con los filtros seleccionados.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSearchParams(new URLSearchParams())}
                          className="mt-2 text-sm underline hover:no-underline"
                          aria-label="Limpiar todos los filtros aplicados"
                        >
                          Limpiar filtros
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Shop;