import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';

export default function FAQ() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true });
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('faq.kicker')}
          title={
            <>
              {t('faq.titlePlain')} <span className="text-orange">{t('faq.titleAccent')}</span> {t('faq.titleSuffix')}
            </>
          }
        />

        <Reveal className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <div className="relative order-2 min-h-[280px] overflow-hidden rounded-[10px] md:order-1">
            <img
              src="/images/faq-visual.jpeg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(10,20,15,.05) 0%, rgba(6,12,9,.65) 100%)' }}
            />
            <div className="absolute inset-x-6 bottom-6 flex items-baseline gap-2.5 rounded-lg bg-white/94 px-[22px] py-[18px] backdrop-blur-sm">
              <span className="font-en text-[26px] font-extrabold text-emerald-deep" dir="ltr">
                {t('faq.badgeNum')}
              </span>
              <span className="text-[13.5px] font-semibold text-[#4B4B45]">{t('faq.badgeLabel')}</span>
            </div>
          </div>

          <div className="order-1 md:order-2">
            {items.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={item.q} className="border-b border-black/10">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-5 py-[26px] text-start text-[17px] font-semibold"
                  >
                    <span>{item.q}</span>
                    <Plus
                      className={`h-[22px] w-[22px] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-emerald' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[680px] pb-[26px] text-[15px] text-[#4B4B45]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
