import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import axios from "axios";
import Loader from "../components/Loader";

const ListingsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [pgData, setPgData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState("");
  const [areaFilter, setAreaFilter] = useState("");

  const priceRanges = [
    { label: "3000 - 6000", min: 3000, max: 6000 },
    { label: "6000 - 8000", min: 6001, max: 8000 },
    { label: "8000 - 10000", min: 8001, max: 10000 },
    { label: "10000 - 12000", min: 10001, max: 12000 },
    { label: "12000+", min: 12001, max: Infinity },
  ];

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/pg/allpg`);
        const data = res.data.data || [];
        setPgData(data);
      } catch (error) {
        console.error("Error fetching PG listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  const getUniqueAreas = () => {
    const areas = pgData.map((pg) => pg.area);
    return [...new Set(areas)];
  };

  const filteredData = pgData.filter((pg) => {
    let priceMatch = true;
    let areaMatch = true;

    if (priceRange) {
      const range = priceRanges.find((r) => r.label === priceRange);
      priceMatch = pg.rent >= range.min && pg.rent <= range.max;
    }

    if (areaFilter) {
      areaMatch = pg.area === areaFilter;
    }

    return priceMatch && areaMatch;
  });

  const featured = filteredData
    .filter((pg) => pg.isFeatured)
    .sort((a, b) => Number(a.id_room) - Number(b.id_room));

  const available = filteredData
    .filter((pg) => !pg.isFeatured && !pg.soldOut)
    .sort(() => Math.random() - 0.5);

  const sold = filteredData.filter((pg) => pg.soldOut);

  const finalSortedList = [...featured, ...available, ...sold];

  return (
    <div className="text-gray-800 min-h-screen">
        <h2 className="text-3xl font-bold text-center mt-2 mb-2">All PG Listings</h2>
        <hr className="border-t border-gray-300 my-4 mx-5" />
      <main className="flex flex-col md:flex-row px-4 md:px-10 py-10 gap-8">

        {/* Sidebar Filters (Left on md+, Top on mobile) */}
        <aside>
          <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Filters</h3>

            <div className="mb-4">
              <label className="block font-medium mb-1">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">All Prices</option>
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    Rs: {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Area</label>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">All Areas</option>
                {getUniqueAreas().map((area, idx) => (
                  <option key={idx} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* PG Listings */}
        <section className="flex-1">

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {finalSortedList.length > 0 ? (
                finalSortedList.map((pg, idx) => (
                  <ListingCard pg={pg} key={idx} />
                ))
              ) : (
                <p className="text-center col-span-full">No PGs found.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ListingsPage;
