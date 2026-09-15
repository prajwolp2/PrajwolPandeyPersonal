import React, { useCallback, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import NowStrip from './components/NowStrip';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

const KEY = 'pp-intro-seen';
function shouldShowIntro() {
  try {
    return !window.sessionStorage.getItem(KEY);
  } catch {
    return true;
  }
}

export default function App() {
  const [loading, setLoading] = useState(shouldShowIntro);

  const finish = useCallback(() => {
    try {
      window.sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage unavailable */
    }
    setLoading(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={finish} />}</AnimatePresence>
      <Nav />
      <main>
        <Hero />
        <NowStrip />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
