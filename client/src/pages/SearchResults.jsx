import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import axios from "axios";


const SearchResult = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [pgData, setPgData] = useState([]);
    const [loading, setLoading] = useState(true);

  const selectedArea = searchParams.get("area");  // changed from location
  const gender = searchParams.get("gender");
  const seater = searchParams.get("seater");
  const price = searchParams.get("price");

  const filterPGs = () => {
  const isAllDefault =
    selectedArea === "LPU Area" &&
    gender === "Any" &&
    seater === "Any" &&
    price === "Any";

  return pgData
    .filter((pg) => {
      if (isAllDefault) return true; // Return all PGs if all filters are default

      const matchesArea = selectedArea === "LPU Area" || pg.area === selectedArea;
      const matchesGender = 
  gender === "Any" 
    ? true 
    : pg.gender === gender || pg.gender === "Any";
      const matchesSeater = seater === "Any" || pg.seater === seater;

      // Price filter
      let matchesPrice = true;
      if (price !== "Any" && pg.price) {
        const numPrice = Number(pg.price);
        if (price === "0-3k") matchesPrice = numPrice <= 3000;
        else if (price === "3k-5k") matchesPrice = numPrice > 3000 && numPrice <= 5000;
        else if (price === "5-8k") matchesPrice = numPrice > 5000 && numPrice <= 8000;
        else if (price === "8-10k") matchesPrice = numPrice > 8000 && numPrice <= 10000;
        else if (price === "10-15k") matchesPrice = numPrice > 10000 && numPrice <= 15000;
        else if (price === "15k+") matchesPrice = numPrice > 15000;
      }

      return matchesArea && matchesGender && matchesSeater && matchesPrice;
    })
    .sort((a, b) => {
      if (a.isFeatured === b.isFeatured) return 0;
      return a.isFeatured ? -1 : 1;
    });
};


   useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/pg/allpg`);
        const data=res.data.data;
        console.log(data);
        setPgData(data);
      } catch (error) {
        console.error("Error fetching PG listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  const filteredPGs = filterPGs();

  return (
    <div className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Search Results</h2>
      {filteredPGs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPGs.map((pg,idx) => (
            <ListingCard key={idx} pg={pg} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No PGs match your filters.</p>
      )}
    </div>
  );
};

export default SearchResult;