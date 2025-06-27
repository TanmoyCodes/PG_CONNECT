import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState('LPU Area');
  const [gender, setGender] = useState('Any');
  const [seater, setSeater] = useState('Any');
  const [price, setPrice] = useState('Any');

  const handleSearch = () => {
    navigate(
      `/search-results?area=${area}&gender=${gender}&seater=${seater}&price=${price}`
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl max-w-6xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">

      {/* Area Dropdown */}
      <div className="relative w-full md:w-1/3">
        <i className="fas fa-map-marker-alt absolute top-3.5 left-4 text-gray-400 pointer-events-none"></i>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="appearance-none w-full pl-10 pr-8 py-3 rounded-lg border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="LPU Area">LPU Area</option>
          <option value="Law Gate">Law Gate</option>
          <option value="Green Valley">Green Valley</option>
          <option value="Hardaspur">Hardaspur</option>
          <option value="Botany Colony">Botany Colony</option>
          <option value="Phagwara">Phagwara</option>
          <option value="Nanak Nagri">Nanak Nagri</option>
          <option value="Jalandhar">Jalandhar</option>
        </select>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-2/3">

        {/* Gender */}
        <div className="relative w-full md:w-1/3">
          <i className="fas fa-venus-mars absolute top-3.5 left-4 text-gray-400 pointer-events-none"></i>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="appearance-none w-full pl-10 pr-8 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option>Any</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Seater */}
        <div className="relative w-full md:w-1/3">
          <i className="fas fa-bed absolute top-3.5 left-4 text-gray-400 pointer-events-none"></i>
          <select
            value={seater}
            onChange={(e) => setSeater(e.target.value)}
            className="appearance-none w-full pl-10 pr-8 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option>Any</option>
            <option>Single</option>
            <option>Double</option>
            <option>Triple</option>
            <option>4+</option>
          </select>
        </div>

        {/* Price */}
        <div className="relative w-full md:w-1/3">
          <i className="fas fa-rupee-sign absolute top-3.5 left-4 text-gray-400 pointer-events-none"></i>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="appearance-none w-full pl-10 pr-8 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option>Any</option>
            <option value="0-3k">₹0 - ₹3000</option>
            <option value="3k-5k">₹3000 - ₹5000</option>
            <option value="5-8k">₹5000 - ₹8000</option>
            <option value="8-10k">₹8000 - ₹10000</option>
            <option value="10-15k">₹10000 - ₹15000</option>
            <option value="15k+">₹15000+</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full md:w-auto bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
      >
        <i className="fas fa-search mr-2"></i> Search
      </button>
    </div>
  );
};

export default SearchBar;
