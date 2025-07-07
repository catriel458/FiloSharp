import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/SEO';
import ProductGrid from '../components/shop/ProductGrid';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Product } from '../types';

// Componente para el carrusel
const Carousel = ({ images }: { images: string[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      role="region"
      aria-label="Carrusel de imágenes destacadas"
      aria-live="polite"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${index === currentSlide
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-105'
            }`}
          {...(index !== currentSlide && { 'aria-hidden': 'true' })}
        >
          <img
            src={image}
            alt={`Imagen ${index + 1} de ${images.length}: Cuchillos artesanales de alta calidad`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay con degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" aria-hidden="true" />

      {/* Controles del carrusel */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10"
        role="group"
        aria-label="Controles del carrusel"
      >
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Ir a la imagen ${index + 1} de ${images.length}`}
            aria-current={index === currentSlide ? "true" : "false"}
            aria-describedby={`slide-${index}`}
            className={`transition-all duration-300 ${index === currentSlide
              ? 'w-12 h-3 bg-accent rounded-full'
              : 'w-3 h-3 bg-white/60 rounded-full hover:bg-white/80'
              }`}
          />
        ))}
      </div>

      {/* Texto descriptivo oculto para lectores de pantalla */}
      {images.map((_, index) => (
        <div
          key={`desc-${index}`}
          id={`slide-${index}`}
          className="sr-only"
        >
          {index === currentSlide ? 'Imagen actual' : 'Imagen inactiva'}
        </div>
      ))}
    </div>
  );
};

interface VisibilityState {
  features?: boolean;
  process?: boolean;
  products?: boolean;
  testimonials?: boolean;
  [key: string]: boolean | undefined;
}

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  // Observador para animaciones al scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    // Observar elementos con animación
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // REEMPLAZAR con:
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        const allProducts = response.data || [];

        const randomProducts = [...allProducts]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        setFeaturedProducts(randomProducts);
      } catch (error) {
        console.error('Error al cargar productos destacados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // URLs de imágenes actualizadas para el carrusel
  const carouselImages = [
    'https://images.unsplash.com/photo-1569606665155-6f0c90944f28?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1611605377578-594f5bcf3e97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGtuaWZlJTIwYXJ0ZXNhbmFsfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1653638601173-63729980bfba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1615063053421-e8cd1d71d5f2?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  const forgingImages = [
    'https://images.unsplash.com/photo-1602063239056-b531b101065d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1537557209696-c595cc42018d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  const testimonials = [
    {
      name: "Chef Marco Rossi",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "El mejor cuchillo que he tenido en mi vida. La calidad es excepcional y el balance perfecto. Una verdadera obra de arte.",
      role: "Chef Ejecutivo, Ristorante Milano"
    },
    {
      name: "David Thompson",
      image: "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww",
      text: "La atención al detalle es impresionante. Se nota que cada cuchillo está hecho con amor y dedicación.",
      role: "Chef de Sushi, Tokyo House"
    },
    {
      name: "Ana Martínez",
      image: "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Invertir en estos cuchillos fue la mejor decisión. Después de 5 años siguen como nuevos.",
      role: "Chef Pastelera"
    }
  ];

  return (
    <>
      {/* ✅ SEO COMPONENT */}
      <SEO
        title="FiloSharp - Cuchillos Artesanales de Alta Calidad"
        description="Descubre la excelencia en cuchillería artesanal. Cuchillos únicos forjados a mano por maestros artesanos con más de 30 años de experiencia. Materiales premium, garantía de por vida."
        keywords="cuchillos artesanales, cuchillos forjados, acero damasco, cuchillos chef, cuchillería premium, FiloSharp, cuchillos a mano, garantía de por vida"
      />
      <div className="flex flex-col min-h-screen bg-secondary/5">
        <Header />

        <main className="flex-grow" role="main">
          {/* Hero Section con Carrusel */}
          <section className="relative" aria-label="Sección principal">
            <Carousel images={carouselImages} />

            {/* Contenido del Hero */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container-custom text-center text-white px-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-fade-in">
                    CUCHILLOS<br />ARTESANALES
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-200 animate-fade-in-delay">
                    Forjados con pasión, diseñados para durar toda la vida
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 animate-fade-in-delay-2">
                    <Link
                      to="/shop"
                      className="bg-accent hover:bg-accent/90 text-white font-semibold px-10 py-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      aria-label="Explorar nuestra colección de cuchillos artesanales"
                    >
                      Explorar Colección
                    </Link>
                    <Link
                      to="/custom"
                      className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-xl"
                      aria-label="Personalizar tu cuchillo artesanal"
                    >
                      Personalizar Cuchillo
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Flecha de scroll */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
              <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </section>

          {/* Sección: Por qué elegirnos */}
          <section 
            id="features" 
            className="py-24 bg-white animate-on-scroll"
            aria-labelledby="features-heading"
          >
            <div className="container-custom">
              <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                  ¿POR QUÉ ELEGIRNOS?
                </h2>
                <p className="text-xl text-secondary max-w-3xl mx-auto">
                  Cada cuchillo es una obra maestra, creada con técnicas ancestrales y tecnología moderna
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10" role="list" aria-label="Lista de características principales">
                {[
                  {
                    title: "MATERIALES PREMIUM",
                    description: "Acero de Damasco, maderas exóticas y metales preciosos seleccionados cuidadosamente",
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )
                  },
                  {
                    title: "FORJADO ARTESANAL",
                    description: "Cada pieza es forjada a mano por maestros artesanos con décadas de experiencia",
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    )
                  },
                  {
                    title: "GARANTÍA DE POR VIDA",
                    description: "Respaldamos cada cuchillo con nuestra garantía de satisfacción y servicio de mantenimiento",
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    )
                  }
                ].map((feature, index) => (
                  <article
                    key={index}
                    className={`bg-gray-50 p-8 rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                    role="listitem"
                  >
                    <div 
                      className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 mx-auto transform transition-transform duration-300 hover:rotate-12"
                      aria-hidden="true"
                    >
                      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {feature.icon}
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-4">{feature.title}</h3>
                    <p className="text-secondary text-center">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Sección de Proceso */}
          <section 
            id="process" 
            className="py-24 bg-primary text-white animate-on-scroll"
            aria-labelledby="process-heading"
          >
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className={`transition-all duration-1000 ${isVisible.process ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <h2 id="process-heading" className="text-4xl md:text-5xl font-bold mb-8">
                    PROCESO DE CREACIÓN
                  </h2>
                  <p className="text-xl mb-12 text-gray-300">
                    Cada cuchillo pasa por un meticuloso proceso de 40 pasos que puede tomar hasta 100 horas de trabajo manual.
                  </p>
                  <ol className="space-y-8" role="list" aria-label="Pasos del proceso de creación">
                    {[
                      {
                        title: "Selección de Materiales",
                        description: "Elegimos los mejores aceros y maderas para cada pieza"
                      },
                      {
                        title: "Forjado y Templado",
                        description: "Calentamiento, martillado y templado preciso para máxima durabilidad"
                      },
                      {
                        title: "Afilado y Pulido",
                        description: "Múltiples etapas de afilado hasta alcanzar el filo perfecto"
                      }
                    ].map((step, index) => (
                      <li
                        key={index}
                        className="flex items-start group"
                        style={{ transitionDelay: `${index * 200}ms` }}
                        role="listitem"
                      >
                        <div 
                          className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                          aria-label={`Paso ${index + 1}`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className={`relative transition-all duration-1000 ${isVisible.process ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  <div className="relative overflow-hidden rounded-xl shadow-2xl">
                    <img
                      src={forgingImages[0]}
                      alt="Artesano forjando un cuchillo en el taller, mostrando el proceso tradicional de creación"
                      className="w-full h-auto transform transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"></div>
                  </div>
                  <div className="absolute -bottom-8 -left-8 bg-accent text-white p-8 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105">
                    <p className="text-4xl font-bold" aria-label="Más de 100 horas de trabajo">100+</p>
                    <p className="text-lg">Horas de trabajo</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Productos Destacados */}
          <section 
            id="products" 
            className="py-24 bg-white animate-on-scroll"
            aria-labelledby="products-heading"
          >
            <div className="container-custom">
              <div className={`flex justify-between items-center mb-16 transition-all duration-1000 ${isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 id="products-heading" className="text-4xl md:text-5xl font-bold text-primary">
                  COLECCIÓN DESTACADA
                </h2>
                <Link
                  to="/shop"
                  className="font-semibold text-accent hover:text-accent/80 transition-colors flex items-center group"
                  aria-label="Ver todos los productos de nuestra colección"
                >
                  Ver Todos
                  <svg 
                    className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64" role="status" aria-label="Cargando productos">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent" aria-hidden="true"></div>
                  <span className="sr-only">Cargando productos destacados...</span>
                </div>
              ) : (
                <div className={`transition-all duration-1000 ${isVisible.products ? 'opacity-100' : 'opacity-0'}`}>
                  <ProductGrid products={featuredProducts} />
                </div>
              )}
            </div>
          </section>

          {/* Testimonios */}
          <section 
            id="testimonials" 
            className="py-24 bg-gray-50 animate-on-scroll"
            aria-labelledby="testimonials-heading"
          >
            <div className="container-custom">
              <h2 
                id="testimonials-heading"
                className={`text-4xl md:text-5xl font-bold text-center mb-16 text-primary transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                LO QUE DICEN NUESTROS CLIENTES
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10" role="list" aria-label="Testimonios de clientes">
                {testimonials.map((testimonial, index) => (
                  <article
                    key={index}
                    className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                    role="listitem"
                  >
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image}
                        alt={`Foto de perfil de ${testimonial.name}`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-sm text-secondary">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4" role="img" aria-label="Calificación de 5 estrellas">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className="w-5 h-5 text-accent" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-secondary italic">
                      "{testimonial.text}"
                    </blockquote>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-24 bg-gradient-to-r from-primary to-primary/90 text-white relative overflow-hidden" aria-labelledby="cta-heading">
            {/* Patrón de fondo */}
            <div className="absolute inset-0 opacity-5" aria-hidden="true">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="container-custom text-center relative z-10">
              <div className="max-w-3xl mx-auto">
                <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold mb-6">
                  ¿LISTO PARA EXPERIMENTAR LA EXCELENCIA?
                </h2>
                <p className="text-xl mb-12">
                  Descubre cómo un cuchillo artesanal puede transformar tu experiencia en la cocina
                </p>
                <div className="flex flex-wrap justify-center gap-6" role="group" aria-label="Acciones principales">
                  <Link
                    to="/shop"
                    className="bg-white text-primary hover:bg-gray-100 font-semibold px-10 py-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    aria-label="Ver nuestra colección completa de cuchillos"
                  >
                    Ver Colección
                  </Link>
                  <Link
                    to="/contact"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-xl"
                    aria-label="Contactar con nuestro equipo de expertos"
                  >
                    Contactar
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;