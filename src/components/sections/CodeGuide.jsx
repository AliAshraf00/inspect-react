import { useTranslation } from 'react-i18next';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';

// غيّر المسار للوجو بتاعك
const LOGO_SRC = '/logo.png';

const TRI = '[clip-path:polygon(50%_0,100%_100%,0_100%)]';

// أماكن المثلثات (logical: start = يمين في العربي)
const POS = ['start-1/4 top-0', 'start-0 bottom-0', 'end-0 bottom-0'];

export default function CodeGuide() {
  const { t } = useTranslation();
  const cards = t('codeGuide.cards', { returnObjects: true });

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('codeGuide.kicker')}
          title={
            <>
              {t('codeGuide.titlePlain')} <span className="text-orange">{t('codeGuide.titleAccent')}</span>{' '}
              {t('codeGuide.titleSuffix')}
            </>
          }
          desc={t('codeGuide.desc')}
        />

        {/* Desktop: مثلثات */}
        <Reveal className="mx-auto hidden w-full max-w-[620px] md:block">
          <div className="relative aspect-[100/88] w-full" style={{ containerType: 'inline-size' }}>
            {/* المثلث المقلوب + اللوجو */}
            <div className="absolute start-1/4 top-[50.8%] h-[49.2%] w-1/2 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(0,0,0,0.04),transparent_70%)] [clip-path:polygon(0_0,100%_0,50%_100%)] z-10">
              <img src={LOGO_SRC} alt="Inspection Logo" className="w-[50%] max-w-[140px] h-auto object-contain -mt-[25%] drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] animate-center-glow" />
            </div>

            {cards.map((card, i) => (
              <div
                key={card.num}
                className={`group absolute h-[49.2%] w-1/2 cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${POS[i]}`}
              >
                {/* الخلفية على المثلث نفسه (مش على الـ wrapper) */}
                <div className={`absolute inset-0 bg-emerald transition-[filter] duration-300 group-hover:brightness-[1.12] ${TRI}`}>
                  <div className="absolute inset-x-[19%] top-[40%] text-center text-white">
                    <div className="font-en font-semibold text-white/60" style={{ fontSize: 'clamp(8px,1.6cqw,12px)' }} dir="ltr">
                      {card.code}
                    </div>
                    <h3 className="mt-[3%] font-semibold" style={{ fontSize: 'clamp(10px,2.3cqw,15px)' }}>
                      {card.title}
                    </h3>
                    <p className="mt-[3%] leading-[1.7] text-white/85" style={{ fontSize: 'clamp(8px,1.6cqw,11px)' }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
                <span className="absolute start-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-sm" />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile: كروت */}
        <div className="mx-auto grid max-w-[420px] gap-4 md:hidden">
          {cards.map((card, i) => (
            <Reveal key={card.num} delay={i * 0.05}>
              <div className="rounded-2xl bg-emerald p-6 text-center text-white">
                <div className="font-en text-xs font-semibold text-white/60" dir="ltr">{card.code}</div>
                <h3 className="mt-1 text-[17px] font-semibold">{card.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.8] text-white/85">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}