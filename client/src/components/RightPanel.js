import React, { useEffect, useState } from 'react';
import './styles/RightPanel.css';
import axios from 'axios';

const RightPanel = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [dailyNews, setDailyNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/weather_forecast')
            .then(res => setWeatherData(res.data))
            .catch(err => console.error('Weather error:', err));

        axios.get('http://localhost:3001/api/daily-news')
            .then(res => setDailyNews(res.data))
            .catch(err => console.error('News error:', err));
    }, []);


    return (
        <div className="right-panel-container">

            {/* --- NEWS BOX --- */}
            <div className="daily-news-box">
                <div className="history-header">
                    <span className="history-title">Daily News</span>
                </div>
                <ul className="news-list">
                    {dailyNews.map((news, index) => (
                        <li key={index}>{news.title}</li>
                    ))}
                </ul>
            </div>

            {/* --- WEATHER BOX --- */}
            <div className="weather-box">
                <div className="weather-header">
                    <span>İzmir</span>
                    <span className="main-temp">{weatherData[0]?.high}°C</span>

                    {weatherData.map((day, index) => (
                        <div className="forecast-item" key={index}>
                            <div>{day.day}</div>
                            <img src={day.icon_url} alt={day.condition} />
                            <div>{day.high}° / {day.low}°</div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default RightPanel;
