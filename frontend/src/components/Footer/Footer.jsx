import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

 const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className='footer-content'>
   <div className='footer-content-left'>
  <img src={assets.logo} alt=""/>
  <p>this is afood delivery website if you need anything just contact us</p>
  <div className='footer-social-icons'>
  <img src={assets.facebook_icon}/>
  <img src={assets.twitter_icon}/>
  <img src={assets.linkedin_icon}/>
  </div>
   </div>
   <div className='footer-content-center'>
   <h2>COMPANY</h2>
   <ul>
    <li>Home</li>
    <li>about</li>
    <li>delivery</li>
    <li>Privacy policy</li>
   </ul>
   </div>
   <div className='footer-content-right'>
    <h2>Get in touch</h2>
   <ul>
    <li>12-34-566-777</li>
    <li>contact@tomato.com</li>
   </ul>
   </div>
    </div>
    <p className='footer-copyright'>copyright@tomato.com2024-all right reserved</p>

    </div>
  )
}

export default Footer
