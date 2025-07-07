import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "FiloSharp - Cuchillos Artesanales",
  description = "Cuchillos artesanales de alta calidad",
  keywords = "cuchillos, artesanales, forjados"
}) => {
  useEffect(() => {
    // Cambiar título
    document.title = title;
    
    // Cambiar descripción
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', description);
    
    // Cambiar keywords
    const keys = document.querySelector('meta[name="keywords"]');
    if (keys) keys.setAttribute('content', keywords);
  }, [title, description, keywords]);

  return null;
};

export default SEO;