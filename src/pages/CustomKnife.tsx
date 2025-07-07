import  { useState, useEffect, useRef } from 'react';
import { useContext } from 'react'; // Si no la tienes ya
import { CartContext } from '../context/CartContext'; // Ajusta la ruta según tu estructura
import { useNavigate } from 'react-router-dom'; // Si no la tienes ya
import SEO from '../components/SEO';


// Primero definimos los tipos necesarios
interface BladeConfig {
  material: 'steel' | 'carbon' | 'damascus';
  length: string;
  finish: string;
}

interface HandleConfig {
  material: 'wood' | 'carbon' | 'bone' | 'steel';
  color: string;
  grip: string;
}

interface EngravingConfig {
  text: string;
  position: 'blade' | 'handle';
  font: string;
  color?: string; // Opcional porque se agregó después
}

interface AccessoriesConfig {
  sheath: boolean;
  box: boolean;
  certificate: boolean;
}

interface KnifeConfig {
  type: 'chef' | 'santoku' | 'paring' | 'butcher' | 'bread' | 'fillet';
  blade: BladeConfig;
  handle: HandleConfig;
  engraving: EngravingConfig;
  accessories: AccessoriesConfig;
}


// Props para el componente KnifeViewer3D
interface KnifeViewer3DProps {
  config: KnifeConfig;
}

// 🔹 Modal de Éxito
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCart: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onGoToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          {/* Icono verde de éxito */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            ¡Cuchillo agregado al carrito!
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Tu cuchillo personalizado ha sido agregado correctamente.
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Continuar personalizando
            </button>
            <button
              onClick={() => { onGoToCart(); onClose(); }}
              className="flex-1 bg-accent text-white py-3 px-4 rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              Ver carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔹 Modal de Error
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          {/* Icono rojo de error */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Error
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            {message}
          </p>
          
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

const KnifeViewer3D: React.FC<KnifeViewer3DProps> = ({ config }) => {
  // Tipar correctamente el ref del canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Verificación de null

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Verificación adicional para el contexto

    canvas.width = 500;
    canvas.height = 400;

    // Dibujar cuchillo basado en configuración
    const drawKnife = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      
      
      // Fondo con gradiente
      const bgGradient = ctx.createRadialGradient(250, 200, 0, 250, 200, 200);
      bgGradient.addColorStop(0, '#f8f9fa');
      bgGradient.addColorStop(1, '#e9ecef');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(250, 200);
      ctx.rotate(rotation.y * 0.01);
      const scaleX = getLengthScaleFactor(config.blade.length);
      const dynamicY = 1 + Math.sin(rotation.x * 0.01) * 0.05;
      ctx.scale(scaleX, dynamicY);

      // Sombra
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetY = 10;

      // Hoja del cuchillo
      drawBladeShape(ctx, config);


      // Patrón Damascus si aplica
      if (config.blade.material === 'damascus') {
        ctx.strokeStyle = '#1a252f';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.moveTo(-150 + i * 15, -10);
          ctx.quadraticCurveTo(-150 + i * 15 + 7, 0, -150 + i * 15, 10);
          ctx.stroke();
        }
      }

      // Mango
      const handleColors = {
        wood: '#8B4513',
        carbon: '#2C2C2C',
        bone: '#F5F5DC',
        steel: '#708090'
      };

      const handleGradient = ctx.createLinearGradient(-30, -12, -30, 12);
      handleGradient.addColorStop(0, handleColors[config.handle.material]);
      handleGradient.addColorStop(0.5, adjustBrightness(handleColors[config.handle.material], 30));
      handleGradient.addColorStop(1, handleColors[config.handle.material]);

      ctx.fillStyle = handleGradient;
      ctx.fillRect(-30, -12, 100, 24);

      // Detalles del mango
      if (config.handle.material === 'wood') {
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(-25 + i * 20, -10);
          ctx.lineTo(-25 + i * 20, 10);
          ctx.stroke();
        }
      }

      // Grabado personalizado
    if (config.engraving.text) {
    ctx.fillStyle = config.engraving.color || '#444'; // usa color si está definido
    const bladeLength = parseInt(config.blade.length.replace('cm', ''));
    const fontSize = Math.max(10, 14 * (bladeLength / 20));
    ctx.font = `${fontSize}px serif`;
    ctx.textAlign = 'center';

    if (config.engraving.position === 'blade') {
        ctx.save();
        ctx.rotate(-Math.PI / 20); // ligera inclinación estética

        // Posición personalizada según tipo de cuchillo
        let bladeCenterX = -90;
        let bladeCenterY = 0;

        switch (config.type) {
            case 'bread':
            bladeCenterX = -100;
            bladeCenterY = -6;
            break;
            case 'chef':
            bladeCenterX = -85;
            bladeCenterY = -8;
            break;
            case 'paring':
            bladeCenterX = -65;
            bladeCenterY = 0;
            break;
            case 'butcher':
            bladeCenterX = -90;
            bladeCenterY = -2;
            break;
            case 'fillet':
            bladeCenterX = -100;
            bladeCenterY = -3;
            break;
            case 'santoku':
            bladeCenterX = -85;
            bladeCenterY = -6;
            break;
            default:
            bladeCenterX = -90;
            bladeCenterY = 0;
        }

        ctx.translate(bladeCenterX, bladeCenterY);
        ctx.fillText(config.engraving.text, 0, 0);
        ctx.restore();
    } else if (config.engraving.position === 'handle') {
        // Grabado en el mango
        ctx.fillText(config.engraving.text, 20, 5);
    }
    }

      // Pomo/terminación
      ctx.fillStyle = handleColors[config.handle.material];
      ctx.beginPath();
      ctx.arc(70, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawKnife();
  }, [config, rotation]);

  

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
  setIsDragging(true);
  setLastMousePos({ x: e.clientX, y: e.clientY });
};

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
  if (!isDragging) return;
  
  const deltaX = e.clientX - lastMousePos.x;
  const deltaY = e.clientY - lastMousePos.y;
  
  setRotation(prev => ({
    x: prev.x + deltaY,
    y: prev.y + deltaX
  }));
  
  setLastMousePos({ x: e.clientX, y: e.clientY });
};

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getLengthScaleFactor = (lengthStr: string): number => {
  const cm = parseInt(lengthStr.replace('cm', ''));
  return cm / 20; // 20cm será el tamaño base (factor 1.0)
};


  return (
    <div className="relative bg-gray-50 rounded-2xl p-8 shadow-lg">
      <canvas
        ref={canvasRef}
        className="w-full h-auto cursor-grab active:cursor-grabbing rounded-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="absolute top-4 right-4 text-sm text-gray-500">
        Arrastra para rotar
      </div>
    </div>
  );
};

const drawBladeShape = (ctx: CanvasRenderingContext2D, config: KnifeConfig): void => {
  const type = config.type;
  const bladeGradient = ctx.createLinearGradient(-120, -15, -120, 15);
  bladeGradient.addColorStop(0, config.blade.material === 'damascus' ? '#2c3e50' : '#95a5a6');
  bladeGradient.addColorStop(0.5, config.blade.material === 'damascus' ? '#34495e' : '#bdc3c7');
  bladeGradient.addColorStop(1, config.blade.material === 'damascus' ? '#2c3e50' : '#95a5a6');

  ctx.fillStyle = bladeGradient;

  ctx.beginPath();
  switch (type) {
    case 'chef':
      // Hoja ancha y curva
      ctx.moveTo(-150, 0);
      ctx.quadraticCurveTo(-120, -30, -30, -10);
      ctx.lineTo(-30, 10);
      ctx.quadraticCurveTo(-120, 30, -150, 0);
      break;

    case 'santoku':
      // Hoja recta con punta caída
      ctx.moveTo(-140, -10);
      ctx.lineTo(-40, -10);
      ctx.quadraticCurveTo(-30, 0, -40, 10);
      ctx.lineTo(-140, 10);
      ctx.closePath();
      break;

    case 'paring':
      // Hoja pequeña y puntiaguda
      ctx.moveTo(-100, 0);
      ctx.lineTo(-30, -10);
      ctx.lineTo(-30, 10);
      ctx.closePath();
      break;

    case 'butcher':
      // Hoja alta y robusta
      ctx.moveTo(-150, -20);
      ctx.lineTo(-50, -20);
      ctx.lineTo(-30, 0);
      ctx.lineTo(-50, 20);
      ctx.lineTo(-150, 20);
      ctx.closePath();
      break;

    case 'bread':
      // Hoja larga y serrada
      ctx.moveTo(-160, -10);
      for (let i = -160; i < -30; i += 10) {
        ctx.lineTo(i + 5, -15);
        ctx.lineTo(i + 10, -10);
      }
      ctx.lineTo(-30, -10);
      ctx.lineTo(-30, 10);
      for (let i = -30; i > -160; i -= 10) {
        ctx.lineTo(i - 5, 15);
        ctx.lineTo(i - 10, 10);
      }
      ctx.closePath();
      break;

    case 'fillet':
      // Hoja larga y delgada
      ctx.moveTo(-160, 0);
      ctx.quadraticCurveTo(-80, -10, -30, -2);
      ctx.lineTo(-30, 2);
      ctx.quadraticCurveTo(-80, 10, -160, 0);
      break;

    default:
      // Fallback hoja genérica
      ctx.moveTo(-150, 0);
      ctx.lineTo(-30, -15);
      ctx.lineTo(-30, 15);
      ctx.closePath();
      break;
  }

  ctx.fill();

  // Patrón damasco (opcional)
  if (config.blade.material === 'damascus') {
    ctx.strokeStyle = '#1a252f';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(-150 + i * 15, -10);
      ctx.quadraticCurveTo(-150 + i * 15 + 7, 0, -150 + i * 15, 10);
      ctx.stroke();
    }
  }
};


const adjustBrightness = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

// Función para crear el resumen de personalización
const createCustomSummary = (config: KnifeConfig): string => {
  const parts = [
    `Cuchillo ${config.type}`,
    `Hoja: ${config.blade.material} ${config.blade.length}`,
    `Mango: ${config.handle.material}`,
  ];
  
  if (config.engraving.text) {
    parts.push(`Grabado: "${config.engraving.text}"`);
  }
  
  const accessories = Object.entries(config.accessories)
    .filter(([_, value]) => value)
    .map(([key, _]) => {
      const names: Record<string, string> = {
        sheath: 'Funda de cuero',
        box: 'Caja de presentación',
        certificate: 'Certificado'
      };
      return names[key];
    });
  
  if (accessories.length > 0) {
    parts.push(`Incluye: ${accessories.join(', ')}`);
  }
  
  return parts.join(' | ');
};

const CustomKnifePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<KnifeConfig>({
    type: 'chef',
    blade: {
      material: 'steel',
      length: '20cm',
      finish: 'satin'
    },
    handle: {
      material: 'wood',
      color: 'walnut',
      grip: 'traditional'
    },
    engraving: {
      text: '',
      position: 'blade',
      font: 'script',
      color: '#000000'
    },
    accessories: {
      sheath: false,
      box: false,
      certificate: true
    }
  });

  const [totalPrice, setTotalPrice] = useState(450);

  // ✅ AGREGAR ESTAS LÍNEAS NUEVAS PARA EL CARRITO:
  const { addItem } = useContext(CartContext);
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const steps = [
    { title: 'Tipo de Cuchillo', icon: '🔪' },
    { title: 'Hoja', icon: '⚔️' },
    { title: 'Mango', icon: '🎨' },
    { title: 'Grabado', icon: '✒️' },
    { title: 'Accesorios', icon: '📦' },
    { title: 'Resumen', icon: '✅' }
  ];

  useEffect(() => {
    const basePrices = {
      chef: 450,
      santoku: 480,
      paring: 320,
      butcher: 550,
      bread: 380,
      fillet: 420
    } as const;

    let price = basePrices[config.type as keyof typeof basePrices] || 450;

    // Sumar extras como blade, handle, grabado, accesorios
    if (config.blade.material === 'damascus') price += 200;
    if (config.blade.material === 'carbon') price += 100;
    if (config.handle.material === 'carbon') price += 150;
    if (config.handle.material === 'bone') price += 100;
    if (config.engraving.text) price += 75;
    if (config.accessories.sheath) price += 120;
    if (config.accessories.box) price += 80;

    setTotalPrice(price);
  }, [config]);

  const updateConfig = (section: string, key: string, value: any): void => {
    if (section === '') {
      setConfig(prev => ({
        ...prev,
        [key]: value
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof KnifeConfig] as object),
          [key]: value
        }
      }));
    }
  };

  // ✅ FUNCIÓN PARA AGREGAR AL CARRITO:
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    try {
      // Generar ID único para el producto personalizado
      const customId = `custom-knife-${Date.now()}`;
      
      // Crear resumen de personalización
      const parts = [
        `Cuchillo ${config.type}`,
        `Hoja: ${config.blade.material} ${config.blade.length}`,
        `Mango: ${config.handle.material}`,
      ];
      
      if (config.engraving.text) {
        parts.push(`Grabado: "${config.engraving.text}"`);
      }
      
      const accessories = Object.entries(config.accessories)
        .filter(([_, value]) => value)
        .map(([key, _]) => {
          const names: Record<string, string> = {
            sheath: 'Funda de cuero',
            box: 'Caja de presentación',
            certificate: 'Certificado'
          };
          return names[key];
        });
      
      if (accessories.length > 0) {
        parts.push(`Incluye: ${accessories.join(', ')}`);
      }
      
      const customSummary = parts.join(' | ');
      
      // Crear el item del carrito
      const cartItem = {
        id: customId,
        title: `Cuchillo ${config.type.charAt(0).toUpperCase() + config.type.slice(1)} Personalizado`,
        price: totalPrice,
        quantity: 1,
        image: 'https://img.freepik.com/vector-gratis/ilustracion-icono-vector-dibujos-animados-cuchillo-flotante-concepto-icono-objeto-comida-aislado-vector-premium_138676-5784.jpg?semt=ais_hybrid&w=740', // Imagen por defecto
        isCustom: true,
        customSummary: customSummary
      };
      
      // Agregar al carrito
      addItem(cartItem);
      
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      setErrorMessage('Error al agregar al carrito. Por favor, inténtalo de nuevo.');
      setShowErrorModal(true);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Selecciona el tipo de cuchillo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 'chef', name: 'Chef', desc: 'Versátil para todo uso', price: 450, emoji: '👨‍🍳' },
                { id: 'santoku', name: 'Santoku', desc: 'Estilo japonés', price: 480, emoji: '🍱' },
                { id: 'paring', name: 'Mondador', desc: 'Para tareas precisas', price: 320, emoji: '🥕' },
                { id: 'butcher', name: 'Carnicero', desc: 'Para carnes', price: 550, emoji: '🥩' },
                { id: 'bread', name: 'Pan', desc: 'Hoja serrada', price: 380, emoji: '🍞' },
                { id: 'fillet', name: 'Filetear', desc: 'Pescados y aves', price: 420, emoji: '🐟' }
              ].map(type => (
                <div
                  key={type.id}
                  onClick={() => updateConfig('', 'type', type.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                    config.type === type.id ? 'border-accent bg-accent/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl mb-3">{type.emoji}</div>
                  <h4 className="font-bold text-lg">{type.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <p className="font-semibold text-accent">${type.price}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Personaliza la hoja</h3>
            
            <div>
              <h4 className="font-semibold mb-4">Material de la hoja</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'steel', name: 'Acero Inoxidable', desc: 'Resistente y fácil mantenimiento', price: 0 },
                  { id: 'carbon', name: 'Acero al Carbono', desc: 'Filo superior, requiere cuidado', price: 100 },
                  { id: 'damascus', name: 'Damasco', desc: 'Patrón único, máxima calidad', price: 200 }
                ].map(material => (
                  <div
                    key={material.id}
                    onClick={() => updateConfig('blade', 'material', material.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      config.blade.material === material.id ? 'border-accent bg-accent/10' : 'border-gray-200'
                    }`}
                  >
                    <h5 className="font-semibold">{material.name}</h5>
                    <p className="text-sm text-gray-600">{material.desc}</p>
                    <p className="font-semibold text-accent">+${material.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Longitud de la hoja</h4>
              <div className="flex gap-4">
                {['15cm', '20cm', '25cm', '30cm'].map(length => (
                  <button
                    key={length}
                    onClick={() => updateConfig('blade', 'length', length)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      config.blade.length === length ? 'border-accent bg-accent text-white' : 'border-gray-200'
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Diseña el mango</h3>
            
            <div>
              <h4 className="font-semibold mb-4">Material del mango</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'wood', name: 'Madera', desc: 'Clásico y cálido', price: 0, color: '#8B4513' },
                  { id: 'carbon', name: 'Fibra de Carbono', desc: 'Moderno y ligero', price: 150, color: '#2C2C2C' },
                  { id: 'bone', name: 'Hueso', desc: 'Tradicional y elegante', price: 100, color: '#F5F5DC' },
                  { id: 'steel', name: 'Acero', desc: 'Duradero y higiénico', price: 50, color: '#708090' }
                ].map(material => (
                  <div
                    key={material.id}
                    onClick={() => updateConfig('handle', 'material', material.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      config.handle.material === material.id ? 'border-accent bg-accent/10' : 'border-gray-200'
                    }`}
                  >
                    <div 
                      className="w-full h-8 rounded mb-3"
                      style={{ backgroundColor: material.color }}
                    ></div>
                    <h5 className="font-semibold">{material.name}</h5>
                    <p className="text-sm text-gray-600">{material.desc}</p>
                    <p className="font-semibold text-accent">+${material.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Grabado personalizado</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ✨ Agrega un toque personal a tu cuchillo con grabado láser de alta precisión
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2">Texto del grabado</label>
              <input
                type="text"
                value={config.engraving.text}
                onChange={(e) => updateConfig('engraving', 'text', e.target.value)}
                placeholder="Ej: Chef Rodriguez, Mi cocina"
                maxLength={20}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">Máximo 20 caracteres - +$75</p>
            </div>

            <div>
              <label htmlFor="engravingColor" className="block font-semibold mb-2">
                Color del grabado
              </label>
              <select
                id="engravingColor"
                value={config.engraving.color || '#000000'}
                onChange={(e) => updateConfig('engraving', 'color', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="#000000">Negro</option>
                <option value="#ffffff">Blanco</option>
                <option value="#ffd700">Dorado</option>
                <option value="#888888">Gris claro</option>
              </select>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Posición del grabado</h4>
              <div className="flex gap-4">
                {[
                  { id: 'blade', name: 'En la hoja' },
                  { id: 'handle', name: 'En el mango' }
                ].map(position => (
                  <button
                    key={position.id}
                    onClick={() => updateConfig('engraving', 'position', position.id)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      config.engraving.position === position.id ? 'border-accent bg-accent text-white' : 'border-gray-200'
                    }`}
                  >
                    {position.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Accesorios y extras</h3>
            
            <div className="space-y-4">
              {[
                { id: 'sheath', name: 'Funda de cuero artesanal', desc: 'Protección elegante para tu cuchillo', price: 120 },
                { id: 'box', name: 'Caja de presentación', desc: 'Caja de madera con grabado para regalo', price: 80 },
                { id: 'certificate', name: 'Certificado de autenticidad', desc: 'Documento que garantiza la calidad artesanal', price: 0 }
              ].map(accessory => (
                <label
                  key={accessory.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={config.accessories[accessory.id as keyof AccessoriesConfig]}
                      onChange={(e) => updateConfig('accessories', accessory.id, e.target.checked)}
                      className="w-5 h-5 text-accent"
                    />
                    <div>
                      <h5 className="font-semibold">{accessory.name}</h5>
                      <p className="text-sm text-gray-600">{accessory.desc}</p>
                    </div>
                  </div>
                  <div className="font-semibold text-accent">
                    {accessory.price === 0 ? 'Gratis' : `+$${accessory.price}`}
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Resumen de tu cuchillo personalizado</h3>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Tipo de cuchillo</h4>
                    <p className="capitalize">{config.type}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Hoja</h4>
                    <p>{config.blade.material} - {config.blade.length}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mango</h4>
                    <p className="capitalize">{config.handle.material}</p>
                  </div>
                  {config.engraving.text && (
                    <div>
                      <h4 className="font-semibold">Grabado</h4>
                      <p>"{config.engraving.text}" en {config.engraving.position === 'blade' ? 'la hoja' : 'el mango'}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Accesorios incluidos</h4>
                  <ul className="space-y-2">
                    {Object.entries(config.accessories).map(([key, value]) => {
                      if (!value) return null;
                      const names: Record<string, string> = {
                        sheath: 'Funda de cuero',
                        box: 'Caja de presentación',
                        certificate: 'Certificado de autenticidad'
                      };
                      return <li key={key} className="flex items-center">
                        <span className="mr-2">✓</span>
                        {names[key]}
                      </li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold">Total</h4>
                <div className="text-3xl font-bold text-accent">${totalPrice}</div>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Tiempo de elaboración: 4-6 semanas | Envío gratuito incluido
              </p>
              {/* ✅ BOTÓN MODIFICADO PARA AGREGAR AL CARRITO: */}
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Agregando al carrito...
                  </span>
                ) : (
                  `Añadir al carrito - $${totalPrice}`
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (

    <>
      {/* ✅ SEO COMPONENT */}
      <SEO
        title="Personalizar Cuchillo - Diseña tu Cuchillo Único | FiloSharp"
        description="Crea tu cuchillo personalizado paso a paso. Elige tipo, material de hoja, mango, grabado y accesorios. Forjado artesanalmente para ti."
        keywords="cuchillo personalizado, diseñar cuchillo, cuchillo a medida, grabado personalizado, acero damasco, cuchillo artesanal"
      />

    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-primary">
              FILO<span className="text-accent ml-1">SHARP</span>
            </a>
            <a href="/shop" className="text-gray-600 hover:text-accent"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}>
              ← Volver a la tienda
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Diseña tu cuchillo perfecto
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crea un cuchillo único que refleje tu estilo y personalidad. 
            Cada pieza es forjada a mano por nuestros maestros artesanos.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer transition-all whitespace-nowrap ${
                      index === currentStep
                        ? 'bg-accent text-white'
                        : index < currentStep
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span className="text-lg">{step.icon}</span>
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Configurador */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            {renderStep()}
            
            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="px-6 py-3 bg-accent text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>

          {/* Vista 3D */}
          <div className="space-y-6">
            <KnifeViewer3D config={config} />
            
            {/* Price Display */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Precio actual</h3>
                  <p className="text-sm text-gray-600">Se actualiza en tiempo real</p>
                </div>
                <div className="text-3xl font-bold text-accent">${totalPrice}</div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold mb-4">¿Por qué personalizar?</h3>
              <div className="space-y-3">
                {[
                  { icon: '🎨', text: 'Diseño único y personal' },
                  { icon: '⚒️', text: 'Artesanía tradicional' },
                  { icon: '🏆', text: 'Calidad garantizada de por vida' },
                  { icon: '🚚', text: 'Envío gratuito incluido' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-lg">{benefit.icon}</span>
                    <span className="text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
              {/* Modales de alertas */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          onGoToCart={() => navigate('/cart')}
        />

        <ErrorModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          message={errorMessage}
        />
    </div>
    </>
  );
};

export default CustomKnifePage;