import React, { useEffect } from 'react';
import './attorneys.css';
import { Link } from "react-router-dom";
import { House, ChevronsRight } from "lucide-react";
import David from '../assets/dg_profile.webp';
import JanSchlichtmann from '../assets/jan-schlichtmann.webp';
import Bartlett from '../assets/bartlett.webp'
import FirmLogo from '../assets/firm-logo.webp'

const Attorneys = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    document.title = "Attorneys – David Grossman & Associates";

    return () => {
      document.title = "David Grossman & Associates";
    };
  }, []);

  return (
    <div >
      <div className="orange">
        <h2>Attorneys</h2>
        <div className="back_link">
          <Link to="/" className="back-home">
            <House strokeWidth={1} size={20} /> Home
          </Link>
          <ChevronsRight className="back-home" size={20} />
          Attorneys
          
        </div>
      </div>

      <div className='main_didiv'>
        <div className='about_pp'>
          <div className='details_profile'>
            <strong>David Grossman, Esq.</strong>
            <p>
              <strong>Mr. Grossman</strong> has been an attorney for three decades and is a successful businessperson 
              and advocate for all sorts of victims. Much of his career focused on risk mitigation and 
              compliance. His firm, which was established in New York nearly 30 years ago, originally 
              specialized in victims’ rights, advocating for individuals neglected in institutions.
              <br />
              <br />
              About a decade ago, they expanded into mass torts and formed partnerships with some of the 
              largest firms in the nation and advocates for victims of corporate greed who caused all sorts 
              of harms to the environment, unions, and more.
            </p> 
          </div>

          <div className='profile_details'>
            <img src={David} alt="David Grossman" />
            <strong>Partner</strong>
          </div>
        </div>

        <div className='about_pp'>
          <div className='profile_details jan_profile_details'>
            <img src={JanSchlichtmann} alt="Jan Schlichtmann" className="jan_profile_image" />
            <strong>Co-Counsel / Environmental Attorney</strong>
          </div>

          <div className='details_profile2'>
            <strong>Jan Schlichtmann</strong>
            <h5>CO-COUNSEL / ENVIRONMENTAL ATTORNEY</h5>
            <p>
              Jan Schlichtmann is one of America's most recognized environmental
              litigators. His pioneering work in the Woburn, Massachusetts water
              contamination case, which first united experts in science,
              medicine, and engineering to prove industrial harm to public
              health, was chronicled in the national bestseller and major motion
              picture "A Civil Action," in which he was portrayed by John
              Travolta.
              <br />
              <br />
              A Cornell Law graduate and Phi Beta Kappa scholar, Schlichtmann
              has spent his career fighting for communities and public entities
              against the most powerful industrial defendants in the country.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Attorneys;
