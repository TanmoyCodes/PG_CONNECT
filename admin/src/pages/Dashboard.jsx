import React, { useState, useMemo } from 'react';
import {
    PlusCircle, Trash2, Edit, Search, Building, ShieldCheck, ShieldOff,
    DollarSign, ArrowDownUp, Star, Home, LayoutDashboard, AlertTriangle,
    Loader2, Menu, X
} from 'lucide-react';
import AddPG from './AddPG';
import AdminDashboard from '../components/AdminDashboard';

const initialPgData = [
    { id_room: 101, name: "Sunrise PG", images: ["https://placehold.co/400x300/F4A261/FFF?text=Sunrise+PG"], area: "Law Gate", location: "LPU", rent: 7500, seater: "Double", gender: "Male", isFeatured: true, soldOut: false, commission: 2000, listingDate: "2025-06-10" },
    { id_room: 102, name: "Galaxy Homes", images: ["https://placehold.co/400x300/2A9D8F/FFF?text=Galaxy+Homes"], area: "Hardaspur", location: "Phagwara", rent: 6000, seater: "Single", gender: "Female", isFeatured: false, soldOut: true, commission: 1500, listingDate: "2025-05-20" },
    { id_room: 201, name: "Student Comforts", images: ["https://placehold.co/400x300/E9C46A/FFF?text=Student+Comforts"], area: "Law Gate", location: "LPU", rent: 8000, seater: "Triple", gender: "Male", isFeatured: false, soldOut: false, commission: 2500, listingDate: "2025-06-15" },
    { id_room: 305, name: "Peaceful Stay", images: ["https://placehold.co/400x300/264653/FFF?text=Peaceful+Stay"], area: "Deep Nagar", location: "Jalandhar", rent: 9000, seater: "Double", gender: "Any", isFeatured: true, soldOut: true, commission: 3000, listingDate: "2025-04-01" },
    { id_room: 410, name: "LPU Nest", images: ["https://placehold.co/400x300/E76F51/FFF?text=LPU+Nest"], area: "Law Gate", location: "LPU", rent: 7000, seater: "Single", gender: "Female", isFeatured: false, soldOut: false, commission: 1800, listingDate: "2025-06-22" },
];

export default function App() {
    const [view, setView] = useState('dashboard');
    const [pgData, setPgData] = useState(initialPgData);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleNavClick = (newView) => {
        setView(newView);
        if (window.innerWidth < 768) { // md breakpoint in Tailwind
            setSidebarOpen(false);
        }
    };

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