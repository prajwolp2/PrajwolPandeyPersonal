import React, { lazy } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { hero, site } from '../data/content';
import { EASE } from './Reveal';
import Magnetic from './Magnetic';
import { ArrowUpRight, Download } from './Icons';
import Scene from './three/Scene';

const HeroScene = lazy(() => import('./three/HeroScene'));

const words = hero.headline.flatMap((part) =>
  part.text.split(' ').map((w) => ({ text: w, accent: !!part.accent }))
);

export default function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section id="top" className="hero">
      {!reduce && (
        <Scene className="hero__canvas" camera={{ position: [0, 0, 8], fov: 42 }}>
          <HeroScene />
        </Scene>
      )}
      <motion.div className="container hero__top" {...enter(0.3)}>
        <p className="hero__kicker mono">
          {hero.kicker[0]}
          <br />
          {hero.kicker[1]}
        </p>
        <p className="hero__status mono">
          <span className="dot" />
          {site.availability}
        </p>
      </motion.div>

      <div className="container hero__main">
        <h1 className="hero__name display">
          {[site.firstName, site.lastName].map((w, i) => (
            <React.Fragment key={w}>
              <span className="hero__word">
                <motion.span
                  className={`hero__word-inner ${i === 1 ? 'accent' : ''}`}
                  initial={reduce ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.4 + i * 0.08 }}
                >
                  {w}
                </motion.span>
              </span>{' '}
            </React.Fragment>
          ))}
        </h1>

        <p className="hero__statement display">
          {words.map((w, i) => (
            <React.Fragment key={i}>
              <span className="hero__word">
                <motion.span
                  className={`hero__word-inner ${w.accent ? 'accent' : ''}`}
                  initial={reduce ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.65 + i * 0.035 }}
                >
                  {w.text}
                </motion.span>
              </span>{' '}
            </React.Fragment>
          ))}
        </p>

        <div className="hero__row">
          <motion.div {...enter(0.85)}>
            <p className="hero__lede">{hero.lede}</p>
            <div className="hero__actions">
              <Magnetic strength={0.2}>
                <a href="#work" className="btn btn--solid">
                  See my work <ArrowUpRight />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                  Resume <Download />
                </a>
              </Magnetic>
            </div>
          </motion.div>
          <motion.div className="hero__links" {...enter(0.95)}>
            <a className="link-ul" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight />
            </a>
            <a className="link-ul" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight />
            </a>
            <a className="link-ul" href={`mailto:${site.email}`}>
              Email <ArrowUpRight />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div className="container hero__foot mono" {...enter(1.2)}>
        <span className="hero__scroll">
          <span className="hero__scroll-line" />
          Scroll
        </span>
        <span>01 / About</span>
      </motion.div>
    </section>
  );
}
