import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPG() {
  const [formData, setFormData] = useState({ name: '', location: '', rent: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/pgs', formData); // Your MongoDB backend
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Location" onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
      <input placeholder="Rent" type="number" onChange={(e) => setFormData({ ...formData, rent: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddPG;
