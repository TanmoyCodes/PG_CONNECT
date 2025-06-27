import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wifi, Cctv, Snowflake, Lock, ParkingCircle,
  Zap, Shirt, Plug2, Car, School, MapPin, UtilityPole, ChefHat, Armchair, FireExtinguisher, Tv2Icon,
  Tv2
} from 'lucide-react';

const ListingCard = ({ pg }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (pg.images && pg.images.length > 1) {
      const slideshowTimer = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % pg.images.length);
      }, 4000);
      return () => clearInterval(slideshowTimer);
    }
  }, [pg.images]);

  const AmenityIcon = ({ amenity }) => {
    const iconMap = {
      WiFi: <Wifi size={16} className="text-red-500" />,
      Cctv: <Cctv size={16} className="text-red-500" />,
      AC: <Snowflake size={16} className="text-red-500" />,
      Locker: <Lock size={16} className="text-red-500" />,
      Parking: <ParkingCircle size={16} className="text-red-500" />,
      Inverter: <Plug2 size={16} className="text-red-500" />,
      Laundry: <Shirt size={16} className="text-red-500" />,
      Kitchen: <ChefHat size={16} className="text-red-500" />,
      Balcony: <UtilityPole size={16} className="text-red-500" />,
      Furnished: <Armchair size={16} className="text-red-500" />,
      TV: <Tv2 size={16} className="text-red-500" />,
      FireSafety: <FireExtinguisher size={16} className="text-red-500" />,

    };
    return iconMap[amenity] || null;
  };

  // Get amenities as array of keys where value is true
  const activeAmenities = Object.keys(pg.amenities).filter(key => pg.amenities[key]);

  return (
    <Link to={`/pg/${pg._id}`} className="block group">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
        
        {/* SOLD OUT */}
        <div className="relative h-56 w-full overflow-hidden">
          {pg.soldOut && (
            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center z-20">
              <img
                src="https://www.freeiconspng.com/thumbs/sold-out-png/sold-out-png-31.png"
                alt="Sold Out"
                className="w-4/9 h-auto"
              />
            </div>
          )}
          {pg.isFeatured && (
            <div className="absolute top-4 left-4 bg-[#e7000b] text-white text-xs font-bold px-3 py-1 rounded-md z-20 shadow-lg  ring-white">
  FEATURED
</div>

          )}
          {pg.images?.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`${pg.name} view ${index + 1}`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${pg.soldOut ? 'grayscale' : ''} ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Unavailable';
              }}
            />
          ))}
          {pg.images && pg.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {pg.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/60'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span>{pg.gender} </span>
            <span>{pg.seater} Occupancy</span>
          </div>

          {/* PG ID and Name Row */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-bold text-gray-800 truncate">{pg.name}</h3>
            <div className="ml-3 text-xs font-medium text-white bg-gray-400 px-2 py-0.5 rounded whitespace-nowrap">
              Room ID: {pg.id_room}
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={14} className="mr-2 flex-shrink-0" />
            <p className="text-sm truncate">{pg.area}, {pg.location}</p>
          </div>

          <p className="text-2xl text-red-600 font-extrabold mb-4">
            ₹{pg.rent.toLocaleString('en-IN')}
            <span className="text-base font-medium text-gray-500">/month</span>
          </p>

          <hr className="mb-4" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700 flex-shrink-0">
            {activeAmenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <AmenityIcon amenity={amenity} />
                <span>{amenity}</span>
              </div>
            ))}
            {pg.electricityPerUnit && (
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-red-500" />
                <span>₹{pg.electricityPerUnit}/Unit</span>
              </div>
            )}
            {pg.distanceFromAuto && (
              <div className="flex items-center space-x-2">
                <Car size={16} className="text-red-500" />
                <span>{pg.distanceFromAuto}m to AutoStand</span>
              </div>
            )}
            {pg.distanceFromCollege && (
              <div className="flex items-center space-x-2">
                <School size={16} className="text-red-500" />
                <span>{pg.distanceFromCollege}m to College</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
