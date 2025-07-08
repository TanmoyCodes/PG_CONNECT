import React from 'react';

export default function AuthModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children || <p className="text-center text-gray-700">This is the Auth Modal</p>}
      </div>
    </div>
  );
}
