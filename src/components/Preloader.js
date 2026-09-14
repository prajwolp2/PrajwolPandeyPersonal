import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { site } from '../data/content';
import { EASE } from './Reveal';

export default function Preloader({ onDone }) {
  useEffect(() => {
    document.body.classList.add('is-locked');
    const t = setTimeout(onDone, 1000);
    return () => {
      clearTimeout(t);
      document.body.classList.remove('is-locked');
    };
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: EASE } }}
      aria-hidden="true"
    >
      <div className="preloader__name display">
        <motion.span
          style={{ display: 'inline-block' }}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        >
          {site.firstName} <em className="accent">{site.lastName}</em>
        </motion.span>
      </div>
    </motion.div>
  );
}
