import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * 3D pointer-tilt + lift on hover. Replaces the original mousemove/rotateX/rotateY JS.
 * Respects prefers-reduced-motion by falling back to a static wrapper.
 */
export default function TiltCard({ className = '', children, max = 7, lift = -6, ...rest }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 300, damping: 30 });
  const springY = useSpring(py, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [0, 1], [max, -max]);
  const rotateY = useTransform(springX, [0, 1], [-max, max]);
  const translateY = useTransform(springY, [0, 1], [0, 0]);

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function handleMouseMove(e) {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReduced ? undefined : { rotateX, rotateY, transformPerspective: 700 }}
      whileHover={prefersReduced ? undefined : { y: lift }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
