import React, { useState } from 'react'
import './footer.css'
import Icon from '../assets/icon.png'

const StayConnected = () => {
  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = () => {
    // simulate server error
    setShowAlert(true)
  }

  return (
    <div className='footer_div2'>
      <div className='top-div'>
        <div className='inf_l'>
          <h1>Stay Connected</h1>
          <p>Sign up for our newsletter</p>
        </div>
        <div className='inf_r'>
          <label htmlFor="">
            Enter your email:
            <input type="email" placeholder='Email Address' />
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      {showAlert && (
        <div className="popup-alert" style={{
          position: 'fixed',
          color: 'black',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          <p>Your submission failed because of a server error</p>
          <button onClick={() => setShowAlert(false)}>Close</button>
        </div>
      )}
    </div>
  )
}

export default StayConnected
