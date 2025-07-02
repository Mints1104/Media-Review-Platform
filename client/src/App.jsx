import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateReview from './pages/CreateReview';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import EditReview from './pages/EditReview';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/create-review" element={<CreateReview />} />
            <Route path="/edit-review/:id" element={<EditReview />} />
          </Route>

        </Routes>
      </div>
    </>
  );
}

export default App;