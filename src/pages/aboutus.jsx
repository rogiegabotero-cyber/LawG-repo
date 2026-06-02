import React from 'react'
import './aboutus.css'
import DgProfile from '../assets/dg_profile.webp'
import { Link } from "react-router-dom";

const aboutus = () => {
  return (
    <div className='about_div'>
        <div className='left_div'>
            <h1>ABOUT US</h1>
            <p>
                Mr. Grossman has been an attorney for three decades and
                is a successful businessperson and advocate for all sorts
                of victims. Much of his career focused on risk mitigation
                and compliance. His firm, which was established in New
                York nearly 30 years ago, originally specialized in victims rights, advocating for individuals neglected in institutions.
                <br />
                <br /> About a decade ago, they expanded into mass torts and
                formed partnerships with some of the largest firms in the
                nation and advocates for victims of corporate greed who
                caused all sorts of harms to the environment, unions and
            </p>
            <Link to="/about_section"><button>About us </button></Link>
            
        </div>
        <div className='right_div'>
            <img src={DgProfile} alt="David Grossman profile" />
            <strong>David Grossman, Esq.</strong>
            <p>David Grossman &amp; Associates PLLC</p>
        </div>

    </div>
  )
}

export default aboutus