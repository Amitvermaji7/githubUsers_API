import React from 'react';
import './Footer.css'; // नई CSS फाइल जोड़ें

const Footer = () => {
  const currentYear = new Date().getFullYear(); // वर्तमान वर्ष प्राप्त करें
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#" className="footer-link">Home</a>
          <a href="#" className="footer-link">ip box</a>
          <a href="#" className="footer-link">contact us</a>
         
        </div>
        <p className="copyright">© {currentYear} GitHub Repository Explorer.</p>
      </div>
    </footer>
  );
};

export default Footer;
