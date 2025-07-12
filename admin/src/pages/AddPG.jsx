import React, { useState } from 'react';
import { PlusCircle, Trash2, BedDouble, User, Building, Landmark, Ruler, Coins, Zap, Clock, Calendar, UserCog, Bot, IndianRupee, UploadCloud, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

// --- UI COMPONENTS (Moved Outside of App) ---

// InputField Component
const InputField = ({ id, label, icon, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">{label}{props.required && <span className="text-red-500">*</span>}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</span>
      <input id={id} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...props} />
    </div>
  </div>
);

// SelectField Component
const SelectField = ({ id, label, icon, children, ...props }) => (
  <div>
   <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">{label}{props.required && <span className="text-red-500">*</span>}</label>
   <div className="relative">
     <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</span>
     <select id={id} className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...props}>{children}</select>
   </div>
 </div>
);

// Checkbox Group Rendering Function
// Note: handleCheckboxChange needs to be passed in as a prop now.
const renderCheckboxGroup = (title, data, section, handleCheckboxChange) => (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Object.keys(data).map(key => (
          <label key={key} className="flex items-center space-x-2 text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name={key}
              checked={data[key]}
              onChange={handleCheckboxChange} // Use the passed-in handler
              data-section={section}
              className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
          </label>
        ))}
      </div>
    </div>
);


// Main App Component
export default function App() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const initialState = {
    name: "",
    ImageFiles: [],
    area: "Law Gate",
    location: "",
    rent: "",
    securityAmount: 0,
    seater: "Single",
    gender: "Any",
    isFeatured: false,
    soldOut: false,
    amenities: {
      WiFi: false, AC: false, Locker: false, Cctv: false, Inverter: false,
      Kitchen: false, Parking: false, Balcony: false, Furnished: false,
      TV: false, FireSafety: false
    },
    whatsIncluded: {
      bedAndMattress: false, personalWardrobe: false, studyTable: false,
      cleaningService: false, geyser: false, highSpeedWifi: false,
      roPurifiedWater: false, cctv24x7: false, powerBackup: false
    },
    floor: "",
    roomNo: "",
    distanceFromAuto: "",
    distanceFromCollege: "",
    electricityPerUnit: "",
    isCoupleFriendly: false,
    isInternationalFriendly: false,
    isPetFriendly: false,
    ownerName: "",
    ownerNumber: "",
    caretakerName: "",
    caretakerNumber: "",
    description: "A nice PG located in a prime area with all amenities included.",
    note: "",
    isPublished: true,
    houseRules: {
      gateOpenTime: "06:00",
      gateCloseTime: "23:00",
      visitorAllowed: false,
      smokingAllowed: false,
      coupleFriendly: false
    },
    listingDate: new Date().toISOString().split('T')[0],
    listedBy: "",
    commission: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [imageUploads, setImageUploads] = useState([{ id: Date.now(), file: null, preview: null, error: null, isLoading: false, isUploaded: false }]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // --- HANDLER FUNCTIONS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, dataset } = e.target;
    const { section } = dataset;

    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: checked }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
  };

  const handleFileSelect = (id, file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImageUploads(prev => prev.map(up =>
      up.id === id ? { ...up, file, preview: previewUrl, error: null } : up
    ));
  };

  const addImageField = () => {
    setImageUploads(prev => [...prev, { id: Date.now(), file: null, preview: null, error: null, isLoading: false, isUploaded: false }]);
  };

  const removeImageField = (id) => {
    setImageUploads(prev => prev.filter(up => up.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedFiles = imageUploads.map(up => up.file).filter(Boolean);
    if (selectedFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsSubmitting(true);

    const form = new FormData();
    selectedFiles.forEach(file => {
      form.append("imageFiles", file);
    });

    // Append other form data, stringifying nested objects
    for (let key in formData) {
      if (key !== 'ImageFiles') { // Avoid appending the empty ImageFiles array
          if (typeof formData[key] === "object" && formData[key] !== null) {
            form.append(key, JSON.stringify(formData[key]));
          } else {
            form.append(key, formData[key]);
          }
      }
    }

    try {
      const res = await axios.post(`${apiUrl}/api/v1/pg/createpg`, form, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      const data = res.data;
      console.log(data);
      if (data.success) {
        alert("PG created successfully!");
        setFormData(initialState);
        setImageUploads([{ id: Date.now(), file: null, preview: null, error: null, isLoading: false, isUploaded: false }]);
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
      const errorMessage = err.response?.data?.message || "Failed to submit.";
      alert(errorMessage);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Add New PG/Room</h1>
            <p className="text-gray-500 mt-2">Fill in the details below to create a new listing. Fields marked with <span className="text-red-500">*</span> are required.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="p-6 bg-white rounded-xl shadow-md">
             <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Basic Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <InputField id="name" name="name" label="Property Name" value={formData.name} onChange={handleChange} placeholder="e.g., Sunrise PG" required icon={<Building size={18}/>} />
               
               <SelectField id="area" name="area" label="Area" value={formData.area} onChange={handleChange} required icon={<Landmark size={18}/>}>
                   <option value="Law Gate">Law Gate</option>
                   <option value="Green Valley">Green Valley</option>
                   <option value="Botany Colony">Botany Colony</option>
                   <option value="Jazzy Properties">Jazzy Properties</option>
                   <option value="Hardaspur">Hardaspur</option>
                   <option value="Phagwara">Phagwara</option>
                   <option value="Nanak Nagri">Nanak Nagri</option>
                   <option value="Jalandhar">Jalandhar</option>
               </SelectField>

               <InputField id="location" name="location" label="Location/City" value={formData.location} onChange={handleChange} placeholder="e.g., LPU, Jalandhar" required icon={<Landmark size={18}/>} />
               <InputField id="rent" name="rent" type="number" label="Rent per Month" value={formData.rent} onChange={handleChange} placeholder="e.g., 7500" required icon={<IndianRupee size={18}/>} />
               <SelectField id="seater" name="seater" label="Seater Type" value={formData.seater} onChange={handleChange} icon={<BedDouble size={18}/>}>
                 <option>Single</option>
                 <option>Double</option>
                 <option>Triple</option>
                 <option>Four</option>
               </SelectField>
               <SelectField id="gender" name="gender" label="Gender" value={formData.gender} onChange={handleChange} icon={<User size={18}/>}>
                 <option>Any</option>
                 <option>Male</option>
                 <option>Female</option>
               </SelectField>
             </div>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Images <span className="text-red-500">*</span></h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imageUploads.map((upload) => (
                <div key={upload.id} className="relative aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 flex-col group">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => handleFileSelect(upload.id, e.target.files[0])}
                    disabled={upload.isLoading || upload.isUploaded}
                  />
                  {!upload.preview && !upload.isLoading && <UploadCloud size={32} />}
                  {upload.preview && <img src={upload.preview} alt="preview" className="w-full h-full object-cover rounded-md" />}

                  {upload.isLoading && (
                    <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-md">
                        <Loader2 className="animate-spin text-indigo-600" size={32}/>
                        <p className="text-sm font-medium text-indigo-600 mt-2">Uploading...</p>
                    </div>
                  )}

                  {upload.isUploaded && (
                    <div className="absolute inset-0 bg-green-500/80 flex flex-col items-center justify-center rounded-md text-white">
                        <CheckCircle2 size={32}/>
                        <p className="text-sm font-bold mt-2">Uploaded</p>
                    </div>
                  )}
                  
                  {upload.error && (
                    <div className="absolute bottom-0 w-full bg-red-500/80 p-1 rounded-b-md text-white text-xs text-center">
                        {upload.error}
                    </div>
                  )}
                  
                  { (upload.file || upload.isUploaded) && !upload.isLoading && (
                      <button 
                        type="button" 
                        onClick={() => removeImageField(upload.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                          <Trash2 size={16}/>
                      </button>
                  )}
                </div>
              ))}
               <button 
                 type="button" 
                 onClick={addImageField} 
                 className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                 title="Add another image"
               >
                 <PlusCircle size={32} />
               </button>
            </div>
             <p className="text-xs text-gray-500 mt-4">At least one image is required. Click on the placeholder to select a file.</p>
          </div>
          
          {/* Now pass the handler function to the render function */}
          {renderCheckboxGroup("Amenities", formData.amenities, "amenities", handleCheckboxChange)}
          {renderCheckboxGroup("What's Included", formData.whatsIncluded, "whatsIncluded", handleCheckboxChange)}
          
          <div className="p-6 bg-white rounded-xl shadow-md">
             <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Room & Location Details</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <InputField id="floor" name="floor" type="number" label="Floor" value={formData.floor} onChange={handleChange} placeholder="e.g., 2" required icon={<Building size={18}/>} />
               <InputField id="roomNo" name="roomNo" type="text" label="Room No" value={formData.roomNo} onChange={handleChange} placeholder="e.g., 101" required icon={<BedDouble size={18}/>} />
               <InputField id="distanceFromAuto" name="distanceFromAuto" type="number" label="Auto Stand (m)" value={formData.distanceFromAuto} onChange={handleChange} placeholder="e.g., 300" required icon={<Ruler size={18}/>} />
               <InputField id="distanceFromCollege" name="distanceFromCollege" type="number" label="College (m)" value={formData.distanceFromCollege} onChange={handleChange} placeholder="e.g., 500" required icon={<Ruler size={18}/>} />
               <InputField id="electricityPerUnit" name="electricityPerUnit" type="number" label="Electricity / Unit" value={formData.electricityPerUnit} onChange={handleChange} placeholder="e.g., 10" required icon={<Zap size={18}/>}/>
               <InputField id="securityAmount" name="securityAmount" type="number" label="Security Amount" value={formData.securityAmount} onChange={handleChange} placeholder="e.g., 7000" required icon={<IndianRupee size={18}/>}/>
             </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
             <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Contact Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <InputField id="ownerName" name="ownerName" label="Owner Name" value={formData.ownerName} onChange={handleChange} placeholder="Rajesh Kumar" required icon={<User size={18}/>}/>
               <InputField id="ownerNumber" name="ownerNumber" type="tel" label="Owner Number" value={formData.ownerNumber} onChange={handleChange} placeholder="9876543210" required icon={<User size={18}/>}/>
               <InputField id="caretakerName" name="caretakerName" label="Caretaker Name" value={formData.caretakerName} onChange={handleChange} placeholder="Suresh" required icon={<UserCog size={18}/>}/>
               <InputField id="caretakerNumber" name="caretakerNumber" type="tel" label="Caretaker Number" value={formData.caretakerNumber} onChange={handleChange} placeholder="9123456789" required icon={<UserCog size={18}/>}/>
             </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
             <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-3">Descriptions</h3>
             <div>
               <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Property Description</label>
               <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" placeholder="A brief description of the property..."></textarea>
             </div>
             <div>
               <label htmlFor="note" className="block text-sm font-medium text-gray-600 mb-1">Internal Note (optional)</label>
               <textarea id="note" name="note" rows="2" value={formData.note} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" placeholder="Any internal notes..."></textarea>
             </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">House Rules & Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField id="gateOpenTime" name="gateOpenTime" type="time" label="Gate Open Time" value={formData.houseRules.gateOpenTime} onChange={(e) => setFormData(prev => ({...prev, houseRules: {...prev.houseRules, gateOpenTime: e.target.value }}))} icon={<Clock size={18}/>} />
              <InputField id="gateCloseTime" name="gateCloseTime" type="time" label="Gate Close Time" value={formData.houseRules.gateCloseTime} onChange={(e) => setFormData(prev => ({...prev, houseRules: {...prev.houseRules, gateCloseTime: e.target.value }}))} icon={<Clock size={18}/>} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                    <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleCheckboxChange} className="h-5 w-5 rounded"/><span>Featured</span>
                </label>
                 <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                    <input type="checkbox" name="soldOut" checked={formData.soldOut} onChange={handleCheckboxChange} className="h-5 w-5 rounded"/><span>Sold Out</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                    <input type="checkbox" name="isCoupleFriendly" checked={formData.isCoupleFriendly} onChange={handleCheckboxChange} className="h-5 w-5 rounded"/><span>Couple Friendly</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                    <input type="checkbox" name="isInternationalFriendly" checked={formData.isInternationalFriendly} onChange={handleCheckboxChange} className="h-5 w-5 rounded"/><span>Int'l Friendly</span>
                </label>
                 <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                    <input type="checkbox" name="isPetFriendly" checked={formData.isPetFriendly} onChange={handleCheckboxChange} className="h-5 w-5 rounded"/><span>Pet Friendly</span>
                </label>
                 <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                    <input type="checkbox" name="visitorAllowed" checked={formData.houseRules.visitorAllowed} data-section="houseRules" onChange={handleCheckboxChange} className="h-5 w-5 rounded"/><span>Visitors Allowed</span>
                </label>
                 <label className="flex items-center space-x-2 text-gray-700 cursor-pointer">
                    <input type="checkbox" name="smokingAllowed" checked={formData.houseRules.smokingAllowed} data-section="houseRules" onChange={handleCheckboxChange} className="h-5 w-5 rounded"/><span>Smoking Allowed</span>
                </label>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md">
             <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Listing Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <InputField id="listedBy" name="listedBy" label="Listed By" value={formData.listedBy} onChange={handleChange} placeholder="e.g., PG Plus Brokers" icon={<Bot size={18}/>} />
               <InputField id="commission" name="commission" type="number" label="Commission" value={formData.commission} onChange={handleChange} placeholder="e.g., 2000" icon={<Coins size={18}/>} />
               <InputField id="listingDate" name="listingDate" type="date" label="Listing Date" value={formData.listingDate} onChange={handleChange} readOnly icon={<Calendar size={18}/>} />
               <div className="flex items-center pt-6">
                   <label className="flex items-center space-x-2 text-gray-700 cursor-pointer text-lg">
                       <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleCheckboxChange} className="h-5 w-5 rounded"/>
                       <span>Publish this listing immediately</span>
                   </label>
               </div>
             </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button 
                type="submit" 
                className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transform transition-all duration-150 ease-in-out hover:scale-105 disabled:opacity-75 disabled:scale-100 flex items-center justify-center"
                disabled={isSubmitting || imageUploads.some(i => i.isLoading)}
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                {isSubmitting ? 'Submitting...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}