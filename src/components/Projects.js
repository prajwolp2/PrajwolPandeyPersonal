import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../data/content';
import Reveal, { EASE } from './Reveal';
import SectionHead from './SectionHead';
import { ArrowUpRight, Close } from './Icons';

function Lightbox({ image, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.classList.add('is-locked');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [onClose]);

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
      aria-label={alt}
    >
      <motion.img
        className="lightbox__img"
        src={image}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 8 }}
        transition={{ duration: 0.45, ease: EASE }}
      />
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <Close />
      </button>
    </motion.div>
  );
}

function Row({ project, index, onOpen }) {
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
          {project.link ? (
            <a className="project__cta link-ul" href={project.link} target="_blank" rel="noopener noreferrer">
              View source <ArrowUpRight />
            </a>
          ) : project.image ? (
            <button className="project__cta link-ul" onClick={() => onOpen(project)}>
              View screenshot <ArrowUpRight />
            </button>
          ) : null}
        </div>
      </div>

      {project.image ? (
        <button className="project__thumb" onClick={() => onOpen(project)} aria-label={`View ${project.title} screenshot`}>
          <img src={project.image} alt="" loading="lazy" decoding="async" />
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

  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead
          index="03"
          label="Selected work"
          title="Things I have built."
          intro="A short, honest list. Each one taught me something I still use."
        />
        <div className="work__list">
          {projects.map((p, i) => (
            <Row key={p.id} project={p} index={i} onOpen={setOpenProject} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <Lightbox image={openProject.image} alt={openProject.title} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
