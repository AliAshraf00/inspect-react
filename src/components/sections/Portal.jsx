import { useTranslation } from 'react-i18next';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

export default function Portal() {
  const { t } = useTranslation();

  const cards = [
    { ...t('portal.verify', { returnObjects: true }), bg: 'bg-emerald-deep' , text: 'text-white', btn: 'text-emerald-deep bg-white hover:bg-transparent hover:text-white hover:border hover:border-white' , paragraph: 'text-white' },
    { ...t('portal.client', { returnObjects: true }), bg: 'border border-orange', text: 'text-orange', btn: 'text-white bg-orange hover:bg-transparent hover:text-orange hover:border hover:border-orange' , paragraph: 'text-orange' },
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
              className={`flex flex-wrap items-center justify-between gap-5 rounded-md p-9 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-24px_rgba(17,17,17,0.32)] ${card.bg}`}
            >
              <div>
                <h4 className={`mb-2 text-[19px] font-bold ${card.text} `} >{card.title}</h4>
                <p className={`max-w-[320px] text-sm ${card.paragraph}`}>{card.desc}</p>
              </div>
              <Button as="a" href="#"  className={card.btn}>
                {card.cta}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
