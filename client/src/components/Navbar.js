import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';
import { getHistory } from '../utils/history';

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [financeData, setFinanceData] = useState(null);
    const [historyItems, setHistoryItems] = useState([]);

    useEffect(() => {
        setHistoryItems(getHistory());
        fetch('/api/finance')
            .then((res) => res.json())
            .then((data) => setFinanceData(data))
            .catch(() => setFinanceData([]));
    }, []);

    const toggleDropdown = (item) => {
        setOpenDropdown(openDropdown === item ? null : item);

        if (item === 'history') {
            const data = getHistory();
            console.log("History items loaded:", data);
            setHistoryItems(data);

        }
    };

    const renderChange = (change) => {
        const isUp = parseFloat(change) >= 0;
        return (
            <span className={isUp ? 'up' : 'down'}>
                {isUp ? '▲' : '▼'}
                {change}%
            </span>
        );
    };

    return (
        <header>
            <nav className="top-nav">
                <ul className="nav-list">
                    <li><a href="#">Son Dakika</a></li>
                    <li><a href="#">Yazarlar</a></li>

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

                    <li
                        className="has-dropdown"
                        onMouseEnter={() => toggleDropdown("history")}
                        onMouseLeave={() => toggleDropdown(null)}
                    >
                        <button>History ▾</button>
                        {openDropdown === 'history' && (
                            <ul className="dropdown-menu">
                                {historyItems.length === 0 ? (
                                    <li>No history found</li>
                                ) : (
                                    historyItems.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))
                                )}
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>

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
