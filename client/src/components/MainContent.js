import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/MainContent.css';
import { Link, useParams } from 'react-router-dom';
import { addToHistory } from '../utils/history';

function MainContent() {
    const { id } = useParams();
    const [sliderNews, setSliderNews] = useState([]);
    const [singleNews, setSingleNews] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://se3355-newsportal-backend.onrender.com/api/news/${id}`)
                .then((res) => {
                    setSingleNews(res.data);
                    if (res.data?.title) {
                        addToHistory(res.data.title);

                    }
                })
                .catch((err) => console.error('Failed to fetch news:', err));
        } else {
            axios.get('https://se3355-newsportal-backend.onrender.com/api/slider_news')
                .then((res) => setSliderNews(res.data))
                .catch((err) => console.error('Failed to fetch slider news:', err));
        }
    }, [id]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: true
    };

    if (id && singleNews) {
        return (
            <div className="main-content">
                <h2>{singleNews.title}</h2>
                {singleNews.image_url && (
                    <img src={singleNews.image_url} alt={singleNews.title} className="detail-img" />
                )}
                <p>{singleNews.content || 'No content available.'}</p>
                <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="main-content">
            <h2>Latest News</h2>
            <Slider {...settings}>
                {sliderNews.map((news, index) => (
                    <div key={index} className="news-item">
                        <Link to={`/news/${news.id}`}>
                            <h3>{news.title}</h3>
                            {news.image_url && (
                                <img src={news.image_url} alt={news.title} />
                            )}
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default MainContent;
