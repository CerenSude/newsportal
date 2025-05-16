import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [financeData, setFinanceData] = useState(null);

    useEffect(() => {
        fetch('/api/finance')

            .then((res) => {
                console.log('Raw response:', res); // 👈 DEBUG
                return res.json();
            })
            .then((data) => {
                console.log('Fetched finance data:', data); // 👈 DEBUG
                setFinanceData(data);
            })
            .catch((err) => {
                console.error('Finance fetch error:', err);
                setFinanceData([]);
            });
    }, []);


    const renderChange = (change) => {
        const isUp = parseFloat(change) >= 0;
        return (
            <span className={isUp ? 'up' : 'down'}>
                {isUp ? '▲' : '▼'}
                {change}%
            </span>
        );
    };

    const toggleDropdown = (item) => {
        setOpenDropdown(openDropdown === item ? null : item);
    };

    return (
        <header>
            {/* Top menu */}
            <nav className="top-nav">
                <ul className="nav-list">
                    <li><a href="#">Son Dakika</a></li>
                    <li><a href="#">Yazarlar</a></li>

                    {/* Dropdown for Gündem */}
                    <li
                        className="has-dropdown"
                        onMouseEnter={() => toggleDropdown("gundem")}
                        onMouseLeave={() => toggleDropdown(null)}
                    >
                        <a href="#">Gündem ▾</a>
                        {openDropdown === "gundem" && (
                            <ul className="dropdown-menu">
                                <li><a href="#">Politika</a></li>
                                <li><a href="#">Seçim</a></li>
                                <li><a href="#">Meclis</a></li>
                            </ul>
                        )}
                    </li>

                    <li><a href="#">Ekonomi</a></li>
                    <li><a href="#">Dünya</a></li>
                    <li><a href="#">Günün İçinden</a></li>

                    {/* Dropdown for Spor */}
                    <li
                        className="has-dropdown"
                        onMouseEnter={() => toggleDropdown("spor")}
                        onMouseLeave={() => toggleDropdown(null)}
                    >
                        <a href="#">Spor ▾</a>
                        {openDropdown === "spor" && (
                            <ul className="dropdown-menu">
                                <li><a href="#">Futbol</a></li>
                                <li><a href="#">Basketbol</a></li>
                                <li><a href="#">Voleybol</a></li>
                            </ul>
                        )}
                    </li>

                    <li><a href="#">Hayat</a></li>
                    <li><a href="#">Magazin</a></li>
                    <li><a href="#">Finans</a></li>
                    <li><a href="#">Resmi İlanlar</a></li>
                </ul>
            </nav>

            {/* Currency and market info bar */}
            <div className="currency-bar">
                {financeData === null ? (
                    <span>Loading...</span>
                ) : financeData.length === 0 ? (
                    <span>No finance data</span>
                ) : (
                    financeData.map((item, index) => (
                        <span key={index}>
                            {item.name} {item.value} {renderChange(item.change)}
                        </span>
                    ))
                )}
            </div>
        </header>
    );
};

export default Navbar;
