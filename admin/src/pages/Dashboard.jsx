import React, { useState, useMemo, useEffect } from 'react';
import {
    PlusCircle, Trash2, Edit, Search, Building, ShieldCheck, ShieldOff,
    DollarSign, ArrowDownUp, Star, Home, LayoutDashboard, AlertTriangle,
    Loader2, Menu, X
} from 'lucide-react';
import AddPG from './AddPG';
import AdminDashboard from '../components/AdminDashboard';
import axios from 'axios';

const initialPgData = [
    { id_room: 101, name: "Sunrise PG", images: ["https://placehold.co/400x300/F4A261/FFF?text=Sunrise+PG"], area: "Law Gate", location: "LPU", rent: 7500, seater: "Double", gender: "Male", isFeatured: true, soldOut: false, commission: 2000, listingDate: "2025-06-10" },
];

export default function App() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [view, setView] = useState('dashboard');
    const [pgData, setPgData] = useState(initialPgData);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleNavClick = (newView) => {
        setView(newView);
        if (window.innerWidth < 768) { // md breakpoint in Tailwind
            setSidebarOpen(false);
        }
    };

    const getData=async()=>{
        try {
            const res=await axios.get(`${apiUrl}/api/v1/pg/admin/allpg`,{withCredentials:true});
            const data=res.data.data;
            setPgData(data);
            
        } catch (error) {
            console.log('error getPgData :',error);
        }
    }

    useEffect(()=>{
        getData();
    },[])
    

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-white p-6 border-r z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <Home size={24} className="text-indigo-600" />
                        <h1 className="text-xl font-bold text-gray-800">PG Admin</h1>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                        <X size={24} />
                    </button>
                </div>
                <ul className="space-y-2">
                    <li
                        className={`cursor-pointer p-2 rounded flex items-center ${view === 'dashboard' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
                        onClick={() => handleNavClick('dashboard')}
                    >
                        <LayoutDashboard className="mr-2" size={18} /> Dashboard
                    </li>
                     {/* Add other navigation items here */}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 md:p-6 overflow-y-auto">
                 {/* Header for Mobile */}
                <header className="md:hidden flex items-center justify-between mb-4 p-2 bg-white rounded-md shadow-sm">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>
                     <div className="flex items-center space-x-2">
                        <Home size={20} className="text-indigo-600" />
                        <h1 className="text-lg font-bold text-gray-800">PG Admin</h1>
                    </div>
                </header>

                {view === 'dashboard' && <AdminDashboard setView={setView} pgData={pgData} setPgData={setPgData} />}
                {view === 'add-pg' && <AddPG pgData={pgData} setPgData={setPgData} />}
            </main>
        </div>
    );
}