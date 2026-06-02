import React from 'react'
import './news.css'
import { Link } from "react-router-dom";

const news = () => {
  return (
    <div className='main_news'>
        <h1>NEWS & ARTICLES</h1>
        <div className='content_div'>
            <div>
                <strong>
                    The Athens Independent reported that the city of 
                    Athens authorized Mayor Steve Patterson to contract with Grossman & Kelly ...
                </strong>
                <p>
                    Athens City Council passed an emergency ordinance to retain 
                    a New York law firm to represent its potential interests in the 
                    outcomes of three federal lawsuits
                </p>
                
                <Link className='learn_more' to="/extended_news">
                    LEARN MORE <i className="bi bi-arrow-right"></i>
                </Link>
            </div>
            <div>
                <strong>
                    “The Guardian” March 10, 2025: PFAS are poisoning 
                    our soil and polluting our lungs. The EPA is finally sounding the alarm ...
                </strong>
                <p>
                    A national problem with local consequences. The year Dark Waters was released, 
                    2019, many of us testified before Congress, urging lawmakers to take action on 
                    PFAS contamination…
                </p>
                <Link className='learn_more' to="/expanded_news2">
                    LEARN MORE <i className="bi bi-arrow-right"></i>
                </Link>
            </div>
            <div>
                <strong>
                    Social media platforms are often engineered to maximize user engagement, 
                    leading to addictive behaviors...
                </strong>
                <p>
                    This was the year that social media itself went viral—and not in a good way. 
                    In March, President Joe Biden threatened to ban the Chinese…
                </p>
                <Link className='learn_more' to="/expanded_news3">
                    LEARN MORE <i className="bi bi-arrow-right"></i>
                </Link>
            </div>
        </div>
        <Link className='learn_more' to="/news_page">
            <button className='view_button'>View all <i className="bi bi-arrow-right"></i></button>
        </Link>
        
    </div>
    
  )
}

export default news