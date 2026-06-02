/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import './extended_news.css'
import { Link } from "react-router-dom";

const expanded_news = () => {

      useState(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        document.title = "The Athens Independent repor... – David Grossman & Associates";
    
      }, []);

  return (
    <div className='maindiv_athens'>
        <h2 className='orange_h2'>
            The Athens Independent reported that the city of Athens authorized Mayor Steve Patterson
            to contract with Grossman & Kelly to pursue legal action against firms deemed liable in 
            prescription-related matters.
        </h2>
        <h2 className='bullet_h2'>
            • Athens County Independent: Federal lawsuits, state utilities issue
        </h2>
        <p className='context'>
            Athens City Council passed an emergency ordinance to retain a New York law firm to represent 
            its potential interests in the outcomes of three federal lawsuits
            Two of the pending cases involve price fixing on insulin and generic drugs; the third addresses 
            injuries and property damages from the presence of PFAS— also known as “forever chemicals” — in 
            water. <br />
            City Law Director Lisa Eliason said she learned of the civil claims for price fixing only a week 
            ago from Sunday Creek Horizons, a consulting firm that works with the city on numerous projects. <br />
            The ordinance authorized Mayor Steve Patterson to enter a contract with Grossman & Kelly, a New 
            York City firm, to sue firms found liable by the federal government on the city’s behalf. Patterson 
            said the city’s Human Resources director will review the city’s expenditures on insulin and generic 
            drugs since 2003 to determine how much the city was overcharged.
        </p>
        <div className='footer33'>
            <p>
                Our team will continue to fight for justice in the case of Ronnie Wright and for so many others 
                who are not given the fairness they deserve. For those who need an advocate to fight for their 
                freedoms, or for the freedoms of their loved ones, the firm of Grossman & Kelly, LLP is here to 
                help. Contact us today to receive a consultation regarding legal action, or call 631.314.4996 
                for more information.
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