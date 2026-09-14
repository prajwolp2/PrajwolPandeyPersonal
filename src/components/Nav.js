import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { navLinks, site } from '../data/content';
import { EASE } from './Reveal';
import { ArrowUpRight } from './Icons';

const fmt = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'America/New_York',
});

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(() => fmt.format(new Date()));
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.2 });

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container nav__inner">
          <a href="#top" className="nav__logo" aria-label="Back to top">
            {site.firstName} <em>{site.lastName}</em>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a key={link.href} href={link.href} className={`nav__link ${isActive ? 'is-active' : ''}`}>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-ul"
                      className="nav__link-ul"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="nav__right">
            <span className="nav__time mono">NYC {time}</span>
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="nav__resume link-ul">
              Resume
            </a>
            <button
              className={`nav__burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <motion.div className="nav__progress" style={{ scaleX: progress }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label="Mobile">
              {navLinks.map((link, i) => (
                <div key={link.href} className="nav__menu-link">
                  <motion.a
                    href={link.href}
                    className="display"
                    onClick={() => setOpen(false)}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                  >
                    <span>{link.label}</span>
                    <span className="mono">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <div className="nav__menu-footer mono">
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={site.resume} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
              <a href={`mailto:${site.email}`}>
                Email <ArrowUpRight style={{ width: 10, height: 10, verticalAlign: 'middle' }} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
