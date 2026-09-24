import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';

export default function Sectors() {
  const { t } = useTranslation();
  const items = t('sectors.items', { returnObjects: true });

  return (
    <section id="sectors" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('sectors.kicker')}
          title={
            <>
              {t('sectors.titlePlain')} <span className="text-orange">{t('sectors.titleAccent')}</span>{' '}
              {t('sectors.titleSuffix')}
            </>
          }
        />

        <div className="grid grid-cols-1 gap-px border border-black/10 bg-black/10 sm:grid-cols-2 md:grid-cols-4">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="group relative min-h-[340px] cursor-pointer overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              <div className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${item.image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A140F]/5 via-[#08100C]/55 to-[#060C09]/85 transition-colors duration-300 group-hover:from-[#0A140F]/25 group-hover:via-[#08100C]/70 group-hover:to-[#060C09]/92" />
              <div className="relative z-[2] flex h-full min-h-[340px] flex-col justify-end p-7 text-white">
                <h4 className="mb-1.5 text-xl font-extrabold italic">{item.title}</h4>
                <p className="mb-0 max-h-0 overflow-hidden text-[13px] text-white/80 opacity-0 transition-all duration-300 group-hover:mb-3 group-hover:max-h-[60px] group-hover:opacity-100">
                  {item.desc}
                </p>
                <span className="flex w-fit translate-y-2.5 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-emerald-deep opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {t('sectors.more')} <ChevronRight size={14} className="rtl:rotate-180" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
