"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    borderColor: 'border-green-400/50',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-400',
  },
  error: {
    icon: XCircle,
    borderColor: 'border-red-400/50',
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-400',
  },
  warning: {
    icon: AlertCircle,
    borderColor: 'border-yellow-400/50',
    bgColor: 'bg-yellow-500/10',
    iconColor: 'text-yellow-400',
  },
  info: {
    icon: Info,
    borderColor: 'border-blue-400/50',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
};

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}) => {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        fixed bottom-6 right-6 z-[9999]
        min-w-[320px] max-w-md
        p-4 rounded-xl
        border ${config.borderColor}
        ${config.bgColor}
        backdrop-blur-xl
        shadow-2xl
        flex items-start gap-3
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
      
      {/* Message */}
      <p className="text-white text-sm flex-1 leading-relaxed">
        {message}
      </p>
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="text-white/60 hover:text-white transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ 
  toasts, 
  onRemove 
}) => {
  return (
    <div className="fixed bottom-0 right-0 z-[9999] p-6 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: index * -80 }}
            exit={{ opacity: 0, x: 100 }}
            className="pointer-events-auto mb-3"
          >
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => onRemove(toast.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: ToastType }>>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
};
