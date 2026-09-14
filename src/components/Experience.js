import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { experience, education } from '../data/content';
import Reveal, { EASE } from './Reveal';
import SectionHead from './SectionHead';
import { Plus } from './Icons';

function Item({ item, index, open, onToggle }) {
  const id = `exp-panel-${index}`;
  return (
    <Reveal as="li" className={`exp__item ${open ? 'is-open' : ''}`} delay={0.04 * index} y={14}>
      <button className="exp__row" onClick={onToggle} aria-expanded={open} aria-controls={id}>
        <span className="exp__year mono">{item.year}</span>
        <span>
          <span className="exp__company">
            {item.company}
            {item.unit && <em className="exp__unit">, {item.unit}</em>}
          </span>
          <span className="exp__role" style={{ display: 'block' }}>
            {item.role}
          </span>
        </span>
        <span className="exp__period mono">
          {item.period}
          <small>{item.location}</small>
        </span>
        <span className="exp__toggle">
          <Plus />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="exp__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="exp__body-inner">
              <ul className="exp__bullets">
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="exp__tags mono">{item.tags.join('  /  ')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export default function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead index="02" label="Experience" title="Where I have worked." />

        <div className="exp">
          <div className="exp__aside">
            <Reveal y={12}>
              <p className="mono">Four roles since 2024</p>
              <p>
                From architecting record systems for the nation's largest school district to analyzing a
                30,000-vehicle city fleet. Every role added a layer, and each one taught me to ship things people rely
                on.
              </p>
            </Reveal>
            <Reveal className="edu" delay={0.08} y={12}>
              <span className="mono">Education, {education.period}</span>
              <div className="edu__school">{education.school}</div>
              <div className="edu__program">{education.program}</div>
              <p className="edu__courses">{education.courses.join(', ')}</p>
            </Reveal>
          </div>

          <ul className="exp__list">
            {experience.map((item, i) => (
              <Item
                key={item.company + item.role}
                item={item}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
