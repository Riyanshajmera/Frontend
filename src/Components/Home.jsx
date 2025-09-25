import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className='home'>
      <div className='hero-section'>
        <div className='home-text'>
          <h1>Verify Academic Credentials with <span className='highlight'>Confidence</span></h1>
          <p>Instantly and trustfully verify academic certificates and degrees from accredited institutions worldwide. Trusted by employers, educational institutions, and government agencies.</p>
          <div className='cta-container' id='verify'>
            <button className='cta-button' onClick={() => navigate('/verifi-page')}>
              <span className="material-symbols-outlined">beenhere</span>
              Start Verification
            </button>
            <button className='secondary-button'>
              Learn More
            </button>
          </div>
          <div className='trust-indicators'>
            <div className='trust-item'>
              <span className='trust-number'>5,000+</span>
              <span className='trust-label'>Institutions</span>
            </div>
            <div className='trust-item'>
              <span className='trust-number'>1M+</span>
              <span className='trust-label'>Verifications</span>
            </div>
            <div className='trust-item'>
              <span className='trust-number'>50+</span>
              <span className='trust-label'>Countries</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className='features-section'>
        <div className='home-boxes'>
          <div className='feature-card'>
            <div className='icon-container green'>
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <h3>Instant Verification</h3>
            <p>Get verification results in seconds through our automated system powered by advanced AI technology</p>
          </div>
          <div className='feature-card'>
            <div className='icon-container blue'>
              <span className="material-symbols-outlined">language</span>
            </div>
            <h3>Global Database</h3>
            <p>Access credentials from over 5,000 accredited institutions worldwide with real-time updates</p>
          </div>
          <div className='feature-card'>
            <div className='icon-container purple'>
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <h3>24/7 Available</h3>
            <p>Verify credentials anytime, anywhere with our always-on platform and mobile-friendly interface</p>
          </div>
        </div>
      </div>
    </div>
  )
}