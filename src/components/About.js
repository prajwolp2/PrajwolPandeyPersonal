import React from 'react';
import { about, site } from '../data/content';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import Counter from './Counter';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead index="01" label="About" title="Curious builder, careful engineer." />

        <div className="about__grid">
          <Reveal className="about__figure" y={20}>
            <div className="about__frame" />
            <div className="about__photo">
              <img src={site.profile} alt={site.name} loading="lazy" decoding="async" width="800" height="800" />
            </div>
            <div className="about__badge" aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <defs>
                  <path id="badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                </defs>
                <text>
                  <textPath href="#badge-circle" textLength="224" lengthAdjust="spacingAndGlyphs">
                    Open to work · Summer 2027 ·
                  </textPath>
                </text>
              </svg>
            </div>
            <figcaption className="about__caption mono">
              <span>{site.name}</span>
              <span>{site.location}</span>
            </figcaption>
          </Reveal>

          <div className="about__text">
            <Reveal as="p" className="about__lead" y={16}>
              {about.paragraphs[0]}
            </Reveal>
            <Reveal as="p" delay={0.08} y={16}>
              {about.paragraphs[1]}
            </Reveal>

            <Reveal as="dl" className="facts" delay={0.12} y={12}>
              {about.facts.map((f) => (
                <div className="fact" key={f.label}>
                  <dt className="mono">{f.label}</dt>
                  <span className="fact__leader" aria-hidden="true" />
                  <dd>{f.value}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="stats">
          {about.stats.map((s, i) => (
            <Reveal className="stat" key={s.label} delay={0.06 * i} y={12}>
              <div className="stat__value display">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="stat__label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
