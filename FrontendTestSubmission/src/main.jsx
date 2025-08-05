import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UrlShortener from './pages/UrlShortener';
import UrlStatsPage from './pages/UrlStatsPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UrlShortener />} />
      <Route path="/stats" element={<UrlStatsPage />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);