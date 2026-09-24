import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../ui/Button';
import { BlueprintArt } from '../icons/PillarIcons';
import img1 from '../../assets/images/WhatsApp Image 2026-09-13 at 4.14.26 PM (1).jpeg';
import img2 from '../../assets/images/WhatsApp Image 2026-09-13 at 4.14.26 PM (2).jpeg';
import img3 from '../../assets/images/WhatsApp Image 2026-09-13 at 4.14.26 PM (3).jpeg';
import img4 from '../../assets/images/WhatsApp Image 2026-09-13 at 4.14.26 PM (4).jpeg';


const IMAGES = [
  img1,
  img2,
  img3,
  img4
];

const KENBURNS = ['animate-kenburn-a', 'animate-kenburn-b', 'animate-kenburn-c', 'animate-kenburn-d'];
const SLIDE_MS = 3000;

export default function Hero() {
  const { t } = useTranslation();
  const titles = t('hero.titles', { returnObjects: true });
  const slogans = t('hero.badgeSlogans', { returnObjects: true });
  const slideCount = Math.max(IMAGES.length, titles.length, slogans.length);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIdx((i) => (i + 1) % slideCount), SLIDE_MS);
    return () => clearInterval(interval);
  }, [slideCount]);

  return (
    <section id="hero" className="relative flex max-h-[81vh] items-center overflow-hidden bg-gradient-to-b from-[#0C1210] via-[#10171A] to-[#0C1210]">
      {/* Background image crossfade + Ken Burns */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0C1210]">
        <AnimatePresence>
          <motion.img
            key={idx % IMAGES.length}
            src={IMAGES[idx % IMAGES.length]}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 h-full w-full object-cover saturate-[.85] brightness-[.62] ${KENBURNS[idx % KENBURNS.length]}`}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C1210]/55 via-[#0C1210]/72 to-[#0C1210]/90" />
      </div>

      {/* Drifting grid */}
      <div
        className="animate-grid-drift absolute inset-0 z-[1] opacity-[.28]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <BlueprintArt className="animate-blueprint-float absolute end-[-8%] top-[8%] z-[1] w-[60%] max-w-[640px] opacity-[.16]" />

      {/* Radial accent glows */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(25,169,159,.35), transparent 55%), radial-gradient(ellipse at 80% 85%, rgba(217,100,44,.18), transparent 50%)',
        }}
      />

      <div className="relative z-[2] w-full px-8 py-24 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-7 inline-flex min-h-[34px] items-center gap-2.5 rounded-full border border-white/[.18] bg-white/[.08] px-4 py-2 text-[13px] font-semibold text-[#EAF3EF]">
            <span className="animate-dot-pulse h-[7px] w-[7px] flex-shrink-0 rounded-full bg-orange" />
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {slogans[idx % slogans.length]}
              </motion.span>
            </AnimatePresence>
          </div>

          <h1 className="min-h-[3.9em] max-w-[820px] text-[34px] font-bold leading-[1.28] text-white md:text-[60px] md:min-h-[3.3em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="block"
              >
                {titles[idx % titles.length]}
              </motion.span>
            </AnimatePresence>
          </h1>

          <div className="mt-11 flex flex-wrap gap-4">
            <Button as="a" href="#services" variant="primary" className="px-8 py-4">
              {t('hero.ctaDiscover')}
            </Button>
            <Button as="a" href="#request" variant="outlineWhite" className="px-8 py-4">
              {t('hero.ctaRequest')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
