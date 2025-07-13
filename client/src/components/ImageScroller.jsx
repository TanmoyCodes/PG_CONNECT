import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AutoScrollSlider = ({ pg }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % pg.images.length
      );
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [pg.images.length]);

  // Manual Controls
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + pg.images.length) % pg.images.length
    );
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % pg.images.length
    );
  };

  return (
    <>
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] shadow-xl rounded-2xl overflow-hidden">
        {/* Image Scroller */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{
            transform: `translateX(-${currentImageIndex * (100 / pg.images.length)}%)`,
            width: `${pg.images.length * 100}%`,
          }}
        >
          {pg.images.map((img, index) => (
            <div key={index} className="w-full h-full relative overflow-hidden">
              {/* Ambient blurred background */}
              <img
                src={img}
                alt="Ambient Glow"
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40 z-0 transition-all duration-700"
              />
              {/* Actual image */}
              <img
                src={img}
                alt={`PG Image ${index + 1}`}
                onClick={() => {
                  setModalImage(img);
                  setShowModal(true);
                }}
                className="w-full h-full object-contain z-10 relative transition-all duration-700 cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Nav Buttons */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition shadow-md"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition shadow-md"
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {pg.images.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full ${
                i === currentImageIndex ? 'bg-white scale-125' : 'bg-white/60'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Modal Image View */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <img
            src={modalImage}
            alt="Full View"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-6 right-6 text-white text-2xl font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default AutoScrollSlider;
