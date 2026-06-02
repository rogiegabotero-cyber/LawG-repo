/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import './extended_news.css'
import { Link } from "react-router-dom";

const expanded_news = () => {

      useState(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        document.title = "Social media platforms are often... – David Grossman & Associates";
    
        return () => {
          document.title = "David Grossman & Associates";
        };
      }, []);
    
  return (
    <div className='maindiv_athens'>
        <h2 className='orange_h2'>
            Social media platforms are often engineered to maximize user engagement, leading to addictive behaviors. 
            The American Psychological Association notes that extreme social media use can interfere with essential 
            activities such as sleep, physical exercise, academic responsibilities, and in-person social interactions. 
            This national issue has led to significant legal actions, notably Multidistrict Litigation (MDL) 3047
        </h2>
        <h2 className='bullet_h2'>
            • A national problem with local consequences
        </h2>
        <p className='context'>
            This was the year that social media itself went viral—and not in a good way. In March, President Joe Biden 
            threatened to ban the Chinese-owned video-sharing site TikTok. In April, a bipartisan group of senators introduced 
            legislation to ban kids under 13 from joining social media. In May, the U.S. surgeon general issued an advisory 
            urging action to protect children online (Social Media and Youth Mental Health: The U.S. Surgeon General’s Advisory, 
            2023). Just days earlier, APA issued its first-ever health advisory, providing recommendations to protect youth from 
            the risks of social media (Health Advisory on Social Media Use in Adolescence, 2023).
            <strong>–American Psychological Association</strong>
        </p>
        <div className='footer33'>
            <p>
                Our team will continue to fight for justice in the case of Ronnie Wright and for so many others who are not given 
                the fairness they deserve. For those who need an advocate to fight for their freedoms, or for the freedoms of 
                their loved ones, the firm of   Grossman & Kelly, LLP is here to help. Contact us today to receive a consultation 
                regarding legal action, or call 631.314.4996 for more information.
            </p>
            <Link to="/contact_page">
                <button>
                    Contact us
                </button>
            </Link>
        </div>
    </div>
  )
}

export default expanded_news