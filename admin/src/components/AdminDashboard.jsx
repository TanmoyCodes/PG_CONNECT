import React, { useState, useMemo } from 'react';
import axios from 'axios';
import {
  PlusCircle,
  Trash2,
  Edit,
  Building,
  ShieldCheck,
  ShieldOff,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

// Confirmation Modal Component
const ConfirmationModal = ({ modal, setModal, onConfirm }) => {
  if (!modal.isOpen) return null;
  const isConfirmationValid = modal.type !== 'soldOut' || modal.userInput === modal.confirmationWord;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
        <div className="text-center">
          <AlertTriangle className="mx-auto text-red-500" size={48} />
          <h3 className="text-2xl font-bold text-gray-800 mt-4">{modal.title}</h3>
          <p className="text-gray-600 mt-2">{modal.message}</p>
        </div>
        {modal.type === 'soldOut' && (
          <div className="mt-6">
            <p className="text-sm text-center text-gray-500 mb-2">
              Type: <strong className="text-red-600 font-mono">{modal.confirmationWord}</strong>
            </p>
            <input
              type="text"
              value={modal.userInput}
              onChange={(e) => setModal(prev => ({ ...prev, userInput: e.target.value }))}
              className={`w-full border-2 rounded-lg p-3 text-center font-mono text-lg ${!isConfirmationValid && modal.userInput.length > 0 ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'} focus:ring-indigo-500 focus:outline-none`}
            />
          </div>
        )}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setModal({ isOpen: false })}
            className="py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
          >Cancel</button>
          <button
            onClick={onConfirm}
            disabled={!isConfirmationValid}
            className="py-2 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition"
          >Confirm</button>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
    <div className={`p-4 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// Main Admin Dashboard Component
const AdminDashboard = ({ setView, pgData, setPgData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState({ isOpen: false });

  const stats = useMemo(() => {
    const total = pgData.length;
    const sold = pgData.filter(pg => pg.soldOut).length;
    const active = total - sold;
    const totalCommission = pgData.reduce((sum, pg) => pg.soldOut ? sum + pg.commission : sum, 0);
    return { total, active, sold, totalCommission };
  }, [pgData]);

  const openModal = (type, pgId, pgName) => {
    const words = ['confirm', 'soldOut', 'done'];
    const word = words[Math.floor(Math.random() * words.length)];
    setModal({
      isOpen: true,
      type,
      pgId,
      title: type === 'soldOut' ? `Mark "${pgName}" as Sold Out?` : `Delete "${pgName}"?`,
      message: type === 'soldOut' ? "Confirm sold out action." : "This action cannot be undone.",
      confirmationWord: word,
      userInput: ''
    });
  };

  const handleConfirmAction = async () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { type, pgId } = modal;

    if (type === 'soldOut') {
      try {
        const currentPg = pgData.find(pg => pg.id_room === pgId);
        const updatedStatus = !currentPg.soldOut;

        const response = await axios.patch(`${apiUrl}/api/v1/pg/update`, {
          _id: currentPg._id,
          soldOut: updatedStatus,
        },{withCredentials:true});

        // console.log(response);
        if (response.status === 200) {
          setPgData(prev =>
            prev.map(pg =>
              pg.id_room === pgId ? { ...pg, soldOut: updatedStatus } : pg
            )
          );
        }
      } catch (error) {
        console.error("Failed to update PG status:", error);
        alert("Failed to update PG status. Please try again.");
      }
    } else if (type === 'delete') {
      setPgData(prev => prev.filter(pg => pg.id_room !== pgId));
    }

    setModal({ isOpen: false });
  };

  

  return (
    <div className="space-y-8">
      <ConfirmationModal modal={modal} setModal={setModal} onConfirm={handleConfirmAction} />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total PGs" value={stats.total} icon={<Building size={24} className="text-white" />} color="bg-blue-500" />
        <StatCard title="Active" value={stats.active} icon={<ShieldCheck size={24} className="text-white" />} color="bg-green-500" />
        <StatCard title="Sold" value={stats.sold} icon={<ShieldOff size={24} className="text-white" />} color="bg-red-500" />
        <StatCard title="Commission" value={`₹${stats.totalCommission.toLocaleString('en-IN')}`} icon={<DollarSign size={24} className="text-white" />} color="bg-yellow-500" />
      </div>

      {/* PG Listings Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Manage PG Listings</h2>
          <button onClick={() => setView('add-pg')} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700">
            <PlusCircle size={20} /> Add PG
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-4"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4">Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Rent</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pgData.filter(pg => pg.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(pg.id_room).includes(searchTerm)).map(pg => (
                <tr key={pg.id_room} className="border-b hover:bg-gray-50">
                  <td className="p-4">{pg.name}</td>
                  <td className="p-4">{pg.location}</td>
                  <td className="p-4">₹{pg.rent.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <button onClick={() => openModal('soldOut', pg.id_room, pg.name)} className={`px-3 py-1 rounded-full text-xs ${pg.soldOut ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {pg.soldOut ? 'Sold Out' : 'Available'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-500 hover:text-indigo-600"><Edit size={16} /></button>
                    <button onClick={() => openModal('delete', pg.id_room, pg.name)} className="ml-2 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {pgData.length === 0 && (
                <tr><td colSpan="5" className="text-center p-4 text-gray-500">No PG listings available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
