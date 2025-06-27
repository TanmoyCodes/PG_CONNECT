import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  ChevronLeft, ChevronRight, CheckCircle, School, Car, MapPin, Info, BedDouble, Wind, ShieldQuestion, HeartHandshake,
  Globe,
  PawPrint,
  Clock,
  Users,
  Cigarette,
  Handshake, 
  Banknote,
  MessageSquare, Calendar, Award, PhoneCall
} from 'lucide-react';

const PGDetailsPage = () => {
   const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const primaryColor = '#e8000c';

  useEffect(() => {
    const fetchPGDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/pg/byid/${id}`);
        const data=response.data.data;
        setPg(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load PG details');
        console.error('Error fetching PG details:', err);
        setLoading(false);
      }
    };

    fetchPGDetails();
  }, [id]);

 const nextImage = () =>
  setCurrentImageIndex((p) => (p + 1) % pg.images.length);
const prevImage = () =>
  setCurrentImageIndex((p) => (p - 1 + pg.images.length) % pg.images.length);

  if (loading) return <div className="text-center py-20 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-20 text-lg text-red-600">{error}</div>;
  if (!pg) return <div className="text-center py-20 text-xl font-bold" style={{ color: primaryColor }}>PG Not Found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-24 lg:pb-0">
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT COLUMN (Images + Main Info) */}
      <main className="lg:col-span-2 space-y-6">

        {/* Image slider now inside left column */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] shadow-xl rounded-2xl overflow-hidden">
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
          className="w-full h-full object-contain z-10 relative transition-all duration-700"
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


        {/* PG Name + Badge */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-3 ${
                pg.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
              }`}>
                For {pg.gender}
              </span>
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{pg.name}</h1>
                {pg.is_featured && (
                  <span className="bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                    Featured
                  </span>
                )}
              </div>
                  <p className="flex items-center text-gray-600 mt-2"><MapPin className="w-5 h-5 mr-2" />{pg.area}, {pg.location}</p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0 ml-0 sm:ml-4 mt-4 sm:mt-0">
                  <p className="text-4xl font-extrabold" style={{ color: primaryColor }}>₹{pg.rent.toLocaleString('en-IN')}</p>
                  <p className="text-gray-500">/ per month</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-200">
                <div className="p-2 flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl" style={{ color: primaryColor }}>{pg.seater}</p>
                  <p className="text-sm text-gray-500">Seater</p>
                </div>
                <div className="p-2 flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl text-gray-800">{pg.floor === 0 ? 'Ground' : pg.floor} <span className="text-lg font-medium">Floor</span></p>
                  <p className="text-sm text-gray-500">Room #{pg.roomNo}</p>
                </div>
                <div className="p-2 flex flex-col justify-center items-center">
                  <div className="flex items-baseline font-bold text-2xl text-gray-800">{pg.distanceFromCollege}<span className="text-lg font-medium ml-1">m</span></div>
                  <p className="text-sm text-gray-500 flex items-center"><School size={14} className="mr-1" />from College</p>
                </div>
                <div className="p-2 flex flex-col justify-center items-center">
                  <div className="flex items-baseline font-bold text-2xl text-gray-800">{pg.distanceFromAuto}<span className="text-lg font-medium ml-1">m</span></div>
                  <p className="text-sm text-gray-500 flex items-center"><Car size={14} className="mr-1" />from Auto</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-3 text-gray-800">About this place</h2>
              <p className="text-gray-700 leading-relaxed">{pg.description}</p>
              {pg.note && (
                <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <div className="flex items-start">
                    <Info size={20} className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-800">A quick note</h4>
                      <p className="text-sm text-blue-700">{pg.note}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-5 text-gray-800">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8">
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700 border-b pb-2 mb-3 flex items-center"><BedDouble size={18} className="mr-2" />Basic Comforts</h3>
                  {pg.whatsIncluded.bedAndMattress && <p className="flex items-center text-gray-600"><CheckCircle size={16} className="text-green-500 mr-2" />Bed & Mattress</p>}
                  {pg.whatsIncluded.personalWardrobe && <p className="flex items-center text-gray-600"><CheckCircle size={16} className="text-green-500 mr-2" />Personal Wardrobe</p>}
                  {pg.whatsIncluded.studyTable && <p className="flex items-center text-gray-600"><CheckCircle size={16} className="text-green-500 mr-2" />Study Table & Chair</p>}
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700 border-b pb-2 mb-3 flex items-center"><Wind size={18} className="mr-2" />Services</h3>
                  {pg.whatsIncluded.cleaningService && <p className="flex items-center text-gray-600"><CheckCircle size={16} className="text-green-500 mr-2" />Cleaning Service</p>}
                  {pg.whatsIncluded.geyser && <p className="flex items-center text-gray-600"><CheckCircle size={16} className="text-green-500 mr-2" />Geyser</p>}
                  {pg.whatsIncluded.highSpeedWifi && <p className="flex items-center text-gray-600"><CheckCircle size={16} className="text-green-500 mr-2" />High-Speed Wi-Fi</p>}
                  {pg.whatsIncluded.roPurifiedWater && <p className="flex items-center text-gray-600"><CheckCircle size={16} className="text-green-500 mr-2" />RO Purified Water</p>}
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700 border-b pb-2 mb-3 flex items-center"><ShieldQuestion size={18} className="mr-2" />Safety & Security</h3>
                  {pg.whatsIncluded.cctv24x7 && <p className="flex items-center text-gray-600"><CheckCircle size={16} className="text-green-500 mr-2" />24x7 CCTV</p>}
                  {pg.whatsIncluded.powerBackup && <p className="flex items-center text-gray-600"><CheckCircle size={16} className="text-green-500 mr-2" />Power Backup</p>}
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
  <h2 className="text-2xl font-bold mb-5 text-gray-800">House Rules</h2>
{/* Gate Timings Section */}
<div className=" mb-6">
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Gate Opens */}
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
      <Clock size={20} className="text-green-500" />
      <div>
        <p className="text-sm text-gray-500">Gate Opens</p>
        <p className="text-base font-medium text-gray-800">{pg.houseRules?.gateOpenTime || 'Always'}</p>
      </div>
    </div>

    {/* Gate Closes */}
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
      <Clock size={20} className="text-red-500" />
      <div>
        <p className="text-sm text-gray-500">Gate Closes</p>
        <p className="text-base font-medium text-gray-800">{pg.houseRules?.gateCloseTime || 'Never'}</p>
      </div>
    </div>
  </div>
</div>

{/* Badges in grid with compact width */}
<div className="flex flex-wrap gap-3 mb-6">

  {/* Couple Friendly */}
  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${pg.houseRules?.coupleFriendly ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
    <HeartHandshake size={16} />
    {pg.houseRules?.coupleFriendly ? 'Couple Friendly' : 'Not Couple Friendly'}
  </span>

  {/* Visitors Allowed */}
  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${pg.houseRules?.visitorAllowed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
    <Users size={16} />
    {pg.houseRules?.visitorAllowed ? 'Visitors Allowed' : 'No Visitors'}
  </span>

  {/* Smoking Allowed */}
  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${pg.houseRules?.smokingAllowed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
    <Cigarette size={16} />
    {pg.houseRules?.smokingAllowed ? 'Smoking Allowed' : 'No Smoking'}
  </span>

  {/* International Friendly */}
  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${pg.isInternationalFriendly ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
    <Globe size={16} />
    {pg.isInternationalFriendly ? 'International Friendly' : 'No International Guests'}
  </span>

  {/* Pet Friendly */}
  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${pg.isPetFriendly ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
    <PawPrint size={16} />
    {pg.isPetFriendly ? 'Pets Allowed' : 'No Pets'}
  </span>

  {/* Security Deposit */}
  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
    <Banknote size={16} />
    Security Deposit: ₹{pg.securityAmount}
  </span>
</div>



</div>
          </main>
          <aside className="lg:col-span-1 space-y-6">
  {/* --- Interested CTA Box --- */}
  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg text-center">
    <h2 className="text-2xl font-bold mb-4">Interested?</h2>
    <p className="mb-6 text-blue-100">Book your perfect room before it’s gone!</p>
    <div className="flex flex-col gap-3">
      <a
  href="tel:9863258533"
  className="w-full flex items-center justify-center bg-white text-blue-700 font-bold px-4 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 mr-2"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.72 11.72 0 003.64.58 1 1 0 011 1v3.61a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.61a1 1 0 011 1 11.72 11.72 0 00.58 3.64 1 1 0 01-.21 1.11l-2.2 2.2z" />
  </svg>
  Call Now
</a>

      <a
  href="https://wa.me/919863258533"
  target="_blank"
  rel="noopener noreferrer"
  className="w-full flex items-center justify-center bg-green-500 font-bold px-4 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
>
  <MessageSquare className="w-5 h-5 mr-2" /> Chat on WhatsApp
</a>

    </div>
  </div>

  

  {/* --- Listing Details (only if published) --- */}
  {pg.isPublished && (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Listing Details</h2>
      <ul className="space-y-3 text-gray-800 text-sm">
        <li><strong>Listed By:</strong> {pg.listedBy}</li>
        
        <li><strong>Listing Date:</strong> {new Date(pg.listingDate).toLocaleDateString()}</li>
      </ul>
    </div>
  )}

  <div className="bg-white border-2 border-dashed border-yellow-500 p-5 rounded-2xl shadow-lg text-center">
                  <Award className="w-10 h-10 mx-auto text-yellow-500 mb-2"/>
                  <h3 className="text-lg font-bold text-gray-800">Refer a Friend & Save!</h3>
                  <p className="text-gray-600 mt-1">Get upto <span className="font-bold text-green-600">₹500 off</span> your next month's rent when your friend books with us.</p>
               </div>
               <div className="lg:hidden fixed bottom-5 left-2 right-2 z-50">
  <button className="w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold px-4 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
    <MessageSquare className="w-5 h-5 mr-2" /> I'm Interested
  </button>
</div>
</aside>

        </div>
      </div>
    </div>
  );
};

export default PGDetailsPage;