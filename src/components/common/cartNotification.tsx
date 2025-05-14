import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const CartNotification: React.FC<NotificationProps> = ({
  message,
  subtitle,
  isOpen,
  onClose,
  autoClose = true,
  autoCloseTime = 3000
}) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isOpen && autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, autoClose, autoCloseTime, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-auto" onClick={onClose}></div>
      <div className="relative bg-gray-900 text-white rounded-lg shadow-xl max-w-md mx-4 z-10 pointer-events-auto transform transition-all">
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-600 rounded-full p-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold">{message}</h3>
              {subtitle && <p className="text-gray-300 text-sm">{subtitle}</p>}
            </div>
          </div>
          
          <div className="mt-5">
            <button 
              onClick={onClose}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartNotification;