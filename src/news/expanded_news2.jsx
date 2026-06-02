/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import './extended_news.css'
import { Link } from "react-router-dom";

const expanded_news = () => {

      useState(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        document.title = "“The Guardian” March 10, 2025: PFAS ... – David Grossman & Associates";
    
        return () => {
          document.title = "David Grossman & Associates";
        };
      }, []);
    
  return (
    <div className='maindiv_athens'>
        <h2 className='orange_h2'>
            “The Guardian” March 10, 2025: PFAS are poisoning our soil and polluting our lungs. The EPA is 
            finally sounding the alarm – but that’s not enough.
        </h2>
        <h2 className='bullet_h2'>
            • A national problem with local consequences
        </h2>
        <p className='context'>
            The year Dark Waters was released, 2019, many of us testified before Congress, urging lawmakers 
            to take action on PFAS contamination. At the time, my testimony focused on what had happened in 
            West Virginia. But this isn’t just West Virginia’s story. It’s happening all over the country, 
            and it’s affecting all of us. Every single person in America has elevated PFAS in their body. <br /> 
            They accumulate there. There are explosions of PFAS related diseases happening in our communities. 
            One example is Manchester, New Hampshire, where a wastewater treatment plant burns sewage sludge 
            just steps from homes, an elementary school, a baseball field and the Merrimack River. <br />
             It’s the only facility in the state with a sludge incinerator, and in 2018 alone, it burned more than 4,000 
            dry metric tons of it. That’s happening just two miles from neighborhoods already struggling with 
            high levels of toxic air pollution.
        </p>
        <div className='footer33'>
            <p>
                Our team will continue to fight for justice in the case of Ronnie Wright and for so many others who are 
                not given the fairness they deserve. For those who need an advocate to fight for their freedoms, or for 
                the freedoms of their loved ones, the firm of Grossman & Kelly, LLP is here to help. Contact us today to 
                receive a consultation regarding legal action, or call 631.314.4996 for more information.
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