import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeaturedPGs = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [pgData, setPgData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
      const fetchPGs = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${apiUrl}/api/v1/pg/allpg`)
          const data=res.data.data;
          setPgData([...data]);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching PG listings:", error);
          setError("Failed to load PG listings."); 
          setError(true);
        }
      };  
  
      fetchPGs();
    }, []);

  const featuredPGs = pgData;

  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured PGs</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              featuredPGs.length>0?featuredPGs.map((pg,idx) => (
                <ListingCard key={idx} pg={pg} />
              )):<div></div>
            }
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/listings")}
              className="bg-white border border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-600 hover:text-white transition duration-300"
            >
              View More
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedPGs;
