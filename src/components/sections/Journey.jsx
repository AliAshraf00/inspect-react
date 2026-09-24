import { useTranslation } from 'react-i18next';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';

export default function Journey() {
  const { t } = useTranslation();
  const steps = t('journey.steps', { returnObjects: true });

  return (
    <section id="journey" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('journey.kicker')}
          title={
            <>
              {t('journey.titlePlain')} <span className="text-orange">{t('journey.titleAccent')}</span>{' '}
              {t('journey.titleSuffix')}
            </>
          }
        />

        <div className="relative">
          <div className="absolute top-[26px] hidden h-px bg-black/10 start-[6%] end-[6%] md:block">
            <Reveal
              as="div"
              className="h-full origin-right bg-gradient-to-r from-emerald to-orange"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
            {steps.map((step, i) => (
              <Reveal
                key={step.num}
                delay={i * 0.1}
                className="relative flex items-start gap-4 text-start md:flex-col md:text-center md:gap-0"
              >
                <div className="relative z-[2] flex h-[54px] w-[54px] flex-shrink-0 items-center justify-center rounded-full border-2 border-emerald bg-white font-en text-lg font-bold text-emerald transition-all duration-300 md:mx-auto md:mb-[22px] hover:bg-emerald hover:text-white"> 
                  {step.num}
                </div>
                <div>
                  <h4 className="mb-2 text-[16.5px] font-semibold">{step.title}</h4>
                  <p className="text-[13.5px] text-[#5A5A54]">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
