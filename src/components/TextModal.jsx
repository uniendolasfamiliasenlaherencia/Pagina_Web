import React from 'react';

const TextModal = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b flex justify-between items-center p-6" style={{ borderColor: '#D0B68A' }}>
          <h2 className="text-2xl font-bold" style={{ color: '#304B52' }}>{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-gray-700 whitespace-pre-line leading-relaxed">
            {content}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6 flex justify-end" style={{ borderColor: '#D0B68A' }}>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md text-white font-semibold transition"
            style={{ backgroundColor: '#C47A59' }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextModal;
