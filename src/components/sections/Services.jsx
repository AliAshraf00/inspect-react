import { useTranslation } from 'react-i18next';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import { SERVICE_ICONS } from '../icons/ServiceIcons';

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true });

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('services.kicker')}
          title={
            <>
              <span className="text-orange">{t('services.titlePlain')}</span> {t('services.titleAccent')}
            </>
          }
          desc={t('services.desc')}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-[22px]">
          {items.map((item, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <Reveal key={item.num} delay={i * 0.05} className="group flip-card flip-perspective h-[270px]">
                <div className="flip-inner relative h-full w-full">
                  {/* Front */}
                  <div className="flip-face absolute inset-0 flex flex-col rounded-2xl border border-black/10 bg-bg p-7 shadow-[0_10px_26px_-18px_rgba(17,17,17,0.18)] transition-shadow duration-500 group-hover:shadow-[0_30px_50px_-24px_rgba(17,17,17,0.32)]">
                    <span className="absolute start-7 top-[22px] font-en text-xs text-[#B9B9B2]" dir="ltr">
                      {item.num}
                    </span>
                    <Icon className="mb-6 h-11 w-11 text-emerald transition-transform duration-300 group-hover:-rotate-[8deg] group-hover:scale-110" />
                    <h3 className="mb-2.5 text-[19px] font-semibold">{item.title}</h3>
                    <p className="text-[14.5px] text-[#5A5A54]">{item.front}</p>
                  </div>
                  {/* Back */}
                  <div className="flip-face flip-face-back absolute inset-0 flex flex-col justify-center rounded-2xl border border-emerald bg-emerald p-7 text-white">
                    <span className="absolute start-7 top-[22px] font-en text-xs text-white/55" dir="ltr">
                      {item.num}
                    </span>
                    <h4 className="mb-3.5 text-[12px] font-semibold">{item.title}</h4>
                    <p className="text-xs leading-[1.9] text-white/90">{item.back}</p>
                    <ul className="mt-3.5 list-disc space-y-2 ps-[18px] text-[12px] text-white/85">
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
