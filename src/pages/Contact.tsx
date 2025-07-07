import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    interest: 'general'
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulación de envío de formulario
    setTimeout(() => {
      console.log('Formulario enviado:', formData);
      setSubmitting(false);
      setSubmitted(true);
      
      // Resetear el formulario después de un tiempo
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          interest: 'general'
        });
      }, 5000);
    }, 1500);
  };
  
  // Información de contacto y ubicación
  const contactInfo = [
    {
      title: "Visítanos",
      description: "Av 137 y Calle 65, La Plata, Buenos Aires, Argentina",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      ),
      link: "https://maps.google.com",
      linkText: "Ver en Google Maps"
    },
    {
      title: "Horario del Taller",
      description: "Lunes a Viernes: 9:00 - 18:00, Sábados: 10:00 - 14:00",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      )
    },
    {
      title: "Llámanos",
      description: "+54 (221) 123-4567",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ),
      link: "tel:+542211234567",
      linkText: "Llamar ahora"
    },
    {
      title: "Email",
      description: "info@cuchillosartesanales.com",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      link: "mailto:info@cuchillosartesanales.com",
      linkText: "Enviar email"
    }
  ];
  
  // FAQ
  const faqs = [
    {
      question: "¿Ofrecen envíos internacionales?",
      answer: "Sí, realizamos envíos a todo el mundo. Los tiempos de entrega varían según el destino, pero generalmente oscilan entre 7-14 días hábiles. Todos nuestros envíos incluyen número de seguimiento."
    },
    {
      question: "¿Puedo personalizar un cuchillo?",
      answer: "Absolutamente. Ofrecemos servicios de personalización completos, desde la elección de materiales hasta grabados personalizados. Contáctanos para discutir tus necesidades específicas y te brindaremos un presupuesto detallado."
    },
    {
      question: "¿Qué incluye la garantía de por vida?",
      answer: "Nuestra garantía cubre defectos de fabricación de por vida. Esto incluye problemas con la integridad de la hoja, el mango o cualquier componente del cuchillo. No cubre el desgaste normal, mal uso o daños accidentales."
    },
    {
      question: "¿Cómo debo mantener mi cuchillo?",
      answer: "Recomendamos lavar y secar a mano inmediatamente después de cada uso. Afile regularmente con una chaira o piedra de afilar. Guarde en un bloque de cuchillos o con protectores de hoja. Evite lavavajillas y exposición prolongada a humedad o alimentos ácidos."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ SEO COMPONENT - Contact page */}
      <SEO 
        title="Contacto - FiloSharp Cuchillos Artesanales | Atención Personalizada"
        description="Contáctanos para consultas sobre cuchillos artesanales, pedidos personalizados y visitas al taller. Ubicados en La Plata, Buenos Aires. Tel: +54 (221) 123-4567. Atención de Lun-Vie 9-18hs, Sáb 10-14hs."
        keywords="contacto FiloSharp, cuchillos artesanales La Plata, taller cuchillos Buenos Aires, pedidos personalizados, visitas taller, atención al cliente, info@cuchillosartesanales.com, teléfono cuchillos artesanales, horarios atención"
      />
      
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2017%2F06%2F18191738%2Fapreton-manos.jpg?auth=5dd861650fa316d61b890256e3e5306dbd003475bc3e8da252557f79f3354009&smart=true&width=1200&height=900&quality=85"
              alt="Taller de cuchillos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative container-custom h-full flex flex-col justify-center text-white">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">CONTACTO</h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Estamos aquí para atender tus consultas y brindarte una atención personalizada
              </p>
            </div>
          </div>
        </section>

        {/* Información de contacto */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                  <p className="text-secondary mb-4">{item.description}</p>
                  {item.link && (
                    <a 
                      href={item.link} 
                      className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors"
                      target={item.link.startsWith('http') ? "_blank" : undefined}
                      rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      {item.linkText}
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulario de contacto y mapa */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h2 className="text-3xl font-bold mb-6 text-primary">Envíanos un mensaje</h2>
                  <p className="text-secondary mb-8">
                    Completa el formulario y te responderemos a la brevedad. También puedes contactarnos directamente por teléfono o email.
                  </p>

                  {submitted ? (
                    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-medium text-green-800">¡Mensaje enviado!</h3>
                          <p className="mt-2 text-green-700">
                            Gracias por contactarnos. Nos pondremos en contacto contigo a la brevedad.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                            Nombre completo *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-accent focus:border-accent"
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-accent focus:border-accent"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="interest" className="block text-sm font-medium text-secondary mb-2">
                          Estoy interesado en
                        </label>
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-accent focus:border-accent"
                        >
                          <option value="general">Información general</option>
                          <option value="custom">Cuchillo personalizado</option>
                          <option value="wholesale">Ventas mayoristas</option>
                          <option value="visit">Visita al taller</option>
                          <option value="support">Soporte técnico</option>
                        </select>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                          Asunto *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-accent focus:border-accent"
                          placeholder="Asunto de tu mensaje"
                        />
                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                          Mensaje *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-accent focus:border-accent"
                          placeholder="¿En qué podemos ayudarte?"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          "Enviar mensaje"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 order-1 lg:order-2">
                {/* Mapa embedido */}
                <div className="rounded-xl overflow-hidden shadow-lg h-[300px] lg:h-[400px] mb-8">
                  <iframe 
                    title="Ubicación del taller"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26150.887575393!2d-57.98507045!3d-34.90440575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e62fdc935dbd%3A0x5c66a31003e340f3!2sLa%20Plata%2C%20Buenos%20Aires%20Province%2C%20Argentina!5e0!3m2!1sen!2sus!4v1715553654785!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Horarios y visitas */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-primary">Visitas al taller</h3>
                  <p className="text-secondary mb-6">
                    Ofrecemos visitas guiadas a nuestro taller donde podrás ver de cerca el proceso de fabricación de nuestros cuchillos artesanales.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-primary mb-2">Horarios de visita:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Miércoles y Viernes: 11:00 - 16:00
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Sábados: 10:00 - 14:00
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-secondary italic">
                    Las visitas requieren reserva previa. Contáctanos para agendar tu visita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Preguntas frecuentes</h2>
              <p className="text-lg text-secondary max-w-3xl mx-auto">
                Aquí encontrarás respuestas a las preguntas más comunes. Si tienes alguna duda adicional, no dudes en contactarnos.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold mb-4 text-primary flex items-start">
                      <span className="bg-accent/10 text-accent w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        Q
                      </span>
                      {faq.question}
                    </h3>
                    <p className="text-secondary pl-11">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-lg mb-6">¿No encuentras la respuesta que buscas?</p>
                <a 
                  href="mailto:info@cuchillosartesanales.com" 
                  className="inline-flex items-center bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Envíanos tu pregunta
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">Síguenos en redes sociales</h2>
            <p className="text-lg text-secondary mb-12 max-w-3xl mx-auto">
              Mantente al día con nuestras últimas creaciones, eventos y promociones siguiéndonos en nuestras redes sociales.
            </p>
            
            <div className="flex justify-center space-x-8">
              {[
                { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { name: "Facebook", icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
                { name: "YouTube", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
                { name: "Twitter", icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-12 h-12 bg-accent hover:bg-accent/90 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;