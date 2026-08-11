import React from 'react';
import portfolio from '../data/portfolio.generated';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} {portfolio.person.name}. All rights reserved.</p>
      <p className="footer-note">Built with React · Deployed on Vercel</p>
    </footer>
  );
};

export default Footer;
