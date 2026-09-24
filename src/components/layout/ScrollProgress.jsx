import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[300] h-1 origin-left bg-gradient-to-r from-orange to-emerald shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
