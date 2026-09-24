import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionHead from '../ui/SectionHead';
import { ArrowDown } from 'lucide-react';

export default function CostFlow() {
  const { t } = useTranslation();
  const stages = t('costFlow.stages', { returnObjects: true });
  const align = ['justify-start', 'justify-end', 'justify-start'];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHead
          kicker={t('costFlow.kicker')}
          title={
            <>
              {t('costFlow.titlePlain')} <span className="text-orange">{t('costFlow.titleAccent')}</span>{' '}
              {t('costFlow.titleSuffix')}
            </>
          }
          desc={t('costFlow.desc')}
        />

        <div className="mx-auto flex max-w-[760px] flex-col">
          {stages.map((stage, i) => (
            <div key={stage.num}>
              <div className={`flex w-full ${align[i]}`}>
                <motion.div
                  initial={{ opacity: 0, y: 22, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`w-[92%] rounded-[10px] border p-8 text-center shadow-[0_8px_20px_-16px_rgba(17,17,17,0.25)] sm:w-[62%] ${
                    i === 1 ? 'border-orange bg-orange-tint' : 'border-black/10 bg-white'
                  }`}
                >
                  <span
                    className={`mx-auto mb-[18px] flex h-[38px] w-[38px] items-center justify-center rounded-full font-en text-sm font-extrabold ${
                      i === 1 ? 'bg-orange text-white' : 'bg-emerald-tint text-emerald-deep'
                    }`}
                    dir="ltr"
                  >
                    {stage.num}
                  </span>
                  <h4 className="mb-2.5 text-[19px] font-bold">{stage.title}</h4>
                  <p className="mx-auto max-w-[230px] text-sm leading-[1.75] text-[#5A5A54]">{stage.desc}</p>
                </motion.div>
              </div>

              {i < stages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="animate-arrow-bounce text-[#B9B9B2]" size={22} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
