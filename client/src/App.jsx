import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

import HomePage from './pages/Homepage';
import ListingsPage from './pages/ListingsPage';
import SearchResult from './pages/SearchResults'; 
import PGDetails from './pages/PGDetails';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/search-results" element={<SearchResult />} /> {/* ✅ Add this */}
        <Route path="/pg/:id" element={<PGDetails />} />

      </Routes>
      <Footer />
      <LoginModal />
    </Router>
  );
}

export default App;
