import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/** Fades and lifts children into view the first time they scroll on screen. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  as = 'div',
  className,
  once = true,
  style,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -8% 0px' }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export { EASE };
