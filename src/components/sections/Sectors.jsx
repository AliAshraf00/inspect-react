import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import SectionHead from '../ui/SectionHead';
import Reveal from '../ui/Reveal';
import img1 from '../../assets/images/WhatsApp Image 2026-09-13 at 4.14.26 PM.jpeg';
import img2 from '../../assets/images/pexels-eslames1-36099490.jpg';
import img3 from '../../assets/images/pexels-2153622414-32817699.jpg';
import img4 from '../../assets/images/WhatsApp Image 2026-09-13 at 4.14.33 PM.jpeg';

const images = [img1, img2, img3, img4];

export default function Sectors() {
  const { t } = useTranslation();
  const items = t('sectors.items', { returnObjects: true });
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

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

        <div className="flex flex-col gap-px border border-black/10 bg-black/10">
          {rows.map((rowItems, rowIndex) => {
            const isReversed = rowIndex % 2 === 1;
            return (
              <div
                key={rowIndex}
                className={`
                  flex flex-col gap-px sm:flex-row
                  [&:has(.card-a:hover)_.card-a]:!flex-[3.6] [&:has(.card-a:hover)_.card-b]:!flex-[0.5]
                  [&:has(.card-b:hover)_.card-b]:!flex-[3.6] [&:has(.card-b:hover)_.card-a]:!flex-[0.5]
                `}
              >
                {rowItems.map((item, colIndex) => {
                  const isBig = isReversed ? colIndex === 1 : colIndex === 0;
                  const cardClass = colIndex === 0 ? 'card-a' : 'card-b';
                  const imageIndex = rowIndex * 2 + colIndex;
                  const bgImage = images[imageIndex];

                  return (
                    <Reveal
                      key={item.title}
                      delay={rowIndex * 0.1 + colIndex * 0.08}
                      className={`
                        group relative min-h-[260px] cursor-pointer overflow-hidden bg-cover bg-center
                        transition-[flex] duration-500 ease-out rounded-md
                        ${cardClass}
                        ${isBig ? 'flex-[3]' : 'flex-[1]'}
                      `}
                    >
                      <div
                        className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${bgImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#0A140F]/5 via-[#08100C]/55 to-[#060C09]/85 transition-colors duration-300 group-hover:from-[#0A140F]/25 group-hover:via-[#08100C]/70 group-hover:to-[#060C09]/92" />
                      <div className="relative z-[2] flex h-full min-h-[260px] flex-col justify-end p-7 text-white">
                        <h4 className="mb-1.5 text-xl font-extrabold italic">{item.title}</h4>
                        <p className="mb-0 max-h-0 overflow-hidden text-[13px] text-white/80 opacity-0 transition-all duration-300 group-hover:mb-3 group-hover:max-h-[60px] group-hover:opacity-100">
                          {item.desc}
                        </p>
                        <span className="flex w-fit translate-y-2.5 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-emerald-deep opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {t('sectors.more')} <ChevronRight size={14} className="rtl:rotate-180" />
                        </span>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}