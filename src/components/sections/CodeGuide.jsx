import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import TiltCard from '../ui/TiltCard';

export default function CodeGuide() {
  const { t } = useTranslation();
  const cards = t('codeGuide.cards', { returnObjects: true });
  const [top, ...bottom] = cards;

  const TriCard = ({ card }) => (
    <TiltCard max={5} className="relative aspect-[1/0.866] w-[260px] bg-emerald-deep transition-[filter] duration-300 hover:brightness-110 sm:w-[300px]">
      <div
        className="absolute inset-0"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', background: 'inherit' }}
      />
      <span className="absolute -top-4 start-1/2 z-[2] flex h-[34px] w-[34px] -translate-x-1/2 items-center justify-center rounded-full border-2 border-emerald-deep bg-white font-en text-[13px] font-extrabold text-emerald-deep shadow-lg">
        {card.num}
      </span>
      <div className="absolute inset-0 flex flex-col items-center justify-end px-7 pb-7 text-center">
        <span className="mb-1.5 block font-en text-[11px] font-bold tracking-wide text-[#8FE0D6]" dir="ltr">
          {card.code}
        </span>
        <h3 className="mb-1.5 text-base font-bold text-white">{card.title}</h3>
        <p className="max-w-[82%] text-xs leading-relaxed text-[#CFE6DC]">{card.desc}</p>
      </div>
    </TiltCard>
  );

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

        <Reveal className="flex flex-col items-center gap-5">
          <TriCard card={top} />

          <div className="relative -my-2 hidden aspect-[1/0.866] w-[130px] items-center justify-center bg-gradient-to-b from-orange to-[#c9531f] sm:flex" style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }}>
            <div className="animate-center-glow flex flex-col items-center gap-1 pt-6">
              <Check className="h-6 w-6 text-white" />
              <span className="text-[11px] font-bold text-white">{t('codeGuide.approved')}</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row">
            {bottom.map((card) => (
              <TriCard key={card.num} card={card} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
