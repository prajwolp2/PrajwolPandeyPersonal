import React, { lazy, useState } from 'react';
import { site } from '../data/content';
import Reveal from './Reveal';
import { ArrowUpRight } from './Icons';
import Scene from './three/Scene';

const WaveScene = lazy(() => import('./three/WaveScene'));

const links = [
  { label: 'GitHub', href: site.github, external: true },
  { label: 'LinkedIn', href: site.linkedin, external: true },
  { label: 'Resume (PDF)', href: site.resume, external: true },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    if (!navigator.clipboard) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <Scene className="contact__waves" camera={{ position: [0, 2.2, 7], fov: 50 }}>
        <WaveScene />
      </Scene>
      <div className="container contact__grid">
        <div>
          <Reveal as="p" className="section__label mono" y={12}>
            <b>05</b>
            <span>Contact</span>
          </Reveal>
          <Reveal as="h2" className="contact__title display" delay={0.05} y={20} style={{ marginTop: 20 }}>
            Say <em className="accent">hello.</em>
          </Reveal>
          <Reveal as="p" className="contact__lede" delay={0.1} y={12}>
            I'm looking for a Summer 2027 internship in software or data engineering. If you have a role, a project,
            or just a question, my inbox is open.
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.12} y={12}>
            <a href={`mailto:${site.email}`} className="contact__email" onClick={copy} title="Click to copy">
              {site.email}
              <span className="contact__copy">{copied ? 'Copied' : 'Copy'}</span>
            </a>
          </Reveal>
          <Reveal className="contact__links" delay={0.18} y={12}>
            {links.map((l) => (
              <a
                key={l.label}
                className="contact__link"
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
              >
                <span>{l.label}</span>
                <ArrowUpRight />
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
