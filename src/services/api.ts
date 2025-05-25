// Configuración de JSONBin.io
const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3';
const BIN_ID = '6833275d8960c979a5a0ecf0'; // Tu Bin ID desde la imagen

// Headers necesarios para JSONBin.io
const getHeaders = () => ({
  'Content-Type': 'application/json',
   'X-Master-Key': '$2a$10$QIUrp0mj55XPhBlzCg7fz.GqUJyAraUvXhTh5SwzcHh.d5f2b9J5.'
});



// API que consume JSONBin.io
const api = {
  // Obtener todos los productos desde JSONBin.io
  get: async (endpoint: string) => {
    if (endpoint === '/products') {
      try {
        const response = await fetch(`${JSONBIN_BASE_URL}/b/${BIN_ID}/latest`, {
          method: 'GET',
          headers: getHeaders()
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // JSONBin devuelve los datos en result.record
        return {
          data: result.record.products || result.record
        };
      } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error al obtener productos');
      }
    }
    
    throw new Error(`Endpoint no encontrado: ${endpoint}`);
  },

  // Obtener un producto por ID
  getById: async (id: number) => {
    try {
      const response = await fetch(`${JSONBIN_BASE_URL}/b/${BIN_ID}/latest`, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const products = result.record.products || result.record;
      const product = products.find((p: any) => p.id === id);
      
      if (product) {
        return { data: product };
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw new Error('Error al obtener el producto');
    }
  },

  // Actualizar todo el bin con nuevos datos
  updateBin: async (newData: any) => {
    try {
      const response = await fetch(`${JSONBIN_BASE_URL}/b/${BIN_ID}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(newData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating bin:', error);
      throw new Error('Error al actualizar datos');
    }
  },

  // Eliminar un producto (requiere actualizar todo el bin)
  delete: async (productId: number) => {
    try {
      // Primero obtenemos todos los productos
      const currentData = await api.get('/products');
      const products = currentData.data;
      
      // Filtramos el producto a eliminar
      const updatedProducts = products.filter((p: any) => p.id !== productId);
      
      // Actualizamos el bin con los productos restantes
      await api.updateBin({ products: updatedProducts });
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Error al eliminar producto');
    }
  },

  // Crear un nuevo producto
  post: async (endpoint: string, data: any) => {
    if (endpoint === '/products') {
      try {
        // Obtenemos los productos actuales
        const currentData = await api.get('/products');
        const products = currentData.data;
        
        // Generamos un nuevo ID
        const newId = products.length > 0 
          ? Math.max(...products.map((p: any) => p.id)) + 1 
          : 1;
        
        const newProduct = { ...data, id: newId };
        
        // Agregamos el nuevo producto
        const updatedProducts = [...products, newProduct];
        
        // Actualizamos el bin
        await api.updateBin({ products: updatedProducts });
        
        return { data: newProduct };
      } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Error al crear producto');
      }
    }
    
    throw new Error(`Endpoint no encontrado: ${endpoint}`);
  },

  // Actualizar un producto existente
  put: async (endpoint: string, data: any) => {
    if (endpoint.startsWith('/products/')) {
      try {
        const productId = parseInt(endpoint.split('/').pop() || '0');
        
        // Obtenemos los productos actuales
        const currentData = await api.get('/products');
        const products = currentData.data;
        
        // Encontramos y actualizamos el producto
        const updatedProducts = products.map((p: any) => 
          p.id === productId ? { ...p, ...data } : p
        );
        
        // Actualizamos el bin
        await api.updateBin({ products: updatedProducts });
        
        const updatedProduct = updatedProducts.find((p: any) => p.id === productId);
        return { data: updatedProduct };
      } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Error al actualizar producto');
      }
    }
    
    throw new Error(`Endpoint no encontrado: ${endpoint}`);
  }
};

export default api;