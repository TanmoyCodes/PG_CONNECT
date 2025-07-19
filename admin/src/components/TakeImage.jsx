import React, { useState, useRef } from 'react';
import {
  PlusCircle,
  Trash2,
  UploadCloud,
  Loader2,
  CheckCircle2,
  Camera,
  ImagePlus,
  X,
  CameraOff,
} from 'lucide-react';
import Webcam from 'react-webcam';

const CameraCapture = ({ image, setImage }) => {
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);

  const addImageField = () => {
    const newField = {
      id: Date.now() + Math.random(),
      file: null,
      preview: null,
      isLoading: false,
      isUploaded: false,
      error: null,
    };
    setImage((prev) => [...prev, newField]);
  };

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
    setImage((prev) => prev.filter((img) => img.id !== id));
  };

  const captureFromWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
        handleFileSelect([file]);
      });
  };

  return (
    <div className="space-y-4">
      {/* Webcam Modal */}
      {showWebcam && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative max-w-sm w-full space-y-2">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500"
              onClick={() => setShowWebcam(false)}
            >
              <X />
            </button>
            {navigator.mediaDevices ? (
              <>
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-md w-full"
                  videoConstraints={{ facingMode: "environment" }}
                />
                <button
                  className="w-full bg-indigo-600 text-white py-2 rounded-md mt-2"
                  onClick={captureFromWebcam}
                >
                  Capture Photo
                </button>
              </>
            ) : (
              <div className="text-center text-gray-600">
                <CameraOff className="mx-auto mb-2" size={48} />
                Webcam not supported
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {image.map((upload) => (
          <div
            key={upload.id}
            className="relative aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 flex-col group overflow-hidden"
          >
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={(e) => handleFileSelect(e.target.files)}
              disabled={upload.isLoading || upload.isUploaded}
              multiple
            />

            {!upload.preview && !upload.isLoading && <UploadCloud size={32} />}
            {upload.preview && (
              <img
                src={upload.preview}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
              />
            )}

            {upload.isLoading && (
              <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-md">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
                <p className="text-sm font-medium text-indigo-600 mt-2">Uploading...</p>
              </div>
            )}

            {upload.isUploaded && (
              <div className="absolute inset-0 bg-green-500/80 flex flex-col items-center justify-center rounded-md text-white">
                <CheckCircle2 size={32} />
                <p className="text-sm font-bold mt-2">Uploaded</p>
              </div>
            )}

            {upload.error && (
              <div className="absolute bottom-0 w-full bg-red-500/80 p-1 rounded-b-md text-white text-xs text-center">
                {upload.error}
              </div>
            )}

            {(upload.file || upload.isUploaded) && !upload.isLoading && (
              <button
                type="button"
                onClick={() => removeImageField(upload.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        {/* 📷 Camera for mobile (capture attr) */}
        <label
          className="cursor-pointer aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
          title="Camera (mobile)"
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

        {/* 📸 Desktop Webcam Button */}
        <button
          type="button"
          onClick={() => setShowWebcam(true)}
          className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
          title="Open Webcam"
        >
          <Camera size={32} />
        </button>

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

        {/* ➕ Optional: Add empty field */}
        <button
          type="button"
          onClick={addImageField}
          className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
          title="Add Placeholder"
        >
          <PlusCircle size={32} />
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
