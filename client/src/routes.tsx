import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import './App.css';


const AppRoutes = () => {
    return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-point" element={<CreatePoint />} />
      </Routes>

    )
}

export default AppRoutes;
