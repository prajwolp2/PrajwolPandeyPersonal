import React from 'react';
import Reveal from './Reveal';

export default function SectionHead({ index, label, title, intro }) {
  return (
    <div className="section__head">
      <Reveal as="p" className="section__label mono" y={12}>
        <b>{index}</b>
        <span>{label}</span>
      </Reveal>
      <Reveal as="h2" className="section__title display" delay={0.05} y={20}>
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" className="section__intro" delay={0.1} y={12}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}
