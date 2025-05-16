import React from 'react';
import './styles/StickyAds.css';

const StickyAds = () => {
    return (
        <>
            {/* Left sticky ad */}
            <div className="sticky-ad sticky-left">
                <button className="close-btn" onClick={(e) => e.currentTarget.parentElement.style.display = 'none'}>×
                </button>
                <img src="/stickyads.jpeg" alt="Left Ad"/>
            </div>

            {/* Right sticky ad */}
            <div className="sticky-ad sticky-right">
                <button className="close-btn" onClick={(e) => e.currentTarget.parentElement.style.display = 'none'}>×
                </button>
                <img src="/stickyads.jpeg" alt="Right Ad Ad"/>
            </div>
        </>
    );
};

export default StickyAds;