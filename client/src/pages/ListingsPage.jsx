import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import axios from "axios";

const ListingsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [pgData, setPgData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/pg/allpg`);
        const data=res.data.data;
        setPgData(data);
      } catch (error) {
        console.error("Error fetching PG listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  return (
    <div className="bg-[#F0F1F3] text-gray-800 min-h-screen flex flex-col">
      <main className="flex-grow px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">All PG Listings</h2>

        {loading ? (
          <p className="text-center">Loading PGs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...pgData]
              .sort((a, b) => (b.isFeatured === true) - (a.isFeatured === true))
              .map((pg ,idx) => (
                <ListingCard pg={pg} key={idx} />
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ListingsPage;
