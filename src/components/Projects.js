import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../data/content';
import Reveal, { EASE } from './Reveal';
import SectionHead from './SectionHead';
import PricingDemo from './PricingDemo';
import { ArrowLeft, ArrowRight, ArrowUpRight, Close } from './Icons';

function Lightbox({ images, title, onClose }) {
  const [current, setCurrent] = useState(0);
  const count = images.length;
  const step = useCallback((dir) => setCurrent((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('is-locked');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [onClose, step]);

  const image = images[current];

  return (
    <motion.div
      className="lightbox"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
    >
      <motion.figure
        className="lightbox__figure"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 8 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <img key={image.src} className="lightbox__img" src={image.src} alt={image.alt} />
        <figcaption className="lightbox__caption mono">
          <span>{image.alt}</span>
          {count > 1 && <span>{current + 1} / {count}</span>}
        </figcaption>
      </motion.figure>

      {count > 1 && (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous screenshot"
          >
            <ArrowLeft />
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next screenshot"
          >
            <ArrowRight />
          </button>
        </>
      )}

      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <Close />
      </button>
    </motion.div>
  );
}

function Row({ project, index, onOpen }) {
  const images = project.images || [];
  const cover = images[0];

  return (
    <Reveal as="article" className="project" delay={0.05 * index} y={16}>
      <span className="project__index mono">0{index + 1}</span>

      <div>
        <div className="project__meta mono">
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="project__title display">{project.title}</h3>
        <p className="project__desc">{project.description}</p>
        <div className="project__foot">
          <span className="mono">{project.tags.join('  /  ')}</span>
          <div className="project__ctas">
            {cover && (
              <button className="project__cta link-ul" onClick={() => onOpen(project)}>
                {images.length > 1 ? 'View screenshots' : 'View screenshot'} <ArrowUpRight />
              </button>
            )}
            {project.link && (
              <a className="project__cta link-ul" href={project.link} target="_blank" rel="noopener noreferrer">
                View source <ArrowUpRight />
              </a>
            )}
          </div>
        </div>
      </div>

      {cover ? (
        <button className="project__thumb" onClick={() => onOpen(project)} aria-label={`View ${project.title} screenshots`}>
          <img src={cover.src} alt="" loading="lazy" decoding="async" />
        </button>
      ) : (
        <div className="project__thumb" aria-hidden="true">
          <div className="project__thumb-lines" />
          <span className="project__thumb-word">{project.kind.split(',')[0]}</span>
        </div>
      )}
    </Reveal>
  );
}

export default function Projects() {
  const [openProject, setOpenProject] = useState(null);
  const closeLightbox = useCallback(() => setOpenProject(null), []);

  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead
          index="03"
          label="Selected work"
          title="Things I have built."
          intro="Built, backtested and run with real money."
        />
        <div className="work__list">
          {projects.map((p, i) => (
            <React.Fragment key={p.id}>
              <Row project={p} index={i} onOpen={setOpenProject} />
              {p.demo === 'pricing' && <PricingDemo />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <Lightbox images={openProject.images} title={openProject.title} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </section>
  );
}
