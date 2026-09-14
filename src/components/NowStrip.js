import React from 'react';
import { now } from '../data/content';
import Reveal from './Reveal';

export default function NowStrip() {
  return (
    <div className="now">
      <div className="container now__grid">
        {now.map((item, i) => (
          <Reveal className="now__item" key={item.label} delay={0.06 * i} y={10}>
            <span className="mono">{item.label}</span>
            <span className="now__value">{item.value}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
