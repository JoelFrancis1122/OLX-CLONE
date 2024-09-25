import React, { useContext, useState } from 'react';

import './Footer.css';
import { Test } from '../../store/joel';
import { Testrr } from '../../store/Josea';
function Footer() {
    const [state,setState] = useState("kolkataa")
  const {value} = useContext(Test)



  const {name} = useContext(Testrr)

  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
            <li onClick={()=>{setState(value)}}>{state}</li>
            <li>Mumbai</li>
              <li>Chennai</li>
              {/* {name} */}
              <li>Pune</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li>About OLX Group</li>
              <li>Careers</li>
              {name}
              <li>Contact Us</li>
              <li>OLXPeople</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>OLX</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Other Countries Pakistan - South Africa - Indonesia</p>
        <p>Free Classifieds in India. © 2006-2024 OLX</p>
      </div>
    </div>
  );
}

export default Footer;
