import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Mohammed Pathariya. All rights reserved.</p>
      <p className="footer-note">Built with React · Deployed on Vercel</p>
    </footer>
  );
};

export default Footer;
