import { useTranslation } from 'react-i18next';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import { PILLAR_ICONS } from '../icons/PillarIcons';

export default function Pillars() {
  const { t } = useTranslation();
  const items = t('why.items', { returnObjects: true });

  return (
    <section id="why" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('why.kicker')}
          title={
            <>
              {t('why.titlePlain')} <span className="text-orange">{t('why.titleAccent')}</span> {t('why.titleSuffix')}
            </>
          }
        />

        <div className="grid grid-cols-1 gap-px border border-black/10 bg-black/10 sm:grid-cols-2 md:grid-cols-4">
          {items.map((item, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <Reveal
                key={item.num}
                delay={i * 0.08}
                className="group relative overflow-hidden bg-white p-8 pb-8 pt-9"
              >
                <span
                  className="pointer-events-none absolute start-4 top-1.5 font-en text-7xl font-extrabold leading-none text-ink opacity-[.06] transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-10"
                  dir="ltr"
                >
                  {item.num}
                </span>
                <span className="absolute end-0 top-0 h-0 w-[3px] bg-orange transition-[height] duration-300 group-hover:h-full" />
                <div className="relative z-[1] mb-[22px] flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-black/10 transition-all duration-300 group-hover:scale-105 group-hover:border-orange group-hover:bg-emerald-tint">
                  <Icon className="h-[26px] w-[26px] text-orange transition-transform duration-300 group-hover:-rotate-[8deg]" />
                </div>
                <h4 className="relative z-[1] mb-2.5 text-[17px] font-bold">{item.title}</h4>
                <p className="relative z-[1] text-sm leading-relaxed text-[#5A5A54]">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
