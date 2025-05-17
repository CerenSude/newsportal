import React from 'react';
import Navbar from './components/Navbar';
import StickyAds from './components/StickyAds';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
    return (
        <div>
            <Navbar/>
            <StickyAds/>
            <div className="main-layout">
                <Routes>
                    {/* Home shows slider normally */}
                    <Route path="/" element={<MainContent/>}/>

                    {/* News detail page handled by MainContent too */}
                    <Route path="/news/:id" element={<MainContent/>}/>
                </Routes>
                <RightPanel />
            </div>
        </div>
    );
};

export default App;