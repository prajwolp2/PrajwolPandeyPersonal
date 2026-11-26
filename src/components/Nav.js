import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { navLinks, now, site } from '../data/content';
import { EASE } from './Reveal';
import { ArrowLeft, ArrowUpRight, Download, Github, Linkedin, Mail } from './Icons';

const fmt = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'America/New_York',
});

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006' +
  '&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit&timezone=America%2FNew_York';

// WMO weather codes, as used by Open-Meteo.
function describeWeather(code, isDay) {
  if (code === 0) return isDay ? 'Sunny' : 'Clear';
  if (code === 1) return 'Mostly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Cloudy';
  if (code === 45 || code === 48) return 'Fog';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'Rain';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'Snow';
  if (code >= 95) return 'Thunderstorms';
  return null;
}

/** Current NYC weather from Open-Meteo, refreshed every 15 minutes. Stays null if the request fails. */
function useNycWeather() {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(WEATHER_URL);
        if (!res.ok) return;
        const { current } = await res.json();
        if (!cancelled && current) {
          setWeather({
            temp: Math.round(current.temperature_2m),
            label: describeWeather(current.weather_code, current.is_day === 1),
          });
        }
      } catch {
        /* offline or blocked: just don't show the weather */
      }
    };
    load();
    const id = setInterval(load, 15 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);
  return weather;
}

const COLLAPSE_KEY = 'pp-nav-collapsed';

function readCollapsed() {
  try {
    return window.localStorage.getItem(COLLAPSE_KEY) === '1';
  } catch {
    return false;
  }
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(() => fmt.format(new Date()));
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [copied, setCopied] = useState(false);
  const weather = useNycWeather();
  const current = now.find((n) => n.label === 'Now');
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

  // The sidebar (wide screens only) can collapse to a slim strip; remember the choice.
  useEffect(() => {
    document.body.classList.toggle('nav-collapsed', collapsed);
    try {
      window.localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0');
    } catch {
      /* storage unavailable */
    }
  }, [collapsed]);

  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if (e.key === '[' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) setCollapsed((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

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
        className={`nav ${scrolled ? 'nav--scrolled' : ''} ${collapsed ? 'nav--collapsed' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container nav__inner">
          <div className="nav__top">
            <a href="#top" className="nav__logo" aria-label="Back to top">
              <span className="nav__logo-full">
                {site.firstName} <em>{site.lastName}</em>
              </span>
              <span className="nav__logo-mono" aria-hidden="true">
                {site.firstName[0]}
                <em>{site.lastName[0]}</em>
              </span>
            </a>
            <button
              className="nav__toggle"
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              title={`${collapsed ? 'Expand' : 'Collapse'} sidebar ( [ )`}
            >
              <ArrowLeft />
            </button>
          </div>

          <p className="nav__status mono" title={site.availability}>
            <span className="dot" />
            <span className="nav__label">{site.availability}</span>
          </p>

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((link, i) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav__link ${isActive ? 'is-active' : ''}`}
                  title={collapsed ? link.label : undefined}
                >
                  <span className="nav__num mono">0{i + 1}</span>
                  <span className="nav__label">{link.label}</span>
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

          {current && (
            <div className="nav__now">
              <span className="mono">Now</span>
              <p>{current.value}</p>
            </div>
          )}

          <div className="nav__right">
            <span className="nav__time mono" title={weather?.label ? `NYC: ${weather.temp}°F, ${weather.label}` : undefined}>
              <span className="nav__clock">NYC {time}</span>
              {weather && (
                <span className="nav__weather">
                  <span className="nav__weather-sep"> · </span>
                  <span className="nav__temp">{weather.temp}°F</span>
                  {weather.label && <span className="nav__cond"> {weather.label}</span>}
                </span>
              )}
            </span>
            <button className="nav__copy mono" onClick={copyEmail} title="Copy email address">
              <Mail />
              <span className="nav__label">{copied ? 'Copied!' : 'Copy email'}</span>
            </button>
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="nav__resume link-ul">
              Resume
            </a>
            <div className="nav__icons">
              <a href={site.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume" title="Resume" className="nav__icon-resume">
                <Download />
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                <Github />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin />
              </a>
              <a href={`mailto:${site.email}`} aria-label="Email" title="Email">
                <Mail />
              </a>
            </div>
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
        <motion.div className="nav__progress-y" style={{ scaleY: progress }} />
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
