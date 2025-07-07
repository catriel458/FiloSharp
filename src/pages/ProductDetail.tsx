import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SEO from '../components/SEO';

// Definimos el tipo del producto
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image1: string;
  image2?: string;
  category: string;
  material: string;
  type: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  
  // Utilizamos el contexto del carrito para acceder a sus funciones
  const { addItem } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      
      if (id) {
        try {
          const numericId = parseInt(id);
          const response = await api.getById(numericId);
          
          if (response.data) {
            setProduct(response.data);
            setActiveImage(response.data.image1);
            console.log("Producto encontrado:", response.data);
          } else {
            console.log("Producto no encontrado para ID:", numericId);
          }
        } catch (error) {
          console.error("Error al obtener producto:", error);
        }
      }
      
      setTimeout(() => {
        setLoading(false);
      }, 300);
    };

    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  
  // Modificamos el handleAddToCart para utilizar el contexto del carrito
  const handleAddToCart = () => {
    if (product) {
      // Añadimos el producto al carrito con la cantidad especificada
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image1
        });
      }
      
      // Mostrar notificación
      setShowNotification(true);
      
      // Cerrar notificación después de 3 segundos
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  // Función para generar SEO dinámico basado en el producto
  const generateSEOContent = (product: Product) => {
    const title = `${product.title} - ${product.category} | FiloSharp Cuchillos Artesanales`;
    
    const description = `${product.description} Material: ${product.material}. Precio: $${product.price.toLocaleString()}. Cuchillos artesanales de alta calidad con garantía FiloSharp.`;
    
    const keywords = `${product.title}, ${product.category}, ${product.material}, ${product.type}, cuchillos artesanales, FiloSharp, cuchillos forjados, acero damasco, cuchillos chef, cuchillería premium, comprar ${product.title}`;
    
    return { title, description, keywords };
  };
  
  if (loading) {
    return (
      <>
        {/* ✅ SEO COMPONENT - Loading state */}
        <SEO 
          title="Cargando producto... | FiloSharp Cuchillos Artesanales"
          description="Cargando información del producto. FiloSharp - Cuchillos artesanales de alta calidad forjados a mano."
          keywords="cuchillos artesanales, FiloSharp, cargando producto, cuchillos forjados"
        />
        
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        </div>
      </>
    );
  }
  
  if (!product) {
    return (
      <>
        {/* ✅ SEO COMPONENT - Product not found */}
        <SEO 
          title="Producto no encontrado | FiloSharp Cuchillos Artesanales"
          description="El producto que buscas no está disponible. Explora nuestra colección de cuchillos artesanales FiloSharp forjados a mano."
          keywords="producto no encontrado, cuchillos artesanales, FiloSharp, cuchillos forjados, tienda cuchillos"
        />
        
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <svg className="mx-auto h-16 w-16 text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
            <p className="text-gray-600 mb-8">El producto que estás buscando no existe o ha sido eliminado.</p>
            <Link 
              to="/shop" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Generar contenido SEO dinámico
  const seoContent = generateSEOContent(product);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ SEO COMPONENT - Dynamic product SEO */}
      <SEO 
        title={seoContent.title}
        description={seoContent.description}
        keywords={seoContent.keywords}
      />
      
      <Header />
      
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-red-600 transition-colors">Inicio</Link>
              </li>
              <li>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link to="/shop" className="hover:text-red-600 transition-colors">Tienda</Link>
              </li>
              <li>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="font-medium text-red-600">{product.title}</li>
            </ol>
          </nav>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0">
              {/* Sección de imágenes */}
              <div className="p-6 lg:p-8 bg-gray-50">
                <div className="aspect-square overflow-hidden rounded-xl bg-white flex items-center justify-center mb-4 border border-gray-200">
                  <img
                    src={activeImage}
                    alt={product.title}
                    className="object-contain h-full w-full p-4"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveImage(product.image1)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      activeImage === product.image1 
                        ? 'border-red-600 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={product.image1}
                      alt={`${product.title} - Vista principal`}
                      className="object-cover h-full w-full"
                    />
                  </button>
                  
                  {product.image2 && (
                    <button
                      onClick={() => setActiveImage(product.image2!)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        activeImage === product.image2 
                          ? 'border-red-600 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={product.image2}
                        alt={`${product.title} - Vista alternativa`}
                        className="object-cover h-full w-full"
                      />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Sección de información */}
              <div className="p-6 lg:p-8 flex flex-col">
                <div className="flex-grow">
                  <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">
                    {product.category}
                  </div>
                  
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {product.title}
                  </h1>
                  
                  <div className="flex items-center mb-6">
                    <span className="text-3xl font-bold text-red-600">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">(Incluye impuestos)</span>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Descripción</h2>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-1">Material</h3>
                      <p className="text-gray-600">{product.material}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-1">Tipo</h3>
                      <p className="text-gray-600">{product.type}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <label htmlFor="quantity" className="text-gray-700 font-medium">
                      Cantidad:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-12 text-center border-0 focus:ring-0"
                      />
                      <button 
                        onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleAddToCart}
                      className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Añadir al carrito
                    </button>
                    
                    <button
                      className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg shadow-sm transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Añadir a favoritos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <ProductsRelated currentProduct={product} />
        </div>
      </div>
      
      {/* Notificación cuando se añade un producto al carrito */}
      {showNotification && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Fondo oscuro */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            {/* Centrar el modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Contenido del modal */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white p-6">
                <div className="sm:flex sm:items-start">
                  {/* Icono de éxito */}
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  {/* Mensaje */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Producto añadido al carrito
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {product.title} ({quantity} {quantity === 1 ? 'unidad' : 'unidades'})
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowNotification(false)}
                  >
                    Aceptar
                  </button>
                  <Link
                    to="/cart"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Ver carrito
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

// Componente separado para productos relacionados
const ProductsRelated = ({ currentProduct }: { currentProduct: Product }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await api.get('/products');
        const allProducts = response.data;
        
        const related = allProducts
          .filter((p: Product) => p.category === currentProduct.category && p.id !== currentProduct.id)
          .slice(0, 4);
        
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">También te puede interesar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map(relatedProduct => (
          <Link 
            key={relatedProduct.id} 
            to={`/product/${relatedProduct.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square overflow-hidden">
              <img 
                src={relatedProduct.image1} 
                alt={relatedProduct.title} 
                className="object-cover w-full h-full transition-transform hover:scale-105" 
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{relatedProduct.title}</h3>
              <p className="text-red-600 font-bold">${relatedProduct.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;