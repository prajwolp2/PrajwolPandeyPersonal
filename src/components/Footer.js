import React from 'react';
import { site } from '../data/content';
import { ArrowUp } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner mono">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.location}</span>
        <a href="#top" className="footer__top">
          Back to top <ArrowUp />
        </a>
      </div>
    </footer>
  );
}
