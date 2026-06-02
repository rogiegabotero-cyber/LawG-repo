import React from 'react'
import './team.css'
import DgProfile from '../assets/dg_profile.webp'
import Bartlett from '../assets/bartlett.webp'

const team = () => {
  return (
    <div className='profile_div'>
      <h1>OUR TEAM</h1>
      <div className='profile_div1'>
        <div className='david'>
          <img src={DgProfile} alt="David Grossman profile" />
          <strong>David Grossman, Esq.</strong>
          <p>David Grossman &amp; Associates PLLC</p>
        </div>
      </div>
      
        
    </div>
  )
}

export default team