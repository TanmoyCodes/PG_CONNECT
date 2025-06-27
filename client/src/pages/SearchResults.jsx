import React from "react";
import { useLocation } from "react-router-dom";
import ListingCard from "../components/ListingCard";


const SearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const selectedArea = searchParams.get("area");  // changed from location
  const gender = searchParams.get("gender");
  const seater = searchParams.get("seater");
  const price = searchParams.get("price");

  const filterPGs = () => {
    return pgData
      .filter((pg) => {
        const matchesArea = selectedArea === "Any" || pg.area === selectedArea;
        const matchesGender = gender === "Any" || pg.gender === gender;
        const matchesSeater = seater === "Any" || pg.seater === seater;

        // Parse price range
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
        // Sort featured PGs to the top
        if (a.isFeatured === b.isFeatured) return 0;
        return a.isFeatured ? -1 : 1;
      });
  };

  const filteredPGs = filterPGs();

  return (
    <div className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Search Results</h2>
      {filteredPGs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPGs.map((pg) => (
            <ListingCard key={pg.id} pg={pg} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No PGs match your filters.</p>
      )}
    </div>
  );
};

export default SearchResult;
