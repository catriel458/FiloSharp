import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SEO from '../components/SEO';

interface VisibilityState {
  history?: boolean;
  values?: boolean;
  artisans?: boolean;
  workshop?: boolean;
  [key: string]: boolean | undefined;
}

const About: React.FC = () => {
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

  // Equipo de maestros artesanos
  const artisans = [
    {
      name: "Diego Ramírez",
      role: "Maestro Forjador",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Con más de 25 años de experiencia, Diego lidera nuestro equipo de forja. Su precisión y conocimiento de las aleaciones son incomparables.",
      specialty: "Acero de Damasco"
    },
    {
      name: "María González",
      role: "Experta en Mangos",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "María trabaja con las maderas más exclusivas del mundo para crear mangos ergonómicos y estéticamente impresionantes.",
      specialty: "Maderas Exóticas"
    },
    {
      name: "Javier Mendoza",
      role: "Maestro Afilador",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "El arte del afilado tradicional japonés es la especialidad de Javier, capaz de lograr filos que cortan con precisión milimétrica.",
      specialty: "Técnica Honbazuke"
    }
  ];

  // Valores de la empresa
  const values = [
    {
      title: "Artesanía",
      description: "Creemos que el trabajo manual y el tiempo dedicado a cada pieza no tienen sustituto. Cada cuchillo pasa por decenas de pasos realizados a mano por nuestros maestros artesanos.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      )
    },
    {
      title: "Excelencia",
      description: "No ponemos un cuchillo en manos de un cliente hasta que ha pasado nuestros rigurosos estándares de calidad. Si no es perfecto, no sale de nuestro taller.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      )
    },
    {
      title: "Tradición",
      description: "Honramos técnicas centenarias de forjado y templado, manteniendo viva la tradición de generaciones de artesanos cuchilleros.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      )
    },
    {
      title: "Innovación",
      description: "Aunque respetamos la tradición, no tememos implementar nuevas tecnologías y métodos cuando mejoran la calidad final del producto.",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ SEO COMPONENT - About page */}
      <SEO 
        title="Nuestra Historia - FiloSharp | 45 Años Forjando Tradición y Excelencia"
        description="Descubre la historia de FiloSharp desde 1978. Conoce a nuestros maestros artesanos, nuestros valores y el taller donde nacen cuchillos únicos. 45 años de tradición, artesanía y excelencia en La Plata, Buenos Aires."
        keywords="historia FiloSharp, maestros artesanos, taller cuchillos La Plata, tradición cuchillería, Antonio Mendoza fundador, Diego Ramírez forjador, María González mangos, Javier Mendoza afilado, acero damasco, técnica honbazuke, maderas exóticas, 45 años experiencia"
      />
      
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5e38cfe4e171696bc55e8000/1598842620989-G0INFCLYET70WKGTH8R9/lost+arts+knife+grinding"
              alt="Taller de cuchillos artesanales"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative container-custom h-full flex flex-col justify-center text-white">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">NUESTRA HISTORIA</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Desde 1978, forjando tradición y excelencia en cada hoja
              </p>
            </div>
          </div>
        </section>

        {/* Historia y Misión */}
        <section id="history" className="py-24 bg-white animate-on-scroll">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className={`transition-all duration-1000 ${isVisible.history ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    NUESTRA HISTORIA
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-8 text-primary">
                  45 AÑOS DE PASIÓN POR EL ACERO
                </h2>
                <div className="prose prose-lg max-w-none text-secondary">
                  <p>
                    Fundada en 1978 por el maestro cuchillero Antonio Mendoza, nuestra empresa nació de la pasión por crear herramientas que fueran tanto funcionales como hermosas. Lo que comenzó como un pequeño taller en La Plata, se ha convertido en una referencia internacional en cuchillos artesanales.
                  </p>
                  <p>
                    A través de tres generaciones, hemos mantenido vivas las técnicas tradicionales de forjado, mientras adaptamos nuestros métodos a las exigencias de los chefs modernos. Cada cuchillo que sale de nuestro taller cuenta una historia de dedicación, precisión y respeto por la materia prima.
                  </p>
                  <p className="font-semibold text-primary">
                    Hoy, nuestros cuchillos son utilizados por chefs de renombre mundial y entusiastas de la cocina que aprecian la diferencia que hace una herramienta verdaderamente excepcional.
                  </p>
                </div>
              </div>

              <div className={`relative transition-all duration-1000 ${isVisible.history ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqUbuYQls2Xjc5Qgkwaw0daPzgzovKHC56Pw&s"
                        alt="Forjado tradicional"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTS3_DHUKBUvc83Y8tNmP26MYYOkAzeEPvFg&s"
                        alt="Detalle de cuchillo"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://bpsknives.com/wp-content/uploads/2024/03/3-10.jpg"
                        alt="Cuchillo terminado"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://cdn-ilahfkn.nitrocdn.com/YHEQKOprmqfhDiCZIBAzbCbpumRPMhkw/assets/images/optimized/rev-451383b/nobliecustomknives.com/wp-content/uploads/2024/09/10-easy-steps-to-Master-Japanese-Knife-Care.jpg"
                        alt="Afilado tradicional"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 bg-accent text-white p-8 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105">
                  <p className="text-4xl font-bold">45+</p>
                  <p className="text-lg">Años de tradición</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section id="values" className="py-24 bg-gray-50 animate-on-scroll">
          <div className="container-custom">
            <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                NUESTROS VALORES
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                PRINCIPIOS QUE NOS GUÍAN
              </h2>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                Estos valores son el corazón de nuestra filosofía. Cada decisión que tomamos está guiada por ellos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 hover:rotate-12">
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {value.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-primary">{value.title}</h3>
                  <p className="text-secondary">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nuestro Taller */}
        <section id="workshop" className="py-24 animate-on-scroll">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className={`sticky top-24 transition-all duration-1000 ${isVisible.workshop ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    NUESTRO TALLER
                  </span>
                  <h2 className="text-4xl font-bold mb-8 text-primary">
                    DONDE NACE LA MAGIA
                  </h2>
                  <div className="prose prose-lg text-secondary">
                    <p>
                      En el corazón de La Plata, nuestro taller es un santuario donde tradición y artesanía se encuentran. Cada estación de trabajo está diseñada para que nuestros artesanos puedan dar vida a verdaderas obras de arte funcionales.
                    </p>
                    <p>
                      Las fraguas, los yunques y las piedras de afilar comparten espacio con equipos de alta precisión, permitiéndonos mantener estándares consistentes sin comprometer la esencia artesanal de nuestro trabajo.
                    </p>
                    <p>
                      Visitantes de todo el mundo nos visitan para conocer de primera mano cómo nacen nuestros cuchillos, en tours guiados que ofrecemos previa reserva.
                    </p>
                  </div>
                  <div className="mt-8">
                    <Link
                      to="/contact"
                      className="inline-flex items-center bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                      Reservar Visita
                      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 ${isVisible.workshop ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  <div className="col-span-2">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://fc-abogados.com/wp-content/uploads/2020/08/workshop-4863393_960_720-1.jpg"
                        alt="Vista general del taller"
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="mt-2 text-sm text-secondary italic">Nuestro taller principal, donde cada cuchillo comienza su viaje</p>
                  </div>
                  <div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY0AyaglCjf_fgyN31yBlf0in3WzUt5-M38A&s"
                        alt="Proceso de forjado"
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="mt-2 text-sm text-secondary italic">Forjado manual, donde el acero toma forma</p>
                  </div>
                  <div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://i.ytimg.com/vi/hObCSjAg71M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAZWjMrlf-vEVK0mNoksxplcZcF8w"
                        alt="Detalle de trabajo manual"
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="mt-2 text-sm text-secondary italic">El templado, donde el cuchillo adquiere su dureza característica</p>
                  </div>
                  <div className="col-span-2">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="https://cuchillosnuestros.com/wp-content/uploads/2024/10/Cuchillo-Forjado-2-1.jpg"
                        alt="Cuchillos terminados"
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="mt-2 text-sm text-secondary italic">Cuchillos terminados, listos para inspección final</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Artesanos */}
        <section id="artisans" className="py-24 bg-primary text-white animate-on-scroll">
          <div className="container-custom">
            <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.artisans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-4">
                NUESTROS ARTESANOS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                EL EQUIPO DETRÁS DE CADA CUCHILLO
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Nuestro equipo de maestros artesanos combina décadas de experiencia con pasión y dedicación.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {artisans.map((artisan, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur rounded-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isVisible.artisans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="mb-6 relative">
                    <div className="aspect-square rounded-full overflow-hidden mb-6 border-4 border-accent/80">
                      <img
                        src={artisan.image}
                        alt={artisan.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-1">{artisan.name}</h3>
                      <p className="text-gray-300 mb-2">{artisan.role}</p>
                      <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                        Especialidad: {artisan.specialty}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    {artisan.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 bg-white">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-primary">
                DESCUBRE LA DIFERENCIA DE UN VERDADERO CUCHILLO ARTESANAL
              </h2>
              <p className="text-xl mb-12 text-secondary">
                Cada uno de nuestros cuchillos lleva consigo nuestra historia, valores y la dedicación de nuestros artesanos.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/shop"
                  className="bg-accent hover:bg-accent/90 text-white font-semibold px-10 py-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Explorar Colección
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-xl"
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
  );
};

export default About;