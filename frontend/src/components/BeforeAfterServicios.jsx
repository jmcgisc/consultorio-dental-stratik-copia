// src/components/BeforeAfter.jsx
import { useState, useRef, useEffect } from 'react';

export default function BeforeAfterServicios({ 
  before, 
  after, 
  labelBefore = "Antes", 
  labelAfter = "Después",
  sensitiveContent = false 
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isRevealed, setIsRevealed] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(sensitiveContent);
  const [isDragging, setIsDragging] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const afterImageRef = useRef(null);

  // Verificación de imágenes
  if (!before || !after) {
    console.warn('BeforeAfter: Imágenes faltantes', { before, after });
    return null;
  }

  const handleReveal = () => {
    setIsRevealed(true);
    setShowSensitiveWarning(false);
  };

  const handleImageLoad = (type, e) => {
    setImagesLoaded(prev => ({ ...prev, [type]: true }));
    
    // Obtener dimensiones de la imagen después para ajustar el contenedor
    if (type === 'after' && e.target) {
      const img = e.target;
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    }
  };

  const handleImageError = (type, src) => {
    console.error(`Error cargando imagen ${type}:`, src);
    setImagesLoaded(prev => ({ ...prev, [type]: false }));
  };

  // Calcular relación de aspecto óptima
  const calculateAspectRatio = () => {
    if (imageDimensions.width === 0 || imageDimensions.height === 0) {
      return 16 / 9; // Relación por defecto
    }
    return imageDimensions.width / imageDimensions.height;
  };

  const aspectRatio = calculateAspectRatio();
  const containerHeight = Math.min(400, window.innerWidth * 0.8 / aspectRatio);

  // Manejo de mouse
  const handleMouseDown = (e) => {
    if (!isRevealed) return;
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isRevealed) return;
    updateSliderPosition(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Manejo de touch
  const handleTouchStart = (e) => {
    if (!isRevealed) return;
    setIsDragging(true);
    updateSliderPosition(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isRevealed) return;
    updateSliderPosition(e.touches[0]);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (event) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(1, Math.min(99, percentage))); // Mínimo 1% para que siempre se vea algo
  };

  // Efecto para manejar eventos globales
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    const handleGlobalTouchMove = (e) => {
      if (isDragging && e.touches.length > 0) {
        handleTouchMove(e);
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        handleTouchEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
      
      // Prevenir selección de texto mientras se arrastra
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
      
      // Restaurar selección de texto
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [isDragging, isRevealed]);

  // Efecto para prevenir scroll en dispositivos táctiles solo cuando se está arrastrando
  useEffect(() => {
    const preventScroll = (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    if (isDragging) {
      document.addEventListener('touchmove', preventScroll, { passive: false });
    }

    return () => {
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isDragging]);

  return (
    <div className="card group">
      {/* Header con título y estado de carga */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Progreso del Tratamiento
        </h2>
        <div className="flex items-center gap-2">
          {!imagesLoaded.before || !imagesLoaded.after ? (
            <div className="flex items-center gap-1 text-sm text-amber-600">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span>Cargando...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Listo</span>
            </div>
          )}
        </div>
      </div>

      {/* Advertencia de contenido sensible */}
      {showSensitiveWarning && (
        <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 text-amber-600 dark:text-amber-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                Contenido Sensible
              </h3>
              <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
                Estas imágenes muestran condiciones dentales reales antes del tratamiento. 
                Pueden ser sensibles para algunas personas.
              </p>
            </div>
          </div>
          
          <button
            onClick={handleReveal}
            className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Entiendo, mostrar imágenes
          </button>
        </div>
      )}

      {/* Contenedor principal con altura dinámica */}
      <div 
        ref={containerRef}
        className={`relative w-full rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 transition-all duration-300 bg-gray-100 dark:bg-gray-800 ${
          !isRevealed ? 'blur-lg scale-95' : 'scale-100'
        } ${isDragging ? 'cursor-grabbing' : 'cursor-default'}`}
        style={{ 
          height: isRevealed ? `${containerHeight}px` : '320px',
          maxHeight: '80vh'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Overlay de ofuscación */}
        {!isRevealed && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-600/80 z-20 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Contenido Oculto</h3>
              <p className="text-white/80 text-sm mb-4 max-w-xs">
                {sensitiveContent 
                  ? "Haz clic para revelar las imágenes de progreso (contenido sensible)"
                  : "Haz clic para revelar las imágenes de progreso"
                }
              </p>
              <button
                onClick={handleReveal}
                className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 border border-white/30"
              >
                Revelar Imágenes
              </button>
            </div>
          </div>
        )}

        {/* Contenedor de imágenes con object-fit contain para verlas completas */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Imagen "Después" (fondo) - Se ve completa */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              ref={afterImageRef}
              src={after} 
              alt={labelAfter}
              className="max-w-full max-h-full object-contain"
              onLoad={(e) => handleImageLoad('after', e)}
              onError={() => handleImageError('after', after)}
              style={{ 
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
        </div>
        
        {/* Imagen "Antes" con ancho variable - También se ve completa */}
        <div 
          className="absolute inset-0 h-full overflow-hidden transition-all duration-150 flex items-center justify-center"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={before} 
              alt={labelBefore}
              className="max-w-full max-h-full object-contain"
              onLoad={(e) => handleImageLoad('before', e)}
              onError={() => handleImageError('before', before)}
              style={{ 
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
        </div>
        
        {/* Control deslizante mejorado */}
        {isRevealed && (
          <div 
            className={`absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-10 transition-all duration-200 ${
              isDragging ? 'cursor-grabbing scale-110 bg-blue-400' : 'cursor-grab hover:scale-105 hover:bg-blue-400'
            }`}
            style={{ left: `${sliderPosition}%` }}
          >
            <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-transform ${
              isDragging ? 'scale-110' : ''
            }`}>
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-white/50 rounded-sm"></div>
          </div>
        )}

        {/* Indicadores de posición */}
        {isRevealed && (
          <>
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/20">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {labelBefore}
              </span>
            </div>
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/20">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {labelAfter}
              </span>
            </div>
          </>
        )}

        {/* Línea divisoria sutil */}
        {isRevealed && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white/30 z-5 shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          />
        )}
      </div>

      {/* Controles adicionales */}
      {isRevealed && (
        <div className="mt-6 space-y-4">
          {/* Indicador de progreso */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {labelBefore}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                {Math.round(sliderPosition)}%
              </span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {labelAfter}
            </span>
          </div>

          {/* Slider numérico */}
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="99"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
              <span>Arrastra el control o haz clic en cualquier lugar</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Usa el slider para ajuste preciso</span>
            </div>
          </div>
        </div>
      )}

      {/* Estilos personalizados para el slider */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        }
        
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        }
        
        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}