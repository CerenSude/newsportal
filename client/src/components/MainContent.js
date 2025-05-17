import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/MainContent.css';
import { Link, useParams } from 'react-router-dom';



function MainContent() {
    const { id } = useParams(); // this will be undefined on home (slider), or a value on detail
    const [sliderNews, setSliderNews] = useState([]);
    const [singleNews, setSingleNews] = useState(null);

    useEffect(() => {
        if (id) {
            // If there's an ID in the URL, fetch one news item
            axios.get(`/api/news/${id}`)
                .then((res) => setSingleNews(res.data))
                .catch((err) => console.error('Failed to fetch news:', err));
        } else {
            // If no ID, load all for slider
            axios.get('/api/slider_news')
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

    // If viewing a specific news item
    if (id && singleNews) {
        return (
            <div className="main-content">
                <h2>{singleNews.title}</h2>
                {singleNews.image_url && (
                    <img src={singleNews.image_url} alt={singleNews.title} className="detail-img" />
                )}
                <p>{singleNews.content || 'No content available.'}</p>
                <Link to="/">← Back to Home</Link>
            </div>
        );
    }

    // Default: show slider
    return (
        <div className="main-content">
            <h2>Latest News</h2>
            <Slider {...settings}>
                {sliderNews.map((news, index) => (
                    <div key={index} className="news-item">
                        <h3>{news.title}</h3>
                        {news.image_url && (
                            <Link to={`/news/${news.id}`}>
                                <img src={news.image_url} alt={news.title} />
                            </Link>
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default MainContent;
