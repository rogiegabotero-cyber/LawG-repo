import React, { useEffect } from 'react'
import './expertise.css'
import { Link, useLocation } from "react-router-dom";
import Sample1 from '../assets/sample1.webp'
import Sample2 from '../assets/sample2.webp'
import Sample3 from '../assets/sample3.webp'
import Sample4 from '../assets/sample4.webp'

const Expertise = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className='main'>
      <h1>OUR EXPERTISE</h1>
      <h2>LITIGATION AREAS</h2>

      <div className='div1'>
        <div className='sample_area' id='sample1'>
          <img className='sample_image' src={Sample1} alt="Sample Image" />
          <p>Antitrust: Insulin Price-Fixing</p>
          <Link id='link1' to="/practice_area#sample1">
            LEARN MORE <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className='sample_area' id='sample3'>
          <img className='sample_image' src={Sample3} alt="Sample Image" />
          <p>Social media harm</p>
          <Link id='link3'  to="/practice_area#sample4">
            LEARN MORE <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        {/* <div className='sample_area' id='sample2'>
          <img className='sample_image' src={Sample2} alt="Sample Image" />
          <p>Antitrust: Generic Drug Price Fixing</p>
          <Link id='link2' to="/practice_area#sample2">
            LEARN MORE <i className="bi bi-arrow-right"></i>
          </Link>
        </div> */}
      </div>

      <div className='div2'>
        

        <div className='sample_area' id='sample4'>
          <img className='sample_image' src={Sample4} alt="Sample Image" />
          <p>Environmental case: PFAS</p>
          <Link id='link4'  to="/practice_area#sample3">
            LEARN MORE <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>

      <Link to="/practice_area">
        <button className='view_all'>VIEW ALL</button>
      </Link>
    </div>
  );
};

export default Expertise;
