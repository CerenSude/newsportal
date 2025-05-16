import React from 'react';
import Navbar from './components/Navbar';
import StickyAds from './components/StickyAds';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

const App = () => {
    return (
        <>
            <Navbar />
            <div className="main-layout">
                <StickyAds />
                <MainContent />
                <RightPanel />
            </div>
        </>
    );
};

export default App;