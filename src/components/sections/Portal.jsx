import { useTranslation } from 'react-i18next';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

export default function Portal() {
  const { t } = useTranslation();

  const cards = [
    { ...t('portal.verify', { returnObjects: true }), bg: 'bg-emerald-deep' },
    { ...t('portal.client', { returnObjects: true }), bg: 'bg-gradient-to-br from-orange to-[#F46627]' },
  ];

  return (
    <section id="portal" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('portal.kicker')}
          title={
            <>
              {t('portal.titlePlain')} <span className="text-orange">{t('portal.titleAccent')}</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <Reveal
              key={card.title}
              className={`flex flex-wrap items-center justify-between gap-5 rounded-md p-9 text-white transition-transform hover:-translate-y-1 ${card.bg}`}
            >
              <div>
                <h4 className="mb-2 text-[19px] font-bold">{card.title}</h4>
                <p className="max-w-[320px] text-sm text-white/80">{card.desc}</p>
              </div>
              <Button as="a" href="#" variant="outlineWhite">
                {card.cta}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
