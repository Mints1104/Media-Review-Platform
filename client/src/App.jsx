// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route

import Register from './pages/Register';
import Login from './pages/Login';
// import Home from './pages/Home'; // For later

function App() {
  return (
    <div className="container"> {/* You can apply basic styling to 'container' */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;