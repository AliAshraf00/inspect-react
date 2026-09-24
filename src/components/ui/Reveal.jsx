import { motion } from 'framer-motion';

/**
 * Fade + slide-up reveal, triggered once when scrolled into view.
 * Mirrors the original .reveal / IntersectionObserver behaviour.
 */
export default function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </Component>
  );
}
