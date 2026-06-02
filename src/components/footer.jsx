import React from 'react'
import './footer.css'
import Icon from '../assets/icon.png'
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className='footer_div'>
        
        <div className='bot_div'>
            <div className='first'>
                <div className='logo_div'>
                    <h1>David Grossman <br />& Associates</h1>
                </div>
                <p>
                    Why delay, describe the task now
                    and you will be surprised how
                    quickly we will respond!
                </p>
                <div className='icon_div1'>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>
            <div className='second'>
                <h2>Our Links</h2>
                <Link to="/">Home</Link>
                <Link to="/about_section">About Us</Link>
                <Link to="/practice_area">Practice Areas</Link>
                <Link to="/file_claim_page">File a Claim</Link>
                <Link to="/contact_page">Contact Us</Link>
            </div>
            <div className='second'>
                <h2>Practice Areas</h2>
                <Link id='link1' to="/practice_area#sample1">
                    Antitrust: Insulin Price-Fixing 
                </Link>
                {/* <Link id='link2' to="/practice_area#sample2">
                    Antitrust: Generic Drug Price Fixing
                </Link> */}
                <Link id='link3' to="/practice_area#sample4">
                    Social Media Harm 
                </Link>
                <Link id='link4' to="/practice_area#sample3">
                    Environmental Case: PFAS 
                </Link>
                
            </div>
            <div className='second'>
                <h2>Get in Touch</h2>
                <a href="">(631) 815-2575</a>
                <a href="">david@davidgrossmanandassociates.com</a>
                <a href="">881 Ocean Drive, <br />Unit 14H <br />Key Biscayne, FL 33149 </a>
            </div>
            <div>

            </div>
            
        </div>
        <div className='rights'>
            <p>Copyright © 2026 All Rights Reserved</p>
        </div>
    </div>
  )
}

export default footer