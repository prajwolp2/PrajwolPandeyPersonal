import React, { lazy } from 'react';
import { skills } from '../data/content';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import Scene from './three/Scene';

const NetworkScene = lazy(() => import('./three/NetworkScene'));

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead
          index="04"
          label="Toolbox"
          title="What I work with."
          intro="Languages, frameworks, and tools I reach for. The list keeps growing."
        />
        <div className="skills__grid">
          <div className="skills__list">
            {skills.map((g, i) => (
              <Reveal className="skills__row" key={g.group} delay={0.05 * i} y={12}>
                <span className="mono">{g.group}</span>
                <ul className="skills__items">
                  {g.items.map((item) => (
                    <li className="skills__item" key={item}>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="skills__scene" delay={0.1} y={12}>
            <Scene camera={{ position: [0, 0, 6], fov: 40 }} style={{ position: 'absolute', inset: 0 }}>
              <NetworkScene />
            </Scene>
            <span className="skills__scene-label mono">Move your cursor</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
