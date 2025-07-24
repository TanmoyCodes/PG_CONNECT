import React, { useEffect } from 'react';
import { Camera, ImagePlus, X } from 'lucide-react';

const CameraCapture = ({ image, setImage }) => {
  // Clean up object URLs when component unmounts or image list changes
  useEffect(() => {
    return () => {
      image.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [image]);

  const handleFileSelect = (files) => {
    const selected = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      isLoading: false,
      isUploaded: false,
      error: null,
    }));
    setImage((prev) => [...prev, ...selected]);
  };

  const removeImageField = (id) => {
    setImage((prev) => {
      const toRemove = prev.find((img) => img.id === id);
      if (toRemove) URL.revokeObjectURL(toRemove.preview);
      return prev.filter((img) => img.id !== id);
    });
  };

  return (
    <div className="space-y-4">
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* 📷 Capture from camera */}
        <label
          className="cursor-pointer aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
          title="Capture Photo"
        >
          <Camera size={32} />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </label>

        {/* 🖼️ Select from gallery */}
        <label
          className="cursor-pointer aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
          title="Select from Gallery"
        >
          <ImagePlus size={32} />
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </label>

        {/* Display selected images */}
        {image.map((img) => (
          <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border">
            <img
              src={img.preview}
              alt="Selected"
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => removeImageField(img.id)}
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100 transition"
              title="Remove"
            >
              <X size={16} className="text-red-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraCapture;
