import React, { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import axios from "axios";
import Loader from "../components/Loader";

const ListingsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [pgData, setPgData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // ✅ Split data into 3 groups
  const featured = pgData
    .filter(pg => pg.isFeatured)
    .sort((a, b) => Number(a.id_room) - Number(b.id_room));

  const available = pgData
    .filter(pg => !pg.isFeatured && !pg.soldOut)
    .sort(() => Math.random() - 0.5);  // shuffle randomly

  const sold = pgData.filter(pg => pg.soldOut);

  // ✅ Combine: featured first, then random available, then sold
  const finalSortedList = [...featured, ...available, ...sold];

  return (
    <div className="bg-[#F0F1F3] text-gray-800 min-h-screen flex flex-col">
      <main className="flex-grow px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">All PG Listings</h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {finalSortedList.length > 0 ? (
              finalSortedList.map((pg, idx) => (
                <ListingCard pg={pg} key={idx} />
              ))
            ) : (
              <p className="text-center col-span-full">No PGs found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ListingsPage;
